import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, AlertTriangle } from 'lucide-react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';

export default function SOSCountdownScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Pulse animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    glow.start();

    return () => {
      pulse.stop();
      glow.stop();
    };
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      Vibration.vibrate([0, 500, 200, 500]);
      router.replace('/emergency-active');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
      Vibration.vibrate(100);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SOS</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={handleCancel}>
            <X size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Warning */}
        <View style={styles.warningSection}>
          <AlertTriangle size={48} color={Colors.sos} />
          <Text style={styles.warningTitle}>Are you in emergency?</Text>
          <Text style={styles.warningSubtitle}>
            Press the button below & help will be{'\n'}reach to you soon
          </Text>
        </View>

        {/* Countdown Circle */}
        <View style={styles.countdownContainer}>
          {/* Outer glow ring 1 */}
          <Animated.View
            style={[
              styles.glowRing3,
              { opacity: opacityAnim, transform: [{ scale: pulseAnim }] },
            ]}
          />
          {/* Outer glow ring 2 */}
          <Animated.View
            style={[
              styles.glowRing2,
              { opacity: opacityAnim },
            ]}
          />
          {/* Inner glow ring */}
          <View style={styles.glowRing1} />
          {/* Main circle */}
          <View style={styles.countdownCircle}>
            <Text style={styles.countdownNumber}>
              {countdown.toString().padStart(2, '0')}:{countdown.toString().padStart(2, '0')}
            </Text>
            <Text style={styles.countdownLabel}>Seconds</Text>
          </View>
        </View>

        {/* Cancel Link */}
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>Stop SOS alert</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningSection: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  warningTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.white,
    marginTop: Spacing.lg,
    textAlign: 'center',
  },
  warningSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    marginTop: Spacing.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
  countdownContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing3: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  glowRing2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(239, 68, 68, 0.25)',
  },
  glowRing1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(239, 68, 68, 0.35)',
  },
  countdownCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.sos,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.sos,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  countdownNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.white,
  },
  countdownLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  cancelBtn: {
    alignItems: 'center',
    paddingBottom: Spacing.xxl,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.sos,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
