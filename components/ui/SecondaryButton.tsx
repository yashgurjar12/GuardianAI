import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '@/constants/theme';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function SecondaryButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  icon,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && icon}
      <Text style={[styles.text, icon ? { marginLeft: Spacing.sm } : {}, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    height: 56,
    borderRadius: Radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  disabled: {
    borderColor: Colors.disabled,
  },
  text: {
    color: Colors.primary,
    fontSize: Typography.button.fontSize,
    fontWeight: Typography.button.fontWeight,
  },
});
