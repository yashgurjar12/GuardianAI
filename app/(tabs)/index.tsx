import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MapPin,
  Bell,
  Navigation,
  Brain,
  Clock,
  Shield,
  Zap,
  ChevronRight,
  TrendingUp,
} from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import HoldSOSButton from '@/components/ui/HoldSOSButton';
import LocationShareButton from '@/components/ui/LocationShareButton';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { mockUser, mockRoutes } from '@/constants/mockData';

import AnimatedBackground from '@/components/ui/AnimatedBackground';

const adviceTips = [
  {
    id: 1,
    title: 'Safe Path Highlight',
    desc: "Take Oxford Street today. It's 15% better lit than University Road.",
    accent: Colors.primary,
  },
  {
    id: 2,
    title: 'Area Risk Alert',
    desc: 'Stalking reports active near Park Avenue. Avoid dim paths there.',
    accent: Colors.sos,
  },
  {
    id: 3,
    title: 'Police Support Active',
    desc: 'Emergency vehicle stationed at 4th Mound intersection. Safe zone.',
    accent: Colors.success,
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeScreen() {
  const router = useRouter();

  // Dynamic Time Greeting
  const [greeting, setGreeting] = useState('Hello');
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Bell shake animation
  const bellRotate = useSharedValue(0);
  const handleBellPress = () => {
    bellRotate.value = withSequence(
      withTiming(-12, { duration: 80 }),
      withTiming(12, { duration: 80 }),
      withTiming(-8, { duration: 80 }),
      withTiming(8, { duration: 80 }),
      withTiming(0, { duration: 80 })
    );
  };
  const bellAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${bellRotate.value}deg` }],
  }));

  // Status Card glow scale
  const glowPulse = useSharedValue(1);
  useEffect(() => {
    glowPulse.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      false
    );
  }, []);
  const glowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowPulse.value }],
  }));

  // Travel route progress
  const routeProgress = useSharedValue(0.65);
  const progressPercent = useAnimatedStyle(() => ({
    width: `${routeProgress.value * 100}%`,
  }));

  // AI Advice Carousel Index
  const [tipIndex, setTipIndex] = useState(0);
  const tipOpacity = useSharedValue(1);
  const handleNextTip = () => {
    tipOpacity.value = withTiming(0, { duration: 150 }, () => {
      setTipIndex((prev) => (prev + 1) % adviceTips.length);
      tipOpacity.value = withTiming(1, { duration: 200 });
    });
  };
  const tipAnimatedStyle = useAnimatedStyle(() => ({
    opacity: tipOpacity.value,
  }));

  // Quick Action Press spring factories
  const makePressScale = () => {
    const scale = useSharedValue(1);
    const pressStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));
    const pressIn = () => { scale.value = withTiming(0.9, { duration: 100 }); };
    const pressOut = () => { scale.value = withSpring(1, { damping: 10 }); };
    return { pressStyle, pressIn, pressOut };
  };

  const action1 = makePressScale();
  const action2 = makePressScale();
  const action3 = makePressScale();
  const action4 = makePressScale();

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.locationRow}>
                <MapPin size={13} color={Colors.primary} />
                <Text style={styles.locationText}>{mockUser.location}</Text>
              </View>
              <Text style={styles.greeting}>
                {greeting}, {mockUser.name.split(' ')[0]} 👋
              </Text>
            </View>
            <View style={styles.headerRight}>
              <Animated.View style={bellAnimatedStyle}>
                <TouchableOpacity
                  style={styles.headerBtn}
                  onPress={handleBellPress}
                  activeOpacity={0.7}
                >
                  <Bell size={22} color={Colors.heading} />
                  <View style={styles.notifDot} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          {/* 1. Share Location Toggle (Placed BEFORE the current status card) */}
          <LocationShareButton />

          {/* 2. Safety Status Card */}
          <View style={styles.statusWrapper}>
            <Animated.View style={[styles.statusGlow, glowAnimatedStyle]} />
            <Card style={styles.statusCard}>
              <View style={styles.statusRow}>
                <View>
                  <Text style={styles.statusLabel}>Current Safety State</Text>
                  <StatusBadge status="safe" label={mockUser.status} />
                </View>
                <View style={styles.riskBadge}>
                  <Text style={styles.riskValue}>{mockUser.riskScore}</Text>
                  <Text style={styles.riskLabel}>Safety Risk</Text>
                </View>
              </View>
            </Card>
          </View>

          {/* Hold to SOS Trigger (Vibrations, Long-press feedback) */}
          <HoldSOSButton onTrigger={() => router.push('/sos-countdown')} />

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Interactive Safety Suite</Text>
            <View style={styles.actionGrid}>
              {[
                { label: 'Safe Route', route: '/(tabs)/safe-route', icon: <Navigation size={22} color={Colors.primary} />, pack: action1 },
                { label: 'AI Twin', route: '/(tabs)/ai-twin', icon: <Brain size={22} color="#8B5CF6" />, pack: action2 },
                { label: 'History', route: '/history', icon: <Clock size={22} color={Colors.warning} />, pack: action3 },
                { label: 'Test Alert', route: '/route-alert', icon: <Zap size={22} color={Colors.sos} />, pack: action4 },
              ].map((action, idx) => (
                <AnimatedPressable
                  key={idx}
                  style={[styles.actionItem, action.pack.pressStyle]}
                  onPressIn={action.pack.pressIn}
                  onPressOut={action.pack.pressOut}
                  onPress={() => router.push(action.route as any)}
                >
                  <View style={styles.actionIcon}>{action.icon}</View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </AnimatedPressable>
              ))}
            </View>
          </View>

          {/* Live Travel Route Tracker Progress */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Live Travel Tracker</Text>
            <Card>
              <View style={styles.routeHeader}>
                <View style={styles.routeIconWrapper}>
                  <Navigation size={20} color={Colors.primary} />
                </View>
                <View style={styles.routeInfo}>
                  <Text style={styles.routeName}>{mockRoutes[0].name}</Text>
                  <Text style={styles.routeSubtitle}>Commuting to destination</Text>
                </View>
                <View style={styles.routeSafetyBadge}>
                  <TrendingUp size={14} color={Colors.success} />
                  <Text style={styles.routeSafetyText}>{mockRoutes[0].safetyScore}% safe</Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <Animated.View style={[styles.progressBarFill, progressPercent]} />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressPctText}>65% Completed</Text>
                  <Text style={styles.etaText}>ETA 4 min</Text>
                </View>
              </View>

              <View style={styles.alertTimeline}>
                <View style={styles.timelineDotActive} />
                <Text style={styles.timelineText}>
                  Upcoming Safe Zone: <Text style={styles.boldText}>Central Library</Text> in 200m
                </Text>
              </View>
            </Card>
          </View>

          {/* Clickable AI Twin Advice Widget */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>AI Twin Daily Guidance</Text>
              <Text style={styles.tipsCount}>Tip {tipIndex + 1} of 3</Text>
            </View>
            <TouchableOpacity onPress={handleNextTip} activeOpacity={0.9}>
              <Card style={styles.adviceCard}>
                <Animated.View style={[styles.adviceRow, tipAnimatedStyle]}>
                  <View style={[styles.adviceIndicator, { backgroundColor: adviceTips[tipIndex].accent }]} />
                  <View style={styles.adviceContent}>
                    <Text style={styles.adviceCardTitle}>{adviceTips[tipIndex].title}</Text>
                    <Text style={styles.adviceDesc}>{adviceTips[tipIndex].desc}</Text>
                    <Text style={styles.adviceActionText}>Tap to cycle tips ➜</Text>
                  </View>
                </Animated.View>
              </Card>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
  headerLeft: {},
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  locationText: {
    fontSize: 12,
    color: Colors.secondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.heading,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  avatarBtn: {
    backgroundColor: Colors.primary,
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.sos,
  },
  statusWrapper: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  statusGlow: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
    borderRadius: Radius.large,
    backgroundColor: Colors.successLight,
    opacity: 0.35,
    filter: 'blur(20px)',
  },
  statusCard: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(20px)',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  riskBadge: {
    alignItems: 'center',
  },
  riskValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.success,
  },
  riskLabel: {
    fontSize: 10,
    color: Colors.secondary,
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    width: '23%',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: Radius.medium,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.body,
    textAlign: 'center',
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
  tipsCount: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  routeName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.heading,
  },
  routeSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  routeSafetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.small,
  },
  routeSafetyText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
  },
  progressContainer: {
    marginTop: Spacing.md,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs + 2,
  },
  progressPctText: {
    fontSize: 12,
    color: Colors.body,
    fontWeight: '600',
  },
  etaText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  alertTimeline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    backgroundColor: Colors.primaryLight + '25',
    padding: Spacing.sm,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  timelineDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: Spacing.sm,
  },
  timelineText: {
    fontSize: 12,
    color: Colors.body,
  },
  boldText: {
    fontWeight: '700',
  },
  adviceCard: {
    padding: 0,
    overflow: 'hidden',
  },
  adviceRow: {
    flexDirection: 'row',
    padding: Spacing.md,
  },
  adviceIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: Spacing.md,
  },
  adviceContent: {
    flex: 1,
  },
  adviceCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.heading,
  },
  adviceDesc: {
    fontSize: 13,
    color: Colors.body,
    marginTop: 4,
    lineHeight: 18,
  },
  adviceActionText: {
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
});
