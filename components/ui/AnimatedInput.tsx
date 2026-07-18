import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Colors, Spacing, Radius } from '@/constants/theme';

interface AnimatedInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: React.ReactNode;
  secureTextEntry?: boolean;
  rightElement?: React.ReactNode;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  style?: ViewStyle;
}

export default function AnimatedInput({
  label,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  rightElement,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Shared values for animation
  const focusProgress = useSharedValue(value.length > 0 ? 1 : 0);
  const iconRotate = useSharedValue(0);

  useEffect(() => {
    // Smoothly animate label position based on focus or if input has text
    const target = isFocused || value.length > 0 ? 1 : 0;
    focusProgress.value = withTiming(target, { duration: 200 });

    if (isFocused) {
      // Small rotate/bounce effect on icon when focused
      iconRotate.value = withTiming(1, { duration: 150 }, () => {
        iconRotate.value = withTiming(0, { duration: 150 });
      });
    }
  }, [isFocused, value]);

  // Label animated style (slides up and shrinks)
  const animatedLabelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(focusProgress.value, [0, 1], [16, -10], 'clamp');
    const scale = interpolate(focusProgress.value, [0, 1], [1, 0.78], 'clamp');
    const translateX = interpolate(focusProgress.value, [0, 1], [0, -10], 'clamp');
    return {
      transform: [{ translateY }, { scale }, { translateX }],
      color: focusProgress.value > 0.5 ? Colors.primary : Colors.secondary,
      backgroundColor: focusProgress.value > 0.5 ? Colors.white : 'transparent',
    };
  });

  // Border bottom expanding accent line
  const animatedBorderStyle = useAnimatedStyle(() => {
    const scaleX = interpolate(focusProgress.value, [0, 1], [0, 1], 'clamp');
    return {
      transform: [{ scaleX }],
      backgroundColor: Colors.primary,
    };
  });

  // Icon animation (rotation and color tinting)
  const animatedIconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(iconRotate.value, [0, 1], [0, 15]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  return (
    <View style={[styles.wrapper, style]}>
      {/* Background Container with border and shadow glow */}
      <View
        style={[
          styles.container,
          isFocused && styles.containerFocused,
        ]}
      >
        {/* Left Icon */}
        <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement, {
              color: isFocused ? Colors.primary : Colors.secondary,
            })
            : icon}
        </Animated.View>

        {/* Input & Label Box */}
        <View style={styles.inputBox}>
          {/* Animated Label */}
          <Animated.Text style={[styles.label, animatedLabelStyle]} pointerEvents="none">
            {label}
          </Animated.Text>

          {/* Actual TextInput */}
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {/* Right Element (like Password Eye Toggle) */}
        {rightElement && <View style={styles.rightWrapper}>{rightElement}</View>}

        {/* Bottom expanding accent line */}
        <Animated.View style={[styles.borderAccent, animatedBorderStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: 56,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    position: 'relative',
    paddingHorizontal: Spacing.md,
  },
  containerFocused: {
    borderColor: Colors.primaryLight,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  iconWrapper: {
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 4,
    fontSize: 15,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.heading,
    paddingTop: 10, // makes room for floating label
    height: '100%',
  },
  rightWrapper: {
    marginLeft: Spacing.sm,
    justifyContent: 'center',
  },
  borderAccent: {
    position: 'absolute',
    bottom: -1.5,
    left: 0,
    right: 0,
    height: 2.5,
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 1.5,
  },
});
