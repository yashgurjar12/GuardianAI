import React, { createContext, useContext, useState } from 'react';
import { mockNotifications } from '@/constants/mockData';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAllAsRead: () => {},
  markAsRead: () => {},
  removeNotification: () => {},
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAllAsRead,
        markAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
