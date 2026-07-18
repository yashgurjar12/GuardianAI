import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Phone,
  MapPin,
  Radio,
  X,
  CheckCircle2,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { mockTrustedContacts } from '@/constants/mockData';

export default function EmergencyActiveScreen() {
  const router = useRouter();
  const [timer, setTimer] = useState(0);
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();

    return () => {
      clearInterval(interval);
      blink.stop();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleStop = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Emergency Banner */}
          <Animated.View style={[styles.banner, { opacity: blinkAnim }]}>
            <Radio size={16} color={Colors.white} />
            <Text style={styles.bannerText}>EMERGENCY ACTIVATED</Text>
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>● LIVE</Text>
            </View>
          </Animated.View>

          {/* Timer */}
          <View style={styles.timerSection}>
            <View style={styles.timerRing}>
              <View style={styles.timerCircle}>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
            </View>
          </View>

          {/* Status */}
          <View style={styles.statusSection}>
            <Text style={styles.statusTitle}>Help is being contacted</Text>
            <Text style={styles.statusSubtitle}>
              Stay calm. Emergency services are alerted.
            </Text>
          </View>

          {/* Location Card */}
          <Card style={styles.locationCard}>
            <View style={styles.locationRow}>
              <View style={styles.locationIcon}>
                <MapPin size={20} color={Colors.sos} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationTitle}>Location Sharing Active</Text>
                <Text style={styles.locationCoords}>
                  37.7749° N, 122.4194° W • Updating every 5s
                </Text>
              </View>
              <View style={styles.livePulse}>
                <Text style={styles.livePulseText}>LIVE</Text>
              </View>
            </View>
          </Card>

          {/* Contacts Notified */}
          <View style={styles.contactsSection}>
            <Text style={styles.contactsTitle}>CONTACTS NOTIFIED</Text>
            {mockTrustedContacts.slice(0, 3).map((contact) => (
              <View key={contact.id} style={styles.contactRow}>
                <View
                  style={[styles.contactAvatar, { backgroundColor: contact.color + '30' }]}
                >
                  <Text style={[styles.contactInitials, { color: contact.color }]}>
                    {contact.initials}
                  </Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRelation}>{contact.relation}</Text>
                </View>
                <CheckCircle2 size={20} color={Colors.success} />
              </View>
            ))}
          </View>

          {/* Actions */}
          <TouchableOpacity style={styles.callBtn}>
            <Phone size={20} color={Colors.white} />
            <Text style={styles.callBtnText}>Call Emergency Services</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
            <X size={20} color={Colors.sos} />
            <Text style={styles.stopBtnText}>I'm Safe - Stop Emergency</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.sos,
    paddingVertical: Spacing.sm + 4,
    borderRadius: Radius.small,
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  bannerText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  liveBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.circle,
  },
  liveText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  timerSection: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  timerRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: Colors.sos + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: Colors.sos + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.white,
    fontVariant: ['tabular-nums'],
  },
  statusSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  statusSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  locationCard: {
    backgroundColor: '#1A1A2E',
    marginBottom: Spacing.lg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  locationCoords: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  livePulse: {
    backgroundColor: Colors.sos,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.circle,
  },
  livePulseText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  contactsSection: {
    marginBottom: Spacing.lg,
  },
  contactsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
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
    color: Colors.white,
  },
  contactRelation: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.sos,
    height: 56,
    borderRadius: Radius.medium,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  callBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  stopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    height: 56,
    borderRadius: Radius.medium,
    borderWidth: 1,
    borderColor: Colors.sos + '40',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  stopBtnText: {
    color: Colors.sos,
    fontSize: 16,
    fontWeight: '600',
  },
});
