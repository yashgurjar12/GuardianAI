import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { KeyRound, Eye, EyeOff, CheckCircle2 } from 'lucide-react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';

export default function AdminChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const getStrengthLabel = (pass: string) => {
    if (!pass) return { label: 'None', color: Colors.secondary, percent: '0%' };
    if (pass.length < 6) return { label: 'Weak 🔴', color: Colors.sos, percent: '30%' };
    if (pass.length < 10) return { label: 'Medium 🟡', color: Colors.warning, percent: '65%' };
    return { label: 'Strong 🟢', color: Colors.success, percent: '100%' };
  };

  const strength = getStrengthLabel(newPassword);

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      if (Platform.OS === 'web') alert('Please fill in all password fields.');
      else Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }

    if (newPassword.length < 6) {
      if (Platform.OS === 'web') alert('New password must be at least 6 characters long.');
      else Alert.alert('Error', 'New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      if (Platform.OS === 'web') alert('New password and Confirm password do not match.');
      else Alert.alert('Error', 'New password and Confirm password do not match.');
      return;
    }

    // Success Mock Action
    if (Platform.OS === 'web') alert('Password updated successfully!');
    else Alert.alert('Success', 'Password updated successfully!');

    // Reset fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.collapsibleSecTitle}>Change Admin Password</Text>

      {/* Current Password */}
      <Text style={styles.optionInputLabel}>Current Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={!showCurrent}
          placeholder="••••••••"
          placeholderTextColor={Colors.secondary}
        />
        <TouchableOpacity style={styles.eyeIconBtn} onPress={() => setShowCurrent(!showCurrent)}>
          {showCurrent ? <EyeOff size={18} color={Colors.secondary} /> : <Eye size={18} color={Colors.secondary} />}
        </TouchableOpacity>
      </View>

      {/* New Password */}
      <Text style={styles.optionInputLabel}>New Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showNew}
          placeholder="••••••••"
          placeholderTextColor={Colors.secondary}
        />
        <TouchableOpacity style={styles.eyeIconBtn} onPress={() => setShowNew(!showNew)}>
          {showNew ? <EyeOff size={18} color={Colors.secondary} /> : <Eye size={18} color={Colors.secondary} />}
        </TouchableOpacity>
      </View>

      {/* Strength Bar */}
      {newPassword ? (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthTextRow}>
            <Text style={styles.strengthLabel}>Password Strength: </Text>
            <Text style={[styles.strengthValue, { color: strength.color }]}>{strength.label}</Text>
          </View>
          <View style={styles.strengthTrack}>
            <View style={[styles.strengthBar, { width: strength.percent as any, backgroundColor: strength.color }]} />
          </View>
        </View>
      ) : null}

      {/* Confirm Password */}
      <Text style={[styles.optionInputLabel, { marginTop: Spacing.md - 4 }]}>Confirm New Password</Text>
      <TextInput
        style={styles.optionInput}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        placeholder="••••••••"
        placeholderTextColor={Colors.secondary}
      />

      <TouchableOpacity style={[styles.optionSaveBtn, { backgroundColor: Colors.sos }]} onPress={handleUpdatePassword}>
        <KeyRound size={18} color={Colors.white} />
        <Text style={styles.optionSaveBtnText}>Update Password</Text>
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 42,
    marginBottom: Spacing.md,
    paddingRight: Spacing.sm,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
    height: '100%',
    fontSize: 14,
    color: Colors.heading,
  },
  eyeIconBtn: {
    padding: 6,
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
  strengthContainer: {
    marginBottom: Spacing.xs,
  },
  strengthTextRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  strengthLabel: {
    fontSize: 11,
    color: Colors.secondary,
  },
  strengthValue: {
    fontSize: 11,
    fontWeight: '700',
  },
  strengthTrack: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
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
