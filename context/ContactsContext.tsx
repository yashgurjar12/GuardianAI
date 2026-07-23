import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockTrustedContacts } from '@/constants/mockData';

export interface TrustedContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  initials: string;
  color: string;
  isEmergency?: boolean;
}

interface ContactsContextType {
  contacts: TrustedContact[];
  addContact: (contact: { name: string; relation: string; phone: string; color?: string; isEmergency?: boolean }) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  toggleEmergency: (id: string) => Promise<void>;
  isLoading: boolean;
}

const STORAGE_KEY = '@guardian_ai_trusted_contacts';

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

const PRESET_COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'C';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load contacts from storage or fallback to mock
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContacts(JSON.parse(stored));
      } else {
        // Initial setup with mock contacts
        setContacts(mockTrustedContacts);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockTrustedContacts));
      }
    } catch (e) {
      console.error('Error loading contacts:', e);
      setContacts(mockTrustedContacts);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContacts = async (newContacts: TrustedContact[]) => {
    try {
      setContacts(newContacts);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
    } catch (e) {
      console.error('Error saving contacts:', e);
    }
  };

  const addContact = async (contactData: { name: string; relation: string; phone: string; color?: string; isEmergency?: boolean }) => {
    const randomColor = PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)];
    const newContact: TrustedContact = {
      id: Date.now().toString(),
      name: contactData.name,
      relation: contactData.relation || 'Contact',
      phone: contactData.phone,
      initials: getInitials(contactData.name),
      color: contactData.color || randomColor,
      isEmergency: contactData.isEmergency ?? true,
    };

    const updated = [newContact, ...contacts];
    await saveContacts(updated);
  };

  const deleteContact = async (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    await saveContacts(updated);
  };

  const toggleEmergency = async (id: string) => {
    const updated = contacts.map((c) => (c.id === id ? { ...c, isEmergency: !c.isEmergency } : c));
    await saveContacts(updated);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        deleteContact,
        toggleEmergency,
        isLoading,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};
