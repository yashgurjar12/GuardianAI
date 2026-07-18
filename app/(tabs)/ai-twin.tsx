import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Brain,
  Clock,
  MapPin,
  Sun,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Activity,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import ProgressRing from '@/components/ui/ProgressRing';
import StatusBadge from '@/components/ui/StatusBadge';
import { Colors, Spacing, Radius } from '@/constants/theme';
import {
  mockUser,
  mockAIInsights,
  mockWeeklyActivity,
  mockTodayJourney,
} from '@/constants/mockData';

const insightIcons: Record<string, React.ReactNode> = {
  clock: <Clock size={20} color={Colors.primary} />,
  'map-pin': <MapPin size={20} color={Colors.warning} />,
  sun: <Sun size={20} color={Colors.warning} />,
  'shield-check': <ShieldCheck size={20} color={Colors.success} />,
};

const insightColors: Record<string, string> = {
  info: Colors.primaryLight,
  warning: Colors.warningBg,
  success: Colors.successLight,
};

export default function AITwinScreen() {
  const maxTrips = Math.max(...mockWeeklyActivity.map((d) => d.trips));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>AI Twin</Text>
            <Text style={styles.subtitle}>Your digital safety companion</Text>
          </View>
          <View style={styles.headerIcon}>
            <Brain size={24} color={Colors.primary} />
          </View>
        </View>

        {/* Profile Summary + Risk Score */}
        <Card style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {mockUser.name.split(' ').map((n) => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>{mockUser.name}</Text>
                <StatusBadge status="safe" label={mockUser.status} />
              </View>
            </View>
            <ProgressRing
              progress={mockUser.riskScore}
              size={80}
              strokeWidth={8}
              label="Risk"
            />
          </View>
        </Card>

        {/* AI Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Insights</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          {mockAIInsights.map((insight) => (
            <Card key={insight.id} style={styles.insightCard}>
              <View style={styles.insightRow}>
                <View
                  style={[
                    styles.insightIcon,
                    { backgroundColor: insightColors[insight.type] },
                  ]}
                >
                  {insightIcons[insight.icon]}
                </View>
                <View style={styles.insightContent}>
                  <View style={styles.insightHeader}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <Text style={styles.insightTime}>{insight.time}</Text>
                  </View>
                  <Text style={styles.insightDesc}>{insight.description}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Today's Journey */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Journey</Text>
          <Card>
            {mockTodayJourney.map((item, idx) => (
              <View key={idx} style={styles.journeyItem}>
                <View style={styles.journeyTimeline}>
                  <View
                    style={[
                      styles.journeyDot,
                      item.status === 'completed' && { backgroundColor: Colors.success },
                      item.status === 'active' && { backgroundColor: Colors.primary },
                      item.status === 'upcoming' && { backgroundColor: Colors.disabled },
                    ]}
                  />
                  {idx < mockTodayJourney.length - 1 && (
                    <View
                      style={[
                        styles.journeyLine,
                        item.status === 'completed' && { backgroundColor: Colors.success },
                        item.status !== 'completed' && { backgroundColor: Colors.border },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.journeyContent}>
                  <Text style={styles.journeyTime}>{item.time}</Text>
                  <Text
                    style={[
                      styles.journeyEvent,
                      item.status === 'active' && { color: Colors.primary, fontWeight: '600' },
                      item.status === 'upcoming' && { color: Colors.disabled },
                    ]}
                  >
                    {item.event}
                  </Text>
                </View>
                {item.status === 'active' && (
                  <View style={styles.activePulse}>
                    <Activity size={16} color={Colors.primary} />
                  </View>
                )}
              </View>
            ))}
          </Card>
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <Card>
            <View style={styles.chartContainer}>
              {mockWeeklyActivity.map((day, idx) => (
                <View key={idx} style={styles.barColumn}>
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${(day.trips / maxTrips) * 100}%`,
                          backgroundColor:
                            day.risk > 40
                              ? Colors.sos
                              : day.risk > 20
                                ? Colors.warning
                                : Colors.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{day.day}</Text>
                </View>
              ))}
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                <Text style={styles.legendText}>Low Risk</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.warning }]} />
                <Text style={styles.legendText}>Medium</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.sos }]} />
                <Text style={styles.legendText}>High Risk</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Behaviour Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behaviour Summary</Text>
          <Card>
            <View style={styles.summaryGrid}>
              {[
                { label: 'Total Trips', value: '16', icon: <TrendingUp size={18} color={Colors.primary} /> },
                { label: 'Avg Risk', value: '7.8', icon: <AlertTriangle size={18} color={Colors.success} /> },
                { label: 'Safe Arrivals', value: '15', icon: <ShieldCheck size={18} color={Colors.success} /> },
                { label: 'Alerts', value: '1', icon: <AlertTriangle size={18} color={Colors.warning} /> },
              ].map((stat, idx) => (
                <View key={idx} style={styles.summaryItem}>
                  {stat.icon}
                  <Text style={styles.summaryValue}>{stat.value}</Text>
                  <Text style={styles.summaryLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.heading,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    marginTop: Spacing.xs,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    marginBottom: Spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  profileTextContainer: {
    marginLeft: Spacing.md,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.heading,
    marginBottom: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dangerBg,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.circle,
    marginBottom: Spacing.md,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.sos,
    marginRight: Spacing.xs,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.sos,
    letterSpacing: 0.5,
  },
  insightCard: {
    marginBottom: Spacing.sm,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.heading,
  },
  insightTime: {
    fontSize: 12,
    color: Colors.secondary,
  },
  insightDesc: {
    fontSize: 13,
    color: Colors.body,
    marginTop: 4,
    lineHeight: 18,
  },
  journeyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 50,
  },
  journeyTimeline: {
    alignItems: 'center',
    width: 24,
  },
  journeyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  journeyLine: {
    width: 2,
    flex: 1,
    minHeight: 30,
  },
  journeyContent: {
    flex: 1,
    marginLeft: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  journeyTime: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '500',
  },
  journeyEvent: {
    fontSize: 14,
    color: Colors.heading,
    marginTop: 2,
  },
  activePulse: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    alignItems: 'flex-end',
    paddingTop: Spacing.md,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barBackground: {
    width: 24,
    height: '100%',
    backgroundColor: Colors.border + '40',
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 12,
  },
  barLabel: {
    fontSize: 11,
    color: Colors.secondary,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.xs,
  },
  legendText: {
    fontSize: 12,
    color: Colors.secondary,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.small,
    backgroundColor: Colors.background,
    marginBottom: Spacing.sm,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.heading,
    marginTop: Spacing.xs,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
});
