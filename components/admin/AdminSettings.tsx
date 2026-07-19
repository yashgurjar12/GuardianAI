import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  User,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { AdminProfile } from './types';
import AdminEditProfile from './AdminEditProfile';
import AdminChangePassword from './AdminChangePassword';

interface AdminSettingsProps {
  currentAdmin: AdminProfile;
  editAdminName: string;
  setEditAdminName: (name: string) => void;
  editAdminEmail: string;
  setEditAdminEmail: (email: string) => void;
  editAdminAvatar?: string;
  setEditAdminAvatar: (uri: string | undefined) => void;
  handleSaveProfile: () => void;
}

export default function AdminSettings({
  currentAdmin,
  editAdminName,
  setEditAdminName,
  editAdminEmail,
  setEditAdminEmail,
  editAdminAvatar,
  setEditAdminAvatar,
  handleSaveProfile,
}: AdminSettingsProps) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <View style={styles.tabContentContainer}>
      <View style={styles.tabHeaderRow}>
        <Text style={styles.tabHeaderTitle}>⚙ Settings & Controls</Text>
      </View>
      
      {/* Dropdown 1: Edit Profile Card */}
      <Card style={styles.settingsSectionCard}>
        <TouchableOpacity
          style={styles.dropdownHeader}
          activeOpacity={0.7}
          onPress={() => setIsEditProfileOpen(!isEditProfileOpen)}
        >
          <View style={styles.dropdownHeaderLeft}>
            <User size={22} color={Colors.primary} />
            <Text style={styles.dropdownHeaderTitle}>Edit Profile Details</Text>
          </View>
          {isEditProfileOpen ? (
            <ChevronUp size={20} color={Colors.secondary} />
          ) : (
            <ChevronDown size={20} color={Colors.secondary} />
          )}
        </TouchableOpacity>

        {isEditProfileOpen && (
          <View style={styles.dropdownContent}>
            <AdminEditProfile
              editAdminName={editAdminName}
              setEditAdminName={setEditAdminName}
              editAdminEmail={editAdminEmail}
              setEditAdminEmail={setEditAdminEmail}
              editAdminAvatar={editAdminAvatar}
              setEditAdminAvatar={setEditAdminAvatar}
              handleSaveProfile={handleSaveProfile}
            />
          </View>
        )}
      </Card>

      {/* Dropdown 2: Change Password Card */}
      <Card style={[styles.settingsSectionCard, { marginTop: Spacing.sm }]}>
        <TouchableOpacity
          style={styles.dropdownHeader}
          activeOpacity={0.7}
          onPress={() => setIsChangePasswordOpen(!isChangePasswordOpen)}
        >
          <View style={styles.dropdownHeaderLeft}>
            <Lock size={22} color={Colors.sos} />
            <Text style={styles.dropdownHeaderTitle}>Change Password</Text>
          </View>
          {isChangePasswordOpen ? (
            <ChevronUp size={20} color={Colors.secondary} />
          ) : (
            <ChevronDown size={20} color={Colors.secondary} />
          )}
        </TouchableOpacity>

        {isChangePasswordOpen && (
          <View style={styles.dropdownContent}>
            <AdminChangePassword />
          </View>
        )}
      </Card>

      {/* Active Admin Details summary */}
      <Card style={[styles.settingsSectionCard, { marginTop: Spacing.md }]}>
        <View style={styles.adminProfileSummaryRow}>
          <View style={styles.avatarBig}>
            <Text style={styles.avatarBigText}>{currentAdmin.avatarInitials}</Text>
          </View>
          <View style={{ marginLeft: Spacing.md, flex: 1 }}>
            <Text style={styles.adminProfileName}>{currentAdmin.name}</Text>
            <Text style={styles.adminProfileRoleText}>{currentAdmin.role}</Text>
            <Text style={styles.adminProfileEmailText}>{currentAdmin.email}</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContentContainer: {
    gap: Spacing.md,
  },
  tabHeaderRow: {
    marginBottom: Spacing.sm,
  },
  tabHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.heading,
  },
  settingsSectionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: 0,
    overflow: 'hidden',
    ...Shadows.small,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  dropdownHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dropdownHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
  },
  dropdownContent: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  adminProfileSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  avatarBig: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBigText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  adminProfileName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
  },
  adminProfileRoleText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  adminProfileEmailText: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 2,
  },
});
