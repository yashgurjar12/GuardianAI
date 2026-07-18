import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Navigation, Filter } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { mockHistory } from '@/constants/mockData';

const filters = ['All', 'Trips', 'Alerts', 'Safe'];

export default function HistoryScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredHistory =
    activeFilter === 'All'
      ? mockHistory
      : mockHistory.filter((item) => {
          if (activeFilter === 'Trips') return true;
          if (activeFilter === 'Alerts') return item.status === 'alert' || item.status === 'warning';
          if (activeFilter === 'Safe') return item.status === 'safe';
          return true;
        });

  // Group by date
  const grouped = filteredHistory.reduce<Record<string, typeof mockHistory>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={22} color={Colors.heading} />
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* History List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(grouped).map(([date, items]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateLabel}>{date}</Text>
            {items.map((item) => (
              <Card key={item.id} style={styles.historyCard}>
                <View style={styles.cardRow}>
                  <View style={styles.cardIcon}>
                    <Navigation size={18} color={Colors.primary} />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardRoute}>{item.route}</Text>
                    <Text style={styles.cardMeta}>
                      {item.time} • {item.duration}
                    </Text>
                  </View>
                  <View style={styles.cardRight}>
                    <StatusBadge status={item.status as any} />
                    <Text style={styles.riskText}>Risk: {item.riskScore}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.heading,
  },
  filterContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.circle,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.secondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  dateGroup: {
    marginBottom: Spacing.lg,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  historyCard: {
    marginBottom: Spacing.sm,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  cardRoute: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.heading,
  },
  cardMeta: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  riskText: {
    fontSize: 11,
    color: Colors.secondary,
    marginTop: Spacing.xs,
  },
});
