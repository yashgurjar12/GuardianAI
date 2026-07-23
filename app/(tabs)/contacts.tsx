import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  UserPlus,
  Phone,
  Trash2,
  Users,
  Search,
  CheckCircle2,
  X,
  ShieldAlert,
  MessageSquare,
  ChevronRight,
  Plus,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';
import PrimaryButton from '@/components/ui/PrimaryButton';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import AppTopbar from '@/components/ui/AppTopbar';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { useContacts, TrustedContact } from '@/context/ContactsContext';

const RELATIONS = ['Partner', 'Mother', 'Father', 'Brother', 'Sister', 'Friend', 'Doctor', 'Guardian', 'Other'];
const COLOR_PRESETS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

export default function ContactsScreen() {
  const { contacts, addContact, deleteContact, toggleEmergency } = useContacts();

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Add Contact Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('Partner');
  const [selectedColor, setSelectedColor] = useState(COLOR_PRESETS[0]);
  const [isEmergency, setIsEmergency] = useState(true);

  // Filtered contacts
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.relation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const resetForm = () => {
    setName('');
    setPhone('');
    setRelation('Partner');
    setSelectedColor(COLOR_PRESETS[0]);
    setIsEmergency(true);
  };

  const handleAddContact = async () => {
    if (!name.trim()) {
      Alert.alert('Required Field', 'Please enter the contact name.');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Required Field', 'Please enter a phone number.');
      return;
    }

    await addContact({
      name: name.trim(),
      relation: relation.trim(),
      phone: phone.trim(),
      color: selectedColor,
      isEmergency,
    });

    resetForm();
    setModalVisible(false);
  };

  const handleDeleteContact = (contact: TrustedContact) => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to remove ${contact.name} from your trusted contacts?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteContact(contact.id),
        },
      ]
    );
  };

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Topbar: GuardianAI title on left, Bell & Profile icon on right */}
          <AppTopbar title="GuardianAI" />

          {/* Below topbar: Trusted Contacts section title & Add action */}
          <View style={styles.header}>
            <View style={{ flex: 1, marginRight: Spacing.xs }}>
              <Text style={styles.title}>Trusted Contacts</Text>
              <Text style={styles.subtitle}>
                People who receive instant SOS alerts & live tracking
              </Text>
            </View>
            <TouchableOpacity
              style={styles.headerAddBtn}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
            >
              <Plus size={20} color={Colors.white} />
              <Text style={styles.headerAddText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name, relation or phone..."
            style={styles.searchBar}
          />

          {/* Contacts Overview Banner */}
          <Card style={styles.overviewCard}>
            <View style={styles.overviewRow}>
              <View style={styles.overviewBox}>
                <Text style={styles.overviewNum}>{contacts.length}</Text>
                <Text style={styles.overviewLabel}>Total Contacts</Text>
              </View>
              <View style={styles.overviewDivider} />
              <View style={styles.overviewBox}>
                <Text style={[styles.overviewNum, { color: Colors.success }]}>
                  {contacts.filter((c) => c.isEmergency !== false).length}
                </Text>
                <Text style={styles.overviewLabel}>SOS Ready</Text>
              </View>
            </View>
          </Card>

          {/* Contact List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              My Network ({filteredContacts.length})
            </Text>

            {filteredContacts.length === 0 ? (
              <Card style={styles.emptyCard}>
                <Users size={40} color={Colors.secondary} />
                <Text style={styles.emptyTitle}>
                  {searchQuery ? 'No contacts matched your search' : 'No Trusted Contacts Yet'}
                </Text>
                <Text style={styles.emptySub}>
                  {searchQuery
                    ? 'Try searching with a different name or number.'
                    : 'Add trusted family, partners, or friends so GuardianAI can keep them informed in an emergency.'}
                </Text>
                {!searchQuery && (
                  <TouchableOpacity
                    style={styles.emptyAddBtn}
                    onPress={() => setModalVisible(true)}
                  >
                    <UserPlus size={18} color={Colors.white} />
                    <Text style={styles.emptyAddText}>Add Contact Now</Text>
                  </TouchableOpacity>
                )}
              </Card>
            ) : (
              filteredContacts.map((contact) => (
                <Card key={contact.id} style={styles.contactCard}>
                  <View style={styles.contactMainRow}>
                    {/* Avatar with initials */}
                    <View
                      style={[
                        styles.avatar,
                        { backgroundColor: contact.color + '20' },
                      ]}
                    >
                      <Text style={[styles.avatarText, { color: contact.color }]}>
                        {contact.initials}
                      </Text>
                    </View>

                    {/* Contact Details */}
                    <View style={styles.contactInfo}>
                      <View style={styles.nameRow}>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        {contact.isEmergency !== false && (
                          <View style={styles.sosBadge}>
                            <ShieldAlert size={10} color={Colors.sos} />
                            <Text style={styles.sosBadgeText}>SOS</Text>
                          </View>
                        )}
                      </View>

                      <Text style={styles.contactRelation}>{contact.relation}</Text>
                      <Text style={styles.contactPhone}>{contact.phone}</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        style={styles.actionIconBtn}
                        onPress={() => toggleEmergency(contact.id)}
                        title="Toggle Emergency"
                      >
                        <CheckCircle2
                          size={18}
                          color={contact.isEmergency !== false ? Colors.success : Colors.disabled}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionIconBtn, styles.deleteBtn]}
                        onPress={() => handleDeleteContact(contact)}
                      >
                        <Trash2 size={18} color={Colors.sos} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              ))
            )}
          </View>
        </ScrollView>

        {/* Add Contact Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Trusted Contact</Text>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <X size={20} color={Colors.secondary} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Form Fields */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Full Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Sarah Mitchell"
                    placeholderTextColor={Colors.secondary}
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Phone Number *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. +1 (415) 555-0192"
                    placeholderTextColor={Colors.secondary}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Relationship</Text>
                  <View style={styles.relationChipGrid}>
                    {RELATIONS.map((r) => (
                      <TouchableOpacity
                        key={r}
                        style={[
                          styles.relationChip,
                          relation === r && styles.relationChipActive,
                        ]}
                        onPress={() => setRelation(r)}
                      >
                        <Text
                          style={[
                            styles.relationChipText,
                            relation === r && styles.relationChipTextActive,
                          ]}
                        >
                          {r}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Color Theme</Text>
                  <View style={styles.colorRow}>
                    {COLOR_PRESETS.map((color) => (
                      <TouchableOpacity
                        key={color}
                        style={[
                          styles.colorCircle,
                          { backgroundColor: color },
                          selectedColor === color && styles.colorCircleActive,
                        ]}
                        onPress={() => setSelectedColor(color)}
                      />
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.emergencyToggleRow}
                  onPress={() => setIsEmergency(!isEmergency)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isEmergency && styles.checkboxActive,
                    ]}
                  >
                    {isEmergency && <CheckCircle2 size={16} color={Colors.white} />}
                  </View>
                  <View style={styles.emergencyToggleText}>
                    <Text style={styles.emergencyToggleTitle}>Include in SOS Broadcast</Text>
                    <Text style={styles.emergencyToggleSub}>
                      Automatically alert this person when SOS is triggered.
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Modal Buttons */}
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelModalBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelModalText}>Cancel</Text>
                  </TouchableOpacity>
                  <PrimaryButton
                    title="Save Contact"
                    onPress={handleAddContact}
                    style={{ flex: 1 }}
                  />
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.heading,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 2,
  },
  headerAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.medium,
    ...Shadows.small,
  },
  headerAddText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  searchBar: {
    marginBottom: Spacing.md,
  },
  overviewCard: {
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  overviewBox: {
    alignItems: 'center',
  },
  overviewNum: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  overviewLabel: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
    fontWeight: '500',
  },
  overviewDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 13,
    color: Colors.secondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
    lineHeight: 18,
  },
  emptyAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.medium,
    marginTop: Spacing.lg,
  },
  emptyAddText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  contactCard: {
    marginBottom: Spacing.sm,
    padding: Spacing.md,
  },
  contactMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.heading,
  },
  sosBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.dangerBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.small,
  },
  sosBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.sos,
  },
  contactRelation: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
    fontWeight: '500',
  },
  contactPhone: {
    fontSize: 12,
    color: Colors.body,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  deleteBtn: {
    backgroundColor: Colors.dangerBg,
    borderColor: Colors.dangerBorder,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.large,
    borderTopRightRadius: Radius.large,
    padding: Spacing.lg,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.heading,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.heading,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    fontSize: 15,
    color: Colors.heading,
  },
  relationChipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  relationChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.circle,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  relationChipActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  relationChipText: {
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: '500',
  },
  relationChipTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  colorRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
    marginVertical: Spacing.xs,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  colorCircleActive: {
    borderWidth: 3,
    borderColor: Colors.heading,
  },
  emergencyToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: Radius.medium,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  checkboxActive: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  emergencyToggleText: {
    flex: 1,
  },
  emergencyToggleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.heading,
  },
  emergencyToggleSub: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  cancelModalBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  cancelModalText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.secondary,
  },
});
