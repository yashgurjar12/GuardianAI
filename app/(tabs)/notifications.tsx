import Card from '@/components/ui/Card';
import AppTopbar from '@/components/ui/AppTopbar';
import { Colors, Radius, Shadows, Spacing } from '@/constants/theme';
import { useNotifications } from '@/context/NotificationContext';
import { useRouter } from 'expo-router';
import {
  Bell,
  CheckCheck,
  Navigation,
  ShieldAlert,
  Trash2,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markAllAsRead, markAsRead, removeNotification } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications =
    activeFilter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications;

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleRemove = (id: string) => {
    removeNotification(id);
  };

  const handleCardPress = (id: string) => {
    markAsRead(id);
  };

  const getIconForType = (title: string) => {
    if (title.includes('Route') || title.includes('Deviation')) {
      return <Navigation size={20} color={Colors.primary} />;
    }
    if (title.includes('SOS') || title.includes('Alert')) {
      return <ShieldAlert size={20} color={Colors.sos} />;
    }
    return <Bell size={20} color={Colors.primary} />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Topbar Header */}
        <AppTopbar title="GuardianAI" />

        {/* Hero Section (No Back Button) */}
        <View style={styles.heroSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pageTitle}>Notifications</Text>
            <Text style={styles.pageSubtitle}>
              Safety alerts, route updates & system insights
            </Text>
          </View>
          <TouchableOpacity
            style={styles.markReadBtn}
            onPress={handleMarkAllRead}
            activeOpacity={0.7}
          >
            <CheckCheck size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === 'all' && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter('all')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'all' && styles.filterTextActive,
              ]}
            >
              All ({notifications.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === 'unread' && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter('unread')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'unread' && styles.filterTextActive,
              ]}
            >
              Unread ({notifications.filter((n) => !n.read).length})
            </Text>
          </TouchableOpacity>
        </View>

        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={48} color={Colors.disabled} />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>You're all caught up!</Text>
          </View>
        ) : (
          filteredNotifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handleCardPress(item.id)}
            >
              <Card
                style={[
                  styles.notifCard,
                  !item.read && styles.unreadNotifCard,
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconBox}>{getIconForType(item.title)}</View>
                  <View style={styles.cardTextContent}>
                    <View style={styles.titleRow}>
                      <Text style={styles.notifTitle}>{item.title}</Text>
                      {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notifMessage}>{item.message}</Text>
                    <Text style={styles.notifTime}>{item.time}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleRemove(item.id)}
                  >
                    <Trash2 size={16} color={Colors.secondary} />
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.heading,
    letterSpacing: -0.3,
  },
  pageSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  markReadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.circle,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  notifCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.medium,
    marginBottom: Spacing.sm,
  },
  unreadNotifCard: {
    borderColor: Colors.primaryLight,
    backgroundColor: '#F0F6FF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  cardTextContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  notifMessage: {
    fontSize: 13,
    color: Colors.body,
    marginTop: 2,
    lineHeight: 18,
  },
  notifTime: {
    fontSize: 11,
    color: Colors.secondary,
    marginTop: 6,
    fontWeight: '500',
  },
  deleteBtn: {
    padding: Spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
    marginTop: Spacing.sm,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.secondary,
  },
});
