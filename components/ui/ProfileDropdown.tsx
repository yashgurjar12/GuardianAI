import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Settings, LogOut, AlertTriangle } from 'lucide-react-native';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import Card from '@/components/ui/Card';

interface ProfileDropdownProps {
  style?: object;
}

export default function ProfileDropdown({ style }: ProfileDropdownProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOpenSettings = () => {
    setVisible(false);
    router.push('/settings');
  };

  const handleLogoutClick = () => {
    setVisible(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    router.replace('/login');
  };

  return (
    <View style={style}>
      {/* Profile Icon Button (matching image) */}
      <TouchableOpacity
        style={styles.circleBtn}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <User size={22} color={Colors.heading} />
      </TouchableOpacity>

      {/* Dropdown Menu Modal (matching image) */}
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View style={styles.dropdownCard} onStartShouldSetResponder={() => true}>
            {/* Settings Option */}
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={handleOpenSettings}
              activeOpacity={0.7}
            >
              <Settings size={18} color={Colors.heading} />
              <Text style={styles.optionTextHeading}>Settings</Text>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            {/* Logout Option */}
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={handleLogoutClick}
              activeOpacity={0.7}
            >
              <LogOut size={18} color={Colors.sos} />
              <Text style={styles.optionTextLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

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
                onPress={confirmLogout}
              >
                <Text style={styles.confirmModalLogoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 64,
    paddingRight: Spacing.lg,
  },
  dropdownCard: {
    width: 170,
    backgroundColor: Colors.surface,
    borderRadius: Radius.medium,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Shadows.medium,
    elevation: 12,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.xs,
  },
  optionTextHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.heading,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 2,
  },
  optionTextLogout: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.sos,
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
