import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  Shield,
  Bell,
  Moon,
  HelpCircle,
  LogOut,
  ChevronRight,
  Phone,
  Edit3,
  UserPlus,
  AlertTriangle,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import SettingTile from '@/components/ui/SettingTile';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { mockUser } from '@/constants/mockData';
import { useContacts } from '@/context/ContactsContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { contacts } = useContacts();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => router.push('/settings')}
          >
            <Settings size={22} color={Colors.heading} />
          </TouchableOpacity>
        </View>

        {/* User Card */}
        <Card style={styles.userCard}>
          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {mockUser.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{mockUser.name}</Text>
              <Text style={styles.userEmail}>{mockUser.email}</Text>
              <StatusBadge status="safe" label={mockUser.status} style={{ marginTop: Spacing.xs }} />
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Edit3 size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Trusted Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trusted Contacts ({contacts.length})</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/(tabs)/contacts')}>
              <UserPlus size={18} color={Colors.primary} />
              <Text style={styles.addText}>Manage</Text>
            </TouchableOpacity>
          </View>
          <Card>
            {contacts.slice(0, 4).map((contact, idx) => (
              <View
                key={contact.id}
                style={[
                  styles.contactRow,
                  idx < Math.min(contacts.length, 4) - 1 && styles.contactBorder,
                ]}
              >
                <View
                  style={[styles.contactAvatar, { backgroundColor: contact.color + '20' }]}
                >
                  <Text style={[styles.contactInitials, { color: contact.color }]}>
                    {contact.initials}
                  </Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRelation}>{contact.relation}</Text>
                </View>
                <TouchableOpacity style={styles.callBtn}>
                  <Phone size={16} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </Card>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <SettingTile
            icon={<Bell size={20} color={Colors.primary} />}
            title="Notifications"
            subtitle="Manage alert preferences"
            onPress={() => router.push('/settings')}
          />
          <SettingTile
            icon={<Shield size={20} color={Colors.success} />}
            title="Safety Settings"
            subtitle="SOS, auto-activate, silent mode"
            onPress={() => router.push('/settings')}
          />
          <SettingTile
            icon={<Moon size={20} color="#8B5CF6" />}
            title="App Preferences"
            subtitle="Theme, language, data"
            onPress={() => router.push('/settings')}
          />
          <SettingTile
            icon={<HelpCircle size={20} color={Colors.warning} />}
            title="Help & Support"
            subtitle="FAQ, contact us"
            onPress={() => {}}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogoutModal(true)}>
          <LogOut size={20} color={Colors.sos} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>GuardianAI v1.0.0</Text>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.confirmModalOverlay}>
          <Card style={styles.confirmModalCard}>
            <AlertTriangle size={48} color={Colors.sos} style={{ marginBottom: Spacing.md, alignSelf: 'center' }} />
            <Text style={styles.confirmModalTitle}>Confirm Logout</Text>
            <Text style={styles.confirmModalSubtitle}>
              Are you sure you want to end your session? Active safety monitoring will pause until you log back in.
            </Text>
            <View style={styles.confirmModalActionRow}>
              <TouchableOpacity
                style={styles.confirmModalCancelBtn}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.confirmModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmModalLogoutBtn}
                onPress={() => {
                  setShowLogoutModal(false);
                  router.replace('/login');
                }}
              >
                <Text style={styles.confirmModalLogoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  userCard: {
    marginBottom: Spacing.lg,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.heading,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 2,
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.heading,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  addText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 4,
  },
  contactBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInitials: {
    fontSize: 15,
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.heading,
  },
  contactRelation: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.medium,
    backgroundColor: Colors.dangerBg,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.sos,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.disabled,
    marginBottom: Spacing.lg,
  },
  // Confirm logout Modal
  confirmModalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  confirmModalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.heading,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  confirmModalSubtitle: {
    fontSize: 13,
    color: Colors.body,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.lg,
  },
  confirmModalActionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  confirmModalCancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmModalCancelText: {
    color: Colors.heading,
    fontSize: 14,
    fontWeight: '600',
  },
  confirmModalLogoutBtn: {
    flex: 1,
    height: 44,
    borderRadius: Radius.medium,
    backgroundColor: Colors.sos,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmModalLogoutText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
