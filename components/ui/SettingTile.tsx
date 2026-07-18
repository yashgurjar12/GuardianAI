import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';

interface SettingTileProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  type?: 'arrow' | 'toggle' | 'value';
  value?: boolean | string;
  onToggle?: (value: boolean) => void;
}

export default function SettingTile({
  icon,
  title,
  subtitle,
  onPress,
  type = 'arrow',
  value,
  onToggle,
}: SettingTileProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={type === 'toggle' ? 1 : 0.6}
      disabled={type === 'toggle'}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {type === 'arrow' && (
        <ChevronRight size={20} color={Colors.disabled} />
      )}
      {type === 'toggle' && (
        <Switch
          value={value as boolean}
          onValueChange={onToggle}
          trackColor={{ false: Colors.border, true: Colors.primaryLight }}
          thumbColor={value ? Colors.primary : Colors.disabled}
        />
      )}
      {type === 'value' && (
        <Text style={styles.valueText}>{value as string}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.medium,
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Radius.small,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.heading,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 2,
  },
  valueText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '500',
  },
});
