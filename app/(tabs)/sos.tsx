import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ShieldAlert,
  PhoneCall,
  MapPin,
  Users,
  Radio,
  Flame,
  HeartPulse,
  Car,
  Eye,
  ShieldCheck,
  Zap,
} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Card from '@/components/ui/Card';
import HoldSOSButton from '@/components/ui/HoldSOSButton';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { useContacts } from '@/context/ContactsContext';
import { emergencyTypes } from '@/constants/mockData';

const categoryIcons: Record<string, React.ReactNode> = {
  Medical: <HeartPulse size={20} color={Colors.white} />,
  Fire: <Flame size={20} color={Colors.white} />,
  Violence: <ShieldAlert size={20} color={Colors.white} />,
  Accident: <Car size={20} color={Colors.white} />,
  Stalking: <Eye size={20} color={Colors.white} />,
  Rescue: <Radio size={20} color={Colors.white} />,
};

export default function SOSScreen() {
  const router = useRouter();
  const { contacts } = useContacts();
  const [selectedType, setSelectedType] = useState('Medical');

  const emergencyContactsCount = contacts.filter((c) => c.isEmergency !== false).length;

  const triggerSOS = () => {
    router.push('/sos-countdown');
  };

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Emergency SOS</Text>
              <Text style={styles.subtitle}>Instant emergency broadcast & police alert</Text>
            </View>
            <View style={styles.sosBadgeHeader}>
              <View style={styles.pulseDot} />
              <Text style={styles.pulseText}>LIVE PROTECT</Text>
            </View>
          </View>

          {/* Primary SOS Action Center */}
          <Card style={styles.sosCard}>
            <View style={styles.sosCardHeader}>
              <View style={styles.liveShieldRow}>
                <ShieldCheck size={20} color={Colors.success} />
                <Text style={styles.liveShieldText}>Guardian Protection Active</Text>
              </View>
              <Text style={styles.locationText}>
                <MapPin size={12} color={Colors.secondary} /> 4th Mound Road, CA
              </Text>
            </View>

            {/* Central Hold to SOS Trigger */}
            <View style={styles.sosButtonContainer}>
              <HoldSOSButton onTrigger={triggerSOS} />
            </View>

            <Text style={styles.holdNotice}>
              Hold the button for 2 seconds to initiate SOS alert. Tap trigger below for instant countdown.
            </Text>

            <TouchableOpacity style={styles.instantButton} onPress={triggerSOS} activeOpacity={0.85}>
              <Zap size={18} color={Colors.white} />
              <Text style={styles.instantButtonText}>Instant 3s Trigger</Text>
            </TouchableOpacity>
          </Card>

          {/* Quick Select Emergency Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Emergency Type</Text>
            <View style={styles.typeGrid}>
              {emergencyTypes.map((item) => {
                const isSelected = selectedType === item.label;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.typeCard,
                      isSelected && { borderColor: item.color, backgroundColor: item.color + '15' },
                    ]}
                    onPress={() => setSelectedType(item.label)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.typeIconBox, { backgroundColor: item.color }]}>
                      {categoryIcons[item.label] || <ShieldAlert size={20} color={Colors.white} />}
                    </View>
                    <Text style={styles.typeLabel}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Trusted Contacts Status Bar */}
          <View style={styles.section}>
            <View style={styles.contactsHeader}>
              <Text style={styles.sectionTitle}>Dispatch Recipients</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/contacts')}>
                <Text style={styles.manageLink}>Manage Contacts ➜</Text>
              </TouchableOpacity>
            </View>

            <Card style={styles.contactsCard}>
              <View style={styles.contactsRow}>
                <View style={styles.contactsIconBox}>
                  <Users size={22} color={Colors.primary} />
                </View>
                <View style={styles.contactsInfo}>
                  <Text style={styles.contactsTitle}>
                    {emergencyContactsCount} Emergency Contacts Active
                  </Text>
                  <Text style={styles.contactsSub}>
                    Will receive SMS, phone call, and real-time location link upon SOS activation.
                  </Text>
                </View>
              </View>
            </Card>
          </View>

          {/* Call 911 / Police Direct Call */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.callPoliceBtn} activeOpacity={0.85} onPress={triggerSOS}>
              <PhoneCall size={20} color={Colors.white} />
              <Text style={styles.callPoliceText}>Call Local Authorities (911)</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
  subtitle: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 2,
  },
  sosBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.dangerBg,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.circle,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.sos,
  },
  pulseText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.sos,
    letterSpacing: 0.5,
  },
  sosCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  sosCardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  liveShieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveShieldText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.heading,
  },
  locationText: {
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: '500',
  },
  sosButtonContainer: {
    marginVertical: Spacing.sm,
  },
  holdNotice: {
    fontSize: 12,
    color: Colors.secondary,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 18,
  },
  instantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.sos,
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.medium,
    marginTop: Spacing.md,
    ...Shadows.small,
  },
  instantButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  typeCard: {
    width: '31%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.medium,
    padding: Spacing.sm + 2,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
  },
  typeIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.heading,
    textAlign: 'center',
  },
  contactsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  manageLink: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  contactsCard: {
    padding: Spacing.md,
  },
  contactsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactsIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  contactsInfo: {
    flex: 1,
  },
  contactsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.heading,
  },
  contactsSub: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
    lineHeight: 16,
  },
  callPoliceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: '#1E293B',
    paddingVertical: Spacing.md + 2,
    borderRadius: Radius.medium,
    ...Shadows.medium,
  },
  callPoliceText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
