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
import { User, Settings, LogOut } from 'lucide-react-native';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';

interface ProfileDropdownProps {
  style?: object;
}

export default function ProfileDropdown({ style }: ProfileDropdownProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const handleOpenSettings = () => {
    setVisible(false);
    router.push('/settings');
  };

  const handleLogout = () => {
    setVisible(false);
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
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <LogOut size={18} color={Colors.sos} />
              <Text style={styles.optionTextLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
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
});
