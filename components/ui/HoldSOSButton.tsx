import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Vibration,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Shadows } from '@/constants/theme';

interface HoldSOSButtonProps {
  onTrigger: () => void;
  size?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function HoldSOSButton({ onTrigger, size = 130 }: HoldSOSButtonProps) {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const ringScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0.3);

  // SVG dimensions
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Pulse animation of outer ring
    ringScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1200 }),
        withTiming(1, { duration: 1200 })
      ),
      -1,
      false
    );
    ringOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1200 }),
        withTiming(0.2, { duration: 1200 })
      ),
      -1,
      false
    );
  }, []);

  const handlePressIn = () => {
    scale.value = withSpring(0.92);
    // Start progress timing: 2 seconds
    progress.value = withTiming(1, { duration: 2000 }, (finished) => {
      if (finished) {
        runOnJS(triggerSOS)();
      }
    });
    // Trigger vibration feedback
    Vibration.vibrate([0, 100, 100, 150]);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    // Reset progress
    progress.value = withTiming(0, { duration: 200 });
  };

  const triggerSOS = () => {
    Vibration.vibrate(500);
    onTrigger();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  // Progress border dash offset animation
  const animatedProgressProps = useAnimatedStyle(() => {
    const strokeDashoffset = circumference - progress.value * circumference;
    return {
      strokeDashoffset,
    } as any;
  });

  return (
    <View style={styles.container}>
      {/* Outer pulsing ring */}
      <Animated.View
        style={[
          styles.glowRing,
          {
            width: size + 35,
            height: size + 35,
            borderRadius: (size + 35) / 2,
          },
          animatedRingStyle,
        ]}
      />

      <Animated.View style={[styles.btnWrapper, animatedStyle]}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.button,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          {/* Progress SVG Overlay */}
          <View style={StyleSheet.absoluteFill}>
            <Svg width={size} height={size}>
              {/* Animated Progress Border */}
              <AnimatedCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={Colors.white}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${circumference}`}
                animatedProps={animatedProgressProps as any}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </Svg>
          </View>

          {/* Label */}
          <Text style={styles.sosText}>SOS</Text>
          <Text style={styles.subText}>Hold 2s</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 190,
  },
  glowRing: {
    position: 'absolute',
    backgroundColor: 'rgba(239, 68, 68, 0.22)',
  },
  btnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sos,
  },
  button: {
    backgroundColor: Colors.sos,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  sosText: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  subText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
  },
});
