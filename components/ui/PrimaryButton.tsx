import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors, Typography, Radius, Shadows, Spacing } from '@/constants/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export default function PrimaryButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  icon,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} size="small" />
      ) : (
        <>
          {icon && icon}
          <Text style={[styles.text, icon ? { marginLeft: Spacing.sm } : {}, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
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
    paddingHorizontal: Spacing.lg,
    ...Shadows.medium,
  },
  disabled: {
    backgroundColor: Colors.disabled,
  },
  text: {
    color: Colors.white,
    fontSize: Typography.button.fontSize,
    fontWeight: Typography.button.fontWeight,
  },
});
