/**
 * GuardianAI Design System – Theme Constants
 * Based on Project Memory/06-UI-Design-System.md
 */

export const Colors = {
  // Primary
  primary: '#2563EB',
  primaryLight: '#DBEAFE',
  primaryDark: '#1E40AF',

  // Emergency
  sos: '#EF4444',
  sosDark: '#DC2626',
  dangerBg: '#FEE2E2',
  dangerBorder: '#FCA5A5',

  // Success
  success: '#22C55E',
  successLight: '#DCFCE7',

  // Warning
  warning: '#F59E0B',
  warningBg: '#FEF3C7',

  // Neutral
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  divider: '#CBD5E1',

  // Text
  heading: '#0F172A',
  body: '#334155',
  secondary: '#64748B',
  disabled: '#94A3B8',

  // Special
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Emergency screen (dark theme for SOS screens)
  emergencyBg: '#1A1A2E',
  emergencyCard: '#16213E',
  emergencyText: '#FFFFFF',
};

export const Typography = {
  // Font Family
  fontFamily: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },

  // Headings
  h1: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40 },
  h2: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36 },
  h3: { fontSize: 24, fontWeight: '700' as const, lineHeight: 32 },
  h4: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
  h5: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },

  // Body
  bodyLarge: { fontSize: 18, fontWeight: '400' as const, lineHeight: 28 },
  bodyMedium: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },

  // Labels
  label: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
  button: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  small: 8,
  medium: 12,
  large: 20,
  extraLarge: 28,
  circle: 999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  sos: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
};

export const IconSize = {
  small: 18,
  medium: 24,
  large: 32,
};
