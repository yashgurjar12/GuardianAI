import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';

interface PremiumButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PremiumButton({ title, onPress, isLoading = false }: PremiumButtonProps) {
  const [btnState, setBtnState] = useState<'idle' | 'loading' | 'success'>('idle');
  const scale = useSharedValue(1);
  const checkScale = useSharedValue(0);

  useEffect(() => {
    if (isLoading) {
      setBtnState('loading');
    } else if (btnState === 'loading') {
      // Trigger success phase when loading finishes
      setBtnState('success');
      checkScale.value = withSpring(1, { damping: 12 });

      // Navigate after success checkmark plays
      const timer = setTimeout(() => {
        onPress();
        setBtnState('idle');
        checkScale.value = 0;
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handlePressIn = () => {
    scale.value = withTiming(0.94, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  return (
    <AnimatedPressable
      style={[
        styles.button,
        btnState === 'success' && styles.buttonSuccess,
        animatedStyle,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        if (btnState === 'idle') {
          // If no loading handling is managed outside, trigger loading natively for prototype feel
          setBtnState('loading');
          setTimeout(() => {
            setBtnState('success');
            checkScale.value = withSpring(1, { damping: 12 });
            setTimeout(() => {
              onPress();
              // Reset state back to idle
              setBtnState('idle');
              checkScale.value = 0;
            }, 800);
          }, 1500);
        }
      }}
      disabled={btnState !== 'idle'}
    >
      {btnState === 'idle' && (
        <Text style={styles.text}>{title}</Text>
      )}

      {btnState === 'loading' && (
        <ActivityIndicator color={Colors.white} size="small" />
      )}

      {btnState === 'success' && (
        <Animated.View style={[styles.checkContainer, animatedCheckStyle]}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 6L9 17L4 12"
              stroke={Colors.white}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Animated.View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Shadows.medium,
  },
  buttonSuccess: {
    backgroundColor: Colors.success,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
