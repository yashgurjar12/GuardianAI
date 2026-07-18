import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/theme';

type BadgeStatus = 'safe' | 'warning' | 'alert' | 'info';

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
  style?: ViewStyle;
}

const statusConfig: Record<BadgeStatus, { bg: string; text: string; label: string }> = {
  safe: { bg: Colors.successLight, text: Colors.success, label: 'Safe' },
  warning: { bg: Colors.warningBg, text: Colors.warning, label: 'Warning' },
  alert: { bg: Colors.dangerBg, text: Colors.sos, label: 'Alert' },
  info: { bg: Colors.primaryLight, text: Colors.primary, label: 'Info' },
};

export default function StatusBadge({ status, label, style }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, style]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.text, { color: config.text }]}>
        {label || config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.circle,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.xs + 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
