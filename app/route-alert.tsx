import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ShieldCheck, Phone, X } from 'lucide-react-native';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';

export default function RouteAlertScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <X size={24} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.content}>
          {/* Warning Icon */}
          <View style={styles.warningContainer}>
            <View style={styles.warningGlow} />
            <View style={styles.warningCircle}>
              <AlertTriangle size={48} color={Colors.white} />
            </View>
          </View>

          {/* Alert Info */}
          <Text style={styles.alertTitle}>Route Deviation Detected</Text>
          <Text style={styles.alertSubtitle}>
            You appear to have left your expected route.{'\n'}
            Are you safe?
          </Text>

          {/* Risk Level */}
          <View style={styles.riskCard}>
            <Text style={styles.riskLabel}>Current Risk Level</Text>
            <View style={styles.riskBar}>
              <View style={styles.riskFill} />
            </View>
            <View style={styles.riskLegend}>
              <Text style={styles.riskLow}>Low</Text>
              <Text style={styles.riskMedium}>Medium</Text>
              <Text style={styles.riskHigh}>High</Text>
            </View>
          </View>

          {/* Route Details */}
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Expected Route</Text>
            <Text style={styles.detailValue}>Home → College via Main Street</Text>
            <View style={styles.detailDivider} />
            <Text style={styles.detailTitle}>Deviation Detected At</Text>
            <Text style={styles.detailValue}>Park Avenue, 2.1 km from destination</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.safeBtn}
              onPress={() => router.back()}
            >
              <ShieldCheck size={22} color={Colors.success} />
              <Text style={styles.safeBtnText}>I'm Safe</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sosBtn}
              onPress={() => router.replace('/sos-countdown')}
            >
              <Phone size={22} color={Colors.white} />
              <Text style={styles.sosBtnText}>Send SOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  safeArea: {
    flex: 1,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: Spacing.lg,
    marginTop: Spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  warningGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  warningCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.warning,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  alertSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 22,
  },
  riskCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginTop: Spacing.xl,
  },
  riskLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  riskBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  riskFill: {
    width: '60%',
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.warning,
  },
  riskLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  riskLow: { fontSize: 11, color: Colors.success },
  riskMedium: { fontSize: 11, color: Colors.warning, fontWeight: '600' },
  riskHigh: { fontSize: 11, color: Colors.sos },
  detailCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  detailDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
    marginTop: Spacing.xl,
  },
  safeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: Radius.medium,
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderColor: Colors.success + '40',
    gap: Spacing.sm,
  },
  safeBtnText: {
    color: Colors.success,
    fontSize: 16,
    fontWeight: '600',
  },
  sosBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: Radius.medium,
    backgroundColor: Colors.sos,
    gap: Spacing.sm,
  },
  sosBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
