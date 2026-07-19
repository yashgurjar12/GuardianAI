import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'danger' | 'success' | 'warning';
}

export default function Card({ children, style, variant = 'default' }: CardProps) {
  const variantStyles: Record<string, ViewStyle> = {
    default: {},
    danger: { borderLeftWidth: 4, borderLeftColor: Colors.sos },
    success: { borderLeftWidth: 4, borderLeftColor: Colors.success },
    warning: { borderLeftWidth: 4, borderLeftColor: Colors.warning },
  };

  return (
    <View style={[styles.card, variantStyles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: Radius.large,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
});
