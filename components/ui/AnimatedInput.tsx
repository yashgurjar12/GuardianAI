import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
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
  error?: string;
  onPress?: () => void;
  editable?: boolean;
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
  error,
  onPress,
  editable,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const hasValue = value.length > 0;
  const isLabelActive = isFocused || hasValue;

  // Shared values for animation
  const focusProgress = useSharedValue(isLabelActive ? 1 : 0);
  const iconRotate = useSharedValue(0);

  useEffect(() => {
    focusProgress.value = withTiming(isLabelActive ? 1 : 0, { duration: 180 });

    if (isFocused) {
      iconRotate.value = withTiming(1, { duration: 120 }, () => {
        iconRotate.value = withTiming(0, { duration: 120 });
      });
    }
  }, [isFocused, value]);

  // Floating label inside input container (smooth top position and font scaling)
  const animatedLabelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(focusProgress.value, [0, 1], [16, 5]);
    const fontSize = interpolate(focusProgress.value, [0, 1], [14, 11]);

    return {
      transform: [{ translateY }],
      fontSize,
      fontWeight: focusProgress.value > 0.5 ? '600' : '400',
      color: error
        ? Colors.sos
        : focusProgress.value > 0.5
        ? Colors.primary
        : Colors.secondary,
    };
  });

  // Border bottom expanding accent line
  const animatedBorderStyle = useAnimatedStyle(() => {
    const scaleX = interpolate(focusProgress.value, [0, 1], [0, 1]);
    return {
      transform: [{ scaleX }],
      backgroundColor: error ? Colors.sos : Colors.primary,
    };
  });

  // Icon animation
  const animatedIconStyle = useAnimatedStyle(() => {
    const rotation = interpolate(iconRotate.value, [0, 1], [0, 12]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const handleContainerPress = () => {
    if (onPress) {
      onPress();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <View style={[styles.wrapper, style]}>
      {/* Outer Container - Click anywhere to focus or trigger onPress */}
      <Pressable
        onPress={handleContainerPress}
        style={[
          styles.container,
          isFocused && styles.containerFocused,
          !!error && styles.containerError,
        ]}
      >
        {/* Left Icon */}
        <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
                color: error
                  ? Colors.sos
                  : isFocused
                  ? Colors.primary
                  : Colors.secondary,
              })
            : icon}
        </Animated.View>

        {/* Input & Label Box */}
        <View style={styles.inputBox}>
          {/* Animated Label */}
          <Animated.Text
            style={[styles.label, animatedLabelStyle]}
            pointerEvents="none"
          >
            {label}
          </Animated.Text>

          {/* Actual TextInput */}
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              isLabelActive && styles.inputActive,
              Platform.OS === 'web' &&
                ({
                  outlineStyle: 'none',
                  outlineWidth: 0,
                  outlineColor: 'transparent',
                  boxShadow: 'none',
                } as any),
            ]}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={editable ?? (onPress ? false : true)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {/* Right Element (e.g., Password Eye Toggle or Calendar Button) */}
        {rightElement && <View style={styles.rightWrapper}>{rightElement}</View>}

        {/* Bottom Accent Line */}
        <Animated.View style={[styles.borderAccent, animatedBorderStyle]} />
      </Pressable>

      {/* Error text message if present */}
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    height: 56,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    position: 'relative',
    paddingHorizontal: Spacing.md,
    overflow: 'hidden',
  },
  containerFocused: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  containerError: {
    borderColor: Colors.sos,
    backgroundColor: '#FEF2F2',
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
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.heading,
    paddingTop: 0,
    paddingBottom: 0,
    height: '100%',
    textAlignVertical: 'center',
  },
  inputActive: {
    paddingTop: 18,
    paddingBottom: 2,
  },
  rightWrapper: {
    marginLeft: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
  },
  errorText: {
    fontSize: 12,
    color: Colors.sos,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '500',
  },
});
