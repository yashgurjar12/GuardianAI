import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  Users,
  AlertTriangle,
  Brain,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { MonitoredUser, SafetyTip, SOSReport } from './types';

interface AdminDashboardProps {
  greeting: string;
  adminName: string;
  usersList: MonitoredUser[];
  tipsList: SafetyTip[];
  sosReports: SOSReport[];
  recentRegisteredUsers: string[];
  activeSOSCount: number;
  handleTabChange: (tab: 'dashboard' | 'users' | 'tips' | 'sos' | 'settings') => void;
  setShowNotificationModal: (show: boolean) => void;
  handleResolveSOS: (id: string) => void;
}

export default function AdminDashboard({
  greeting,
  adminName,
  usersList,
  tipsList,
  sosReports,
  recentRegisteredUsers,
  activeSOSCount,
  handleTabChange,
  setShowNotificationModal,
  handleResolveSOS,
}: AdminDashboardProps) {
  return (
    <View style={styles.tabContentContainer}>
      {/* Greetings Section */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.greetingContainer}
      >
        <Text style={styles.greetingHeader}>{greeting}, {adminName}</Text>
        <Text style={styles.greetingSub}>Welcome Back!</Text>
      </LinearGradient>

      {/* 📊 Overview Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeadingText}>📊 Overview</Text>
      </View>
      
      <View style={styles.statsGrid}>
        {/* Total Users */}
        <Card style={[styles.statCard, styles.statCardBlue]}>
          <View style={styles.statHeaderRow}>
            <View style={styles.statIconContainerBlue}>
              <Users size={20} color={Colors.primary} />
            </View>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <Text style={[styles.statValue, { color: Colors.primary }]}>{usersList.length + 1200}</Text>
          <Text style={styles.statTrendGreen}>+24 new today</Text>
        </Card>

        {/* Total SOS */}
        <Card style={[styles.statCard, styles.statCardRed]}>
          <View style={styles.statHeaderRow}>
            <View style={styles.statIconContainerRed}>
              <AlertTriangle size={20} color={Colors.sos} />
            </View>
            <Text style={styles.statLabel}>Total SOS</Text>
          </View>
          <Text style={[styles.statValue, { color: Colors.sos }]}>{sosReports.length + 42}</Text>
          <Text style={styles.statTrendRed}>{activeSOSCount} active alarm</Text>
        </Card>

        {/* AI Active */}
        <Card style={[styles.statCard, styles.statCardGreen]}>
          <View style={styles.statHeaderRow}>
            <View style={styles.statIconContainerGreen}>
              <Brain size={20} color={Colors.success} />
            </View>
            <Text style={styles.statLabel}>AI Active</Text>
          </View>
          <Text style={[styles.statValue, { color: Colors.success }]}>4 Online</Text>
          <Text style={styles.statTrendGreen}>100% stable</Text>
        </Card>

        {/* Today's Active Users */}
        <Card style={[styles.statCard, styles.statCardYellow]}>
          <View style={styles.statHeaderRow}>
            <View style={styles.statIconContainerYellow}>
              <TrendingUp size={20} color={Colors.warning} />
            </View>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <Text style={[styles.statValue, { color: Colors.warning }]}>94</Text>
          <Text style={styles.statTrendYellow}>Peak session hour</Text>
        </Card>
      </View>

      {/* 🚨 Recent Emergency Reports Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeadingText}>🚨 Recent Emergency Reports</Text>
      </View>

      <View style={styles.emergencyReportsContainer}>
        {sosReports.map(report => (
          <Card key={report.id} style={[styles.reportItemCard, report.status !== 'Resolved' && styles.activeReportCard]}>
            <View style={styles.reportRow}>
              <Text style={styles.reportBullet}>•</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.reportNameText}>{report.userName}</Text>
                <Text style={styles.reportLocationText}>• Location: {report.location}</Text>
                <Text style={styles.reportTimeText}>• Time: {report.dateTime}</Text>
                <View style={styles.reportStatusRow}>
                  <Text style={styles.reportStatusText}>• Status : </Text>
                  <Text style={[
                    styles.reportStatusValue,
                    report.status === 'Resolved' ? styles.statusTextResolved : styles.statusTextActive
                  ]}>
                    {report.status}
                  </Text>
                </View>
              </View>
              {report.status !== 'Resolved' && (
                <TouchableOpacity style={styles.reportResolveMiniBtn} onPress={() => handleResolveSOS(report.id)}>
                  <Text style={styles.reportResolveMiniText}>Resolve</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        ))}
      </View>

      {/* 👥 Recent Registered Users Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeadingText}>👥 Recent Registered Users</Text>
      </View>
      <Card style={styles.recentUsersCard}>
        {recentRegisteredUsers.map((user, idx) => (
          <View key={user} style={[styles.recentUserRow, idx < recentRegisteredUsers.length - 1 && styles.recentUserBorder]}>
            <Text style={styles.recentUserBullet}>•</Text>
            <Text style={styles.recentUserName}>{user}</Text>
          </View>
        ))}
      </Card>

      {/* 📈 Analytics Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeadingText}>📈 Analytics</Text>
      </View>

      <View style={styles.analyticsWrapper}>
        {/* Weekly Users */}
        <Card style={styles.analyticsCard}>
          <Text style={styles.analyticsTitle}>Weekly Users</Text>
          <View style={styles.chartContainer}>
            <View style={styles.mockBarChart}>
              <View style={[styles.bar, { height: 40 }]} />
              <View style={[styles.bar, { height: 65 }]} />
              <View style={[styles.bar, { height: 85 }]} />
              <View style={[styles.bar, { height: 50 }]} />
              <View style={[styles.bar, { height: 70, backgroundColor: Colors.primary }]} />
            </View>
            <View style={styles.barLabelsRow}>
              <Text style={styles.barLabelText}>Mon</Text>
              <Text style={styles.barLabelText}>Tue</Text>
              <Text style={styles.barLabelText}>Wed</Text>
              <Text style={styles.barLabelText}>Thu</Text>
              <Text style={styles.barLabelText}>Fri</Text>
            </View>
          </View>
          <Text style={styles.analyticsDetails}>Peak Activity: Wednesday (85%)</Text>
        </Card>

        {/* Monthly SOS */}
        <Card style={styles.analyticsCard}>
          <Text style={styles.analyticsTitle}>Monthly SOS</Text>
          <View style={styles.mockProgressContainer}>
            <View style={styles.circularMock}>
              <Text style={styles.circularVal}>14%</Text>
              <Text style={styles.circularLbl}>Response Rate</Text>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={styles.progressDetail}>Total Alarms: 44</Text>
              <Text style={styles.progressDetail}>Resolved: 38</Text>
              <Text style={styles.progressDetail}>Avg Time: 2.4 mins</Text>
            </View>
          </View>
        </Card>

        {/* Daily Active Users */}
        <Card style={styles.analyticsCard}>
          <Text style={styles.analyticsTitle}>Daily Active Users</Text>
          <View style={styles.mockLineChart}>
            <Text style={styles.lineDataText}>94 Active Sessions Today</Text>
            <View style={styles.sparklineContainer}>
              <View style={styles.sparkDot} />
              <View style={styles.sparkLineSegment} />
              <View style={[styles.sparkDot, { backgroundColor: Colors.success }]} />
              <View style={styles.sparkLineSegment} />
              <View style={[styles.sparkDot, { backgroundColor: Colors.warning }]} />
            </View>
          </View>
          <Text style={styles.analyticsDetails}>System Integrity: 100% Online</Text>
        </Card>
      </View>

      {/* 📢 Quick Actions Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeadingText}>📢 Quick Actions</Text>
      </View>

      <View style={styles.quickActionsGrid}>
        <TouchableOpacity style={styles.actionBtnCard} onPress={() => handleTabChange('tips')}>
          <Text style={styles.actionBtnEmoji}>➕</Text>
          <Text style={styles.actionBtnLabel}>Add Safety Tip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtnCard} onPress={() => setShowNotificationModal(true)}>
          <Text style={styles.actionBtnEmoji}>📨</Text>
          <Text style={styles.actionBtnLabel}>Send Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtnCard} onPress={() => handleTabChange('sos')}>
          <Text style={styles.actionBtnEmoji}>📄</Text>
          <Text style={styles.actionBtnLabel}>View Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContentContainer: {
    gap: Spacing.lg,
  },
  // Greeting Styles
  greetingContainer: {
    marginBottom: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: Radius.large,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  greetingHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
  },
  greetingSub: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    fontWeight: '600',
  },
  // Sections Heading Styles
  sectionHeaderRow: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  sectionHeadingText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.heading,
  },
  // Stat cards grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    minWidth: 140,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: Radius.large,
    borderWidth: 1.5,
    borderColor: 'transparent',
    ...Shadows.small,
  },
  statCardBlue: {
    backgroundColor: '#F0F6FF',
    borderColor: '#D0E1FD',
  },
  statCardRed: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FED7D7',
  },
  statCardGreen: {
    backgroundColor: '#F0FDF4',
    borderColor: '#DCFCE7',
  },
  statCardYellow: {
    backgroundColor: '#FFFDF5',
    borderColor: '#FEF3C7',
  },
  statHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 4,
  },
  statIconContainerRed: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconContainerYellow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.warningBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconContainerBlue: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconContainerGreen: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.body,
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  statTrendGreen: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
    marginTop: 4,
  },
  statTrendRed: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.sos,
    marginTop: 4,
  },
  statTrendYellow: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.warning,
    marginTop: 4,
  },
  // Emergency report list styles
  emergencyReportsContainer: {
    gap: Spacing.sm,
  },
  reportItemCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  activeReportCard: {
    borderColor: Colors.sos,
    borderWidth: 1.5,
    backgroundColor: '#FFF5F5',
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reportBullet: {
    fontSize: 20,
    color: Colors.secondary,
    marginRight: Spacing.sm,
    lineHeight: 22,
  },
  reportNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
  },
  reportLocationText: {
    fontSize: 13,
    color: Colors.body,
    marginTop: 2,
  },
  reportTimeText: {
    fontSize: 13,
    color: Colors.body,
    marginTop: 2,
  },
  reportStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  reportStatusText: {
    fontSize: 13,
    color: Colors.body,
  },
  reportStatusValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  statusTextResolved: {
    color: Colors.success,
  },
  statusTextActive: {
    color: Colors.sos,
  },
  reportResolveMiniBtn: {
    backgroundColor: Colors.sos,
    paddingHorizontal: Spacing.md - 4,
    paddingVertical: 6,
    borderRadius: Radius.small,
  },
  reportResolveMiniText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 11,
  },
  // Recent users
  recentUsersCard: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.sm,
  },
  recentUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  recentUserBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  recentUserBullet: {
    fontSize: 16,
    color: Colors.secondary,
    marginRight: Spacing.sm,
  },
  recentUserName: {
    fontSize: 15,
    color: Colors.heading,
    fontWeight: '600',
  },
  // Analytics
  analyticsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  analyticsCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  analyticsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  analyticsDetails: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: Spacing.sm,
    fontWeight: '500',
  },
  // Bar chart
  chartContainer: {
    width: '100%',
    marginBottom: Spacing.xs,
  },
  mockBarChart: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 4,
  },
  bar: {
    width: 24,
    backgroundColor: Colors.primaryLight,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 6,
  },
  barLabelText: {
    fontSize: 10,
    color: Colors.secondary,
    fontWeight: '600',
    width: 32,
    textAlign: 'center',
  },
  // Progress circular mock
  mockProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    height: 100,
  },
  circularMock: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularVal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
  },
  circularLbl: {
    fontSize: 8,
    color: Colors.secondary,
    textAlign: 'center',
  },
  progressDetail: {
    fontSize: 13,
    color: Colors.body,
    fontWeight: '500',
  },
  // Line chart
  mockLineChart: {
    height: 100,
    justifyContent: 'center',
  },
  lineDataText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  sparkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  sparkLineSegment: {
    width: 40,
    height: 2,
    backgroundColor: Colors.border,
  },
  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: Spacing.sm,
    justifyContent: 'space-between',
    width: '100%',
  },
  actionBtnCard: {
    flex: 1,
    height: 90,
    backgroundColor: Colors.white,
    borderRadius: Radius.large,
    padding: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...Shadows.small,
  },
  actionBtnEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  actionBtnLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.heading,
    textAlign: 'center',
  },
});
