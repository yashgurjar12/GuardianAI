import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { Search, MapPin } from 'lucide-react-native';
import { Colors, Radius, Spacing, Shadows } from '@/constants/theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
}

export default function SearchBar({
  placeholder = 'Search destination...',
  value,
  onChangeText,
  style,
}: SearchBarProps) {
  return (
    <View style={[styles.container, style]}>
      <Search size={20} color={Colors.secondary} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.disabled}
        value={value}
        onChangeText={onChangeText}
      />
      <MapPin size={20} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    height: 52,
    borderRadius: Radius.large,
    paddingHorizontal: Spacing.md,
    ...Shadows.small,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.heading,
  },
});
