import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Navigation,
  ShieldAlert,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  X,
  Users,
  CheckCircle2,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import PrimaryButton from '@/components/ui/PrimaryButton';
import AppTopbar from '@/components/ui/AppTopbar';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { mockHistory } from '@/constants/mockData';

const filters = ['All', 'Trips', 'Alerts', 'SOS'];

export default function HistoryScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedSOSItem, setSelectedSOSItem] = useState<typeof mockHistory[0] | null>(null);

  const filteredHistory =
    activeFilter === 'All'
      ? mockHistory
      : mockHistory.filter((item) => {
          if (activeFilter === 'Trips') return item.status === 'safe';
          if (activeFilter === 'Alerts') return item.status === 'warning' || item.status === 'alert';
          if (activeFilter === 'SOS') return item.status === 'sos' || item.status === 'alert' || item.route.includes('SOS');
          return true;
        });

  // Group by date
  const grouped = filteredHistory.reduce<Record<string, typeof mockHistory>>((acc, item) => {
    const key = item.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Topbar Header */}
        <AppTopbar title="GuardianAI" />

        {/* Hero Section (No Back Button) */}
        <View style={styles.heroSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pageTitle}>History</Text>
            <Text style={styles.pageSubtitle}>
              View past trips, route alerts & SOS emergency logs
            </Text>
          </View>
        </View>

        {/* Responsive Fixed-Size Filter Bar */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
                numberOfLines={1}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* History List */}
        {Object.entries(grouped).map(([date, items]) => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateLabel}>{date}</Text>
            {items.map((item) => {
              const isSOS = item.status === 'sos' || item.route.includes('SOS');

              if (isSOS) {
                return (
                  <Card key={item.id} style={styles.sosCard}>
                    <View style={styles.sosHeaderRow}>
                      <View style={styles.sosBadgeBox}>
                        <ShieldAlert size={18} color={Colors.sos} />
                        <Text style={styles.sosTitle}>
                          {item.route || 'SOS Emergency Called'}
                        </Text>
                      </View>
                      <StatusBadge status="sos" label="SOS Triggered" />
                    </View>

                    <View style={styles.sosDetailsGrid}>
                      <View style={styles.detailRow}>
                        <Calendar size={14} color={Colors.secondary} />
                        <Text style={styles.detailText}>📅 {item.fullDate || item.date}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Clock size={14} color={Colors.secondary} />
                        <Text style={styles.detailText}>🕒 {item.time}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <MapPin size={14} color={Colors.secondary} />
                        <Text style={styles.detailText}>📍 {item.location || 'Indore, MP'}</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.viewDetailsBtn}
                      onPress={() => setSelectedSOSItem(item)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.viewDetailsText}>View Details</Text>
                      <ChevronRight size={16} color={Colors.primary} />
                    </TouchableOpacity>
                  </Card>
                );
              }

              return (
                <Card key={item.id} style={styles.historyCard}>
                  <View style={styles.cardRow}>
                    <View style={styles.cardIcon}>
                      <Navigation size={18} color={Colors.primary} />
                    </View>
                    <View style={styles.cardContent}>
                      <Text style={styles.cardRoute}>{item.route}</Text>
                      <Text style={styles.cardMeta}>
                        {item.time} • {item.duration} • 📍 {item.location || 'Indore, MP'}
                      </Text>
                    </View>
                    <View style={styles.cardRight}>
                      <StatusBadge status={item.status as any} />
                      <Text style={styles.riskText}>Risk: {item.riskScore}</Text>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* SOS View Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedSOSItem !== null}
        onRequestClose={() => setSelectedSOSItem(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedSOSItem(null)}
        >
          {selectedSOSItem && (
            <Pressable
              style={styles.detailsModalCard}
              onStartShouldSetResponder={() => true}
              onPress={(e) => e.stopPropagation()}
            >
              {/* Close Button Header */}
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalMainTitle}>SOS Emergency Details</Text>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => setSelectedSOSItem(null)}
                >
                  <X size={20} color={Colors.secondary} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* 🚨 Emergency ID */}
                <View style={styles.infoCard}>
                  <View style={styles.infoRow}>
                    <View style={[styles.infoIconBox, { backgroundColor: Colors.dangerBg }]}>
                      <ShieldAlert size={22} color={Colors.sos} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoLabel}>🚨 Emergency ID</Text>
                      <Text style={styles.infoValue}>
                        #{selectedSOSItem.emergencyId || 'SOS-98241'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* 📅 Date & Time */}
                <View style={styles.infoCard}>
                  <View style={styles.infoRow}>
                    <View style={[styles.infoIconBox, { backgroundColor: Colors.primaryLight }]}>
                      <Calendar size={20} color={Colors.primary} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoLabel}>📅 Date & Time</Text>
                      <Text style={styles.infoValue}>
                        {selectedSOSItem.fullDate || selectedSOSItem.date}, {selectedSOSItem.time}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* 📍 Location */}
                <View style={styles.infoCard}>
                  <View style={styles.infoRow}>
                    <View style={[styles.infoIconBox, { backgroundColor: Colors.warningBg }]}>
                      <MapPin size={20} color={Colors.warning} />
                    </View>
                    <View style={styles.infoTextContainer}>
                      <Text style={styles.infoLabel}>📍 Location</Text>
                      <Text style={styles.infoValue}>
                        {selectedSOSItem.location || 'Indore, MP'} (GPS 22.7196° N, 75.8577° E)
                      </Text>
                    </View>
                  </View>
                </View>

                {/* 👨‍👩‍👧 Trusted Contacts Notified */}
                <View style={styles.contactsSectionModal}>
                  <View style={styles.contactsTitleRow}>
                    <Users size={18} color={Colors.primary} />
                    <Text style={styles.contactsSectionTitle}>
                      👨‍👩‍👧 Trusted Contacts Notified
                    </Text>
                  </View>

                  {(selectedSOSItem.contactsNotified || [
                    { name: 'Sarah Mitchell', relation: 'Partner', phone: '+1 (415) 555-0192', status: 'Alert Sent' },
                    { name: 'James Carter', relation: 'Brother', phone: '+1 (628) 555-0847', status: 'Call Dispatched' },
                    { name: 'Mom', relation: 'Mother', phone: '+1 (415) 555-0901', status: 'Location Link Shared' },
                  ]).map((contact, idx) => (
                    <View key={idx} style={styles.contactItemRow}>
                      <View style={styles.contactAvatarCircle}>
                        <Text style={styles.contactAvatarText}>
                          {contact.name.split(' ').map((n) => n[0]).join('')}
                        </Text>
                      </View>
                      <View style={styles.contactDetails}>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        <Text style={styles.contactSub}>
                          {contact.relation} • {contact.phone}
                        </Text>
                      </View>
                      <View style={styles.statusBadgeSmall}>
                        <CheckCircle2 size={14} color={Colors.success} />
                        <Text style={styles.statusBadgeSmallText}>{contact.status || 'Alerted'}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>

              {/* Close Button */}
              <PrimaryButton
                title="Close Details"
                onPress={() => setSelectedSOSItem(null)}
                style={{ marginTop: Spacing.md }}
              />
            </Pressable>
          )}
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.heading,
    letterSpacing: -0.3,
  },
  pageSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: Spacing.xs + 2,
    marginBottom: Spacing.lg,
    width: '100%',
  },
  filterChip: {
    flex: 1,
    height: 42,
    borderRadius: Radius.circle,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
    textAlign: 'center',
  },
  filterTextActive: {
    color: Colors.white,
    fontWeight: '700',
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
  sosCard: {
    marginBottom: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.sos,
    padding: Spacing.md,
  },
  sosHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sosBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs + 2,
    flex: 1,
  },
  sosTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
    flex: 1,
  },
  sosDetailsGrid: {
    backgroundColor: Colors.background,
    padding: Spacing.sm + 4,
    borderRadius: Radius.small,
    gap: 6,
    marginVertical: Spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: Colors.body,
    fontWeight: '500',
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  detailsModalCard: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.large,
    borderTopRightRadius: Radius.large,
    padding: Spacing.lg,
    maxHeight: '85%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalMainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.heading,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: Radius.medium,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
    marginTop: 2,
  },
  contactsSectionModal: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  contactsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  contactsSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
  },
  contactItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.sm + 4,
    borderRadius: Radius.medium,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm + 4,
  },
  contactAvatarText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.heading,
  },
  contactSub: {
    fontSize: 11,
    color: Colors.secondary,
    marginTop: 2,
  },
  statusBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.xs + 4,
    paddingVertical: 3,
    borderRadius: Radius.circle,
  },
  statusBadgeSmallText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
  },
});
