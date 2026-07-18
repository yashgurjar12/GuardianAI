import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Bell,
  MessageSquare,
  Mail,
  Vibrate,
  Moon,
  Phone as PhoneIcon,
  Shield,
  Volume2,
  Info,
  UserPlus,
} from 'lucide-react-native';
import SettingTile from '@/components/ui/SettingTile';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { mockTrustedContacts } from '@/constants/mockData';

export default function SettingsScreen() {
  const router = useRouter();

  const [settings, setSettings] = useState({
    pushNotifications: true,
    smsAlerts: true,
    emailAlerts: false,
    vibrationAlerts: true,
    autoActivateNight: false,
    fakeCallSchedule: false,
    silentSOS: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.heading} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionLabelRow}>
              <Shield size={18} color={Colors.sos} />
              <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <UserPlus size={16} color={Colors.primary} />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
          <Card>
            {mockTrustedContacts.map((contact, idx) => (
              <View
                key={contact.id}
                style={[
                  styles.contactRow,
                  idx < mockTrustedContacts.length - 1 && styles.contactBorder,
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
                  <Text style={styles.contactPhone}>
                    {contact.relation} • {contact.phone}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <Bell size={18} color={Colors.warning} />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          <SettingTile
            icon={<Bell size={20} color={Colors.primary} />}
            title="Push Notifications"
            type="toggle"
            value={settings.pushNotifications}
            onToggle={() => toggle('pushNotifications')}
          />
          <SettingTile
            icon={<MessageSquare size={20} color={Colors.success} />}
            title="SMS Alerts"
            type="toggle"
            value={settings.smsAlerts}
            onToggle={() => toggle('smsAlerts')}
          />
          <SettingTile
            icon={<Mail size={20} color={Colors.warning} />}
            title="Email Alerts"
            type="toggle"
            value={settings.emailAlerts}
            onToggle={() => toggle('emailAlerts')}
          />
          <SettingTile
            icon={<Vibrate size={20} color="#8B5CF6" />}
            title="Vibration Alerts"
            type="toggle"
            value={settings.vibrationAlerts}
            onToggle={() => toggle('vibrationAlerts')}
          />
        </View>

        {/* Safety */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <Shield size={18} color={Colors.success} />
            <Text style={styles.sectionTitle}>Safety</Text>
          </View>
          <SettingTile
            icon={<Moon size={20} color="#6366F1" />}
            title="Auto-activate at night"
            subtitle="Enable safety features after sunset"
            type="toggle"
            value={settings.autoActivateNight}
            onToggle={() => toggle('autoActivateNight')}
          />
          <SettingTile
            icon={<PhoneIcon size={20} color={Colors.primary} />}
            title="Fake Call schedule"
            subtitle="Schedule fake incoming calls"
            type="toggle"
            value={settings.fakeCallSchedule}
            onToggle={() => toggle('fakeCallSchedule')}
          />
          <SettingTile
            icon={<Volume2 size={20} color={Colors.sos} />}
            title="Silent SOS mode"
            subtitle="Trigger SOS without sound"
            type="toggle"
            value={settings.silentSOS}
            onToggle={() => toggle('silentSOS')}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <SettingTile
            icon={<Info size={20} color={Colors.secondary} />}
            title="About GuardianAI"
            subtitle="Version 1.0.0"
            onPress={() => { }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.heading,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
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
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.heading,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInitials: {
    fontSize: 14,
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
  contactPhone: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
});
