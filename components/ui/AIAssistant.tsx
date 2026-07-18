import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Circle, Ellipse, Path, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';

export default function AIAssistant() {
  // Animations
  const hoverVal = useSharedValue(0);
  const eyeBlink = useSharedValue(1);
  const armWave = useSharedValue(0);
  const bubbleOpacity = useSharedValue(0);
  const bubbleScale = useSharedValue(0.7);

  useEffect(() => {
    // Floating hover effect
    hoverVal.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1800 }),
        withTiming(0, { duration: 1800 })
      ),
      -1,
      false
    );

    // Waving arm animation
    armWave.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 800 }),
        withTiming(-10, { duration: 800 }),
        withTiming(15, { duration: 800 }),
        withTiming(0, { duration: 800 }),
        withDelay(2000, withTiming(0, { duration: 10 }))
      ),
      -1,
      false
    );

    // Eye blinking loop
    const blinkInterval = setInterval(() => {
      eyeBlink.value = withSequence(
        withTiming(0.1, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    }, 4000);

    // Slide in message bubble
    bubbleOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));
    bubbleScale.value = withDelay(800, withTiming(1, { duration: 500 }));

    return () => clearInterval(blinkInterval);
  }, []);

  const animatedRobotStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: hoverVal.value }],
  }));

  const animatedEyeStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: eyeBlink.value }],
  }));

  const animatedArmStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: 42 }, // Pivot point offset
      { translateY: 38 },
      { rotate: `${armWave.value}deg` },
      { translateX: -42 },
      { translateY: -38 },
    ],
  }));

  const animatedBubbleStyle = useAnimatedStyle(() => ({
    opacity: bubbleOpacity.value,
    transform: [{ scale: bubbleScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Robot SVG Container */}
      <Animated.View style={[styles.robotContainer, animatedRobotStyle]}>
        <Svg width={96} height={96} viewBox="0 0 100 100" fill="none">
          {/* Shadow underneath */}
          <Ellipse cx="50" cy="90" rx="20" ry="3" fill="rgba(0,0,0,0.06)" />

          {/* Left Arm */}
          <Path d="M12,42 C8,45 6,55 10,58 C13,60 17,52 16,46" fill="#A1A1AA" />

          {/* Right Arm (Waving) */}
          <Animated.View style={animatedArmStyle}>
            {/* Using basic SVG paths to draw the arm */}
            <Path d="M84,42 C88,40 92,30 88,27 C84,24 81,35 81,42" fill="#A1A1AA" />
            <Circle cx="88" cy="27" r="3" fill={Colors.primary} />
          </Animated.View>

          {/* Body */}
          <Rect x="24" y="44" width="52" height="38" rx="16" fill="#E4E4E7" stroke="#D4D4D8" strokeWidth="2" />
          <Rect x="32" y="52" width="36" height="22" rx="8" fill="#F4F4F5" />
          {/* Logo Badge on Chest */}
          <Path d="M50,56 L55,61 L45,61 Z" fill={Colors.primary} />

          {/* Neck */}
          <Rect x="42" y="38" width="16" height="8" rx="2" fill="#A1A1AA" />

          {/* Head */}
          <Rect x="20" y="8" width="60" height="34" rx="15" fill="#E4E4E7" stroke="#D4D4D8" strokeWidth="2" />

          {/* Face screen */}
          <Rect x="26" y="13" width="48" height="24" rx="10" fill="#1E293B" />

          {/* Left Eye */}
          <Animated.View style={[styles.eyeWrapper, { left: 34, top: 19 }, animatedEyeStyle]}>
            <View style={styles.eyeInner} />
          </Animated.View>

          {/* Right Eye */}
          <Animated.View style={[styles.eyeWrapper, { left: 52, top: 19 }, animatedEyeStyle]}>
            <View style={styles.eyeInner} />
          </Animated.View>

          {/* Antenna */}
          <Path d="M50,8 L50,2" stroke="#A1A1AA" strokeWidth="3" />
          <Circle cx="50" cy="2" r="3.5" fill={Colors.primary} />
        </Svg>
      </Animated.View>

      {/* Message Bubble */}
      <Animated.View style={[styles.bubbleContainer, animatedBubbleStyle]}>
        <View style={styles.bubble}>
          <Text style={styles.assistantName}>Guardian AI</Text>
          <Text style={styles.bubbleText}>Hello! Ready to protect you today.</Text>
        </View>
        <View style={styles.bubbleArrow} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  robotContainer: {
    marginRight: Spacing.md,
  },
  eyeWrapper: {
    position: 'absolute',
    width: 10,
    height: 10,
  },
  eyeInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#38BDF8', // bright sky blue
  },
  bubbleContainer: {
    maxWidth: '65%',
    position: 'relative',
    ...Shadows.small,
  },
  bubble: {
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  assistantName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 2,
  },
  bubbleText: {
    fontSize: 13,
    color: Colors.heading,
    lineHeight: 18,
  },
  bubbleArrow: {
    position: 'absolute',
    left: -8,
    top: 24,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: Colors.border,
  },
});
