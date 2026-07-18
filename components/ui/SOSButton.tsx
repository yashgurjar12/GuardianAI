import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import { Colors, Shadows } from '@/constants/theme';

interface SOSButtonProps {
  onPress: () => void;
  size?: number;
}

export default function SOSButton({ onPress, size = 120 }: SOSButtonProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1200,
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

  return (
    <View style={styles.container}>
      {/* Outer glow ring */}
      <Animated.View
        style={[
          styles.glowRing,
          {
            width: size + 60,
            height: size + 60,
            borderRadius: (size + 60) / 2,
            opacity: glowAnim,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      {/* Middle glow ring */}
      <Animated.View
        style={[
          styles.middleRing,
          {
            width: size + 30,
            height: size + 30,
            borderRadius: (size + 30) / 2,
            opacity: glowAnim,
          },
        ]}
      />
      {/* Main SOS button */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.sosText}>SOS</Text>
        <Text style={styles.subText}>Hold for Help</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  glowRing: {
    position: 'absolute',
    backgroundColor: Colors.sos,
  },
  middleRing: {
    position: 'absolute',
    backgroundColor: Colors.sos,
  },
  button: {
    backgroundColor: Colors.sos,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sos,
  },
  sosText: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 2,
  },
  subText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
});
