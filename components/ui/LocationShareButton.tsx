import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { MapPin, Navigation } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius } from '@/constants/theme';

interface LocationShareButtonProps {
  onToggle?: (val: boolean) => void;
}

export default function LocationShareButton({ onToggle }: LocationShareButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 });

  const pulse = useSharedValue(1);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      // Pulse animation for location sharing dot
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1,
        false
      );

      // Simulate coordinates walking/changing
      interval = setInterval(() => {
        setCoords((prev) => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.0001,
          lng: prev.lng + (Math.random() - 0.5) * 0.0001,
        }));
      }, 3000);
    } else {
      pulse.value = 1;
    }
    if (onToggle) {
      onToggle(isActive);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: isActive ? 1 : 0,
  }));

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.iconCircle}>
            <MapPin size={20} color={isActive ? Colors.success : Colors.secondary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Share Location to Trusted Contacts</Text>
            {isActive ? (
              <View style={styles.statusBox}>
                <View style={styles.dotContainer}>
                  <Animated.View style={[styles.pulseDot, animatedPulseStyle]} />
                  <View style={styles.activeDot} />
                </View>
                <Text style={styles.coords}>
                  Active • {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° W
                </Text>
              </View>
            ) : (
              <Text style={styles.subtitle}>Broadcasting is currently disabled</Text>
            )}
          </View>
        </View>
        <Switch
          value={isActive}
          onValueChange={setIsActive}
          trackColor={{ false: Colors.border, true: Colors.successLight }}
          thumbColor={isActive ? Colors.success : Colors.disabled}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.heading,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dotContainer: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
    position: 'absolute',
  },
  pulseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success + '40',
    position: 'absolute',
  },
  coords: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: '600',
  },
});
