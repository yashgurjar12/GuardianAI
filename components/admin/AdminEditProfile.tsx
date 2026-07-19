import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';

interface AdminEditProfileProps {
  editAdminName: string;
  setEditAdminName: (name: string) => void;
  editAdminEmail: string;
  setEditAdminEmail: (email: string) => void;
  handleSaveProfile: () => void;
}

export default function AdminEditProfile({
  editAdminName,
  setEditAdminName,
  editAdminEmail,
  setEditAdminEmail,
  handleSaveProfile,
}: AdminEditProfileProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.collapsibleSecTitle}>Update Admin Profile</Text>
      
      <Text style={styles.optionInputLabel}>Display Name</Text>
      <TextInput
        style={styles.optionInput}
        value={editAdminName}
        onChangeText={setEditAdminName}
        placeholder="Admin Name"
        placeholderTextColor={Colors.secondary}
      />

      <Text style={styles.optionInputLabel}>Admin Email Address</Text>
      <TextInput
        style={styles.optionInput}
        value={editAdminEmail}
        onChangeText={setEditAdminEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="admin@email.com"
        placeholderTextColor={Colors.secondary}
      />

      <TouchableOpacity style={styles.optionSaveBtn} onPress={handleSaveProfile}>
        <CheckCircle2 size={18} color={Colors.white} />
        <Text style={styles.optionSaveBtnText}>Save Updates</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
  },
  collapsibleSecTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.sm,
  },
  optionInputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.body,
    marginBottom: 6,
  },
  optionInput: {
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
    height: 42,
    marginBottom: Spacing.md,
    fontSize: 14,
    color: Colors.heading,
  },
  optionSaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    height: 44,
    borderRadius: Radius.medium,
    backgroundColor: Colors.primary,
    marginTop: Spacing.xs,
  },
  optionSaveBtnText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});
