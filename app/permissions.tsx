import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Users, Bell, ChevronRight } from 'lucide-react-native';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius } from '@/constants/theme';

interface PermissionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  granted: boolean;
}

export default function PermissionsScreen() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<PermissionItem[]>([
    {
      id: 'location',
      icon: <MapPin size={28} color={Colors.primary} />,
      title: 'Location Access',
      description: 'Required for safe route tracking and emergency location sharing.',
      granted: false,
    },
    {
      id: 'contacts',
      icon: <Users size={28} color={Colors.success} />,
      title: 'Contacts Access',
      description: 'To quickly alert your trusted contacts during emergencies.',
      granted: false,
    },
    {
      id: 'notifications',
      icon: <Bell size={28} color={Colors.warning} />,
      title: 'Notifications',
      description: 'Stay informed about route alerts and safety updates.',
      granted: false,
    },
  ]);

  const togglePermission = (id: string) => {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, granted: !p.granted } : p))
    );
  };

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.stepLabel}>SETUP</Text>
          <Text style={styles.title}>Permissions</Text>
          <Text style={styles.subtitle}>
            GuardianAI needs these permissions to keep you safe.
          </Text>
        </View>

        {/* Permission Cards */}
        <View style={styles.cards}>
          {permissions.map((perm) => (
            <TouchableOpacity
              key={perm.id}
              activeOpacity={0.7}
              onPress={() => togglePermission(perm.id)}
            >
              <Card
                style={[
                  styles.permissionCard,
                  perm.granted && styles.permissionGranted,
                ]}
              >
                <View style={styles.permRow}>
                  <View style={[
                    styles.iconCircle,
                    perm.granted && { backgroundColor: Colors.successLight },
                  ]}>
                    {perm.icon}
                  </View>
                  <View style={styles.permText}>
                    <Text style={styles.permTitle}>{perm.title}</Text>
                    <Text style={styles.permDescription}>{perm.description}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      perm.granted && styles.checkboxGranted,
                    ]}
                  >
                    {perm.granted && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <PrimaryButton title="Continue" onPress={handleContinue} />
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleContinue}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.heading,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.secondary,
    marginTop: Spacing.sm,
    lineHeight: 22,
  },
  cards: {
    gap: Spacing.md,
  },
  permissionCard: {
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  permissionGranted: {
    borderColor: Colors.success,
    backgroundColor: Colors.successLight + '30',
  },
  permRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permText: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },
  permTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.heading,
  },
  permDescription: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 4,
    lineHeight: 18,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxGranted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  skipText: {
    fontSize: 15,
    color: Colors.secondary,
    fontWeight: '500',
  },
});
