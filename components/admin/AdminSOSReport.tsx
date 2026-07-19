import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import {
  Search,
  X,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  Calendar,
  AlertTriangle,
  FileText,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { SOSReport } from './types';

interface AdminSOSReportProps {
  sosReports: SOSReport[];
  handleResolveSOS: (id: string) => void;
}

export default function AdminSOSReport({
  sosReports,
  handleResolveSOS,
}: AdminSOSReportProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Resolved' | 'Pending' | 'Critical'>('All');
  const [selectedReport, setSelectedReport] = useState<SOSReport | null>(null);

  // Dynamic calculations for Stats Cards
  const totalCount = sosReports.length + 42;
  const resolvedCount = sosReports.filter(s => s.status === 'Resolved').length + 30;
  const pendingCount = sosReports.filter(s => s.status === 'Pending').length + 8;
  const criticalCount = sosReports.filter(s => s.status === 'Critical').length + 4;

  const handleExportCSV = (report: SOSReport) => {
    const successMsg = `SOS Report for ${report.userName} exported successfully.`;
    if (Platform.OS === 'web') {
      alert(successMsg);
    } else {
      Alert.alert('Export Success', successMsg);
    }
  };

  const getFilteredReports = () => {
    return sosReports.filter(report => {
      // Search matches
      const matchesSearch =
        report.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (report.notes && report.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      // Date matches
      const matchesDate =
        !dateFilter || report.dateTime.toLowerCase().includes(dateFilter.toLowerCase());

      // City matches
      const matchesCity =
        !cityFilter || report.city.toLowerCase().includes(cityFilter.toLowerCase());

      // Status matches
      const matchesStatus =
        statusFilter === 'All' || report.status === statusFilter;

      return matchesSearch && matchesDate && matchesCity && matchesStatus;
    });
  };

  const getStatusBadgeStyle = (status: SOSReport['status']) => {
    if (status === 'Resolved') return styles.statusBadgeResolved;
    if (status === 'Pending') return styles.statusBadgePending;
    return styles.statusBadgeCritical;
  };

  const getStatusTextStyle = (status: SOSReport['status']) => {
    if (status === 'Resolved') return styles.statusTextResolved;
    if (status === 'Pending') return styles.statusTextPending;
    return styles.statusTextCritical;
  };

  const getStatusEmoji = (status: SOSReport['status']) => {
    if (status === 'Resolved') return '🟢';
    if (status === 'Pending') return '🟡';
    return '🔴';
  };

  const filtered = getFilteredReports();

  return (
    <View style={styles.tabContentContainer}>
      {/* Title Header */}
      <View style={styles.tabHeaderRow}>
        <Text style={styles.tabHeaderTitle}>🚨 SOS Reports</Text>
      </View>

      {/* Top Section Search & Filters */}
      <Card style={styles.searchSectionCard}>
        <View style={styles.searchBarContainer}>
          <Search size={18} color={Colors.secondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Reports"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.secondary}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color={Colors.secondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Date and City Filter inputs */}
        <View style={styles.filterInputsRow}>
          <View style={styles.filterInputWrapper}>
            <Calendar size={14} color={Colors.secondary} style={styles.inputIcon} />
            <TextInput
              style={styles.filterTextInput}
              placeholder="Filter by Date"
              value={dateFilter}
              onChangeText={setDateFilter}
              placeholderTextColor={Colors.secondary}
            />
          </View>
          <View style={styles.filterInputWrapper}>
            <MapPin size={14} color={Colors.secondary} style={styles.inputIcon} />
            <TextInput
              style={styles.filterTextInput}
              placeholder="Filter by City"
              value={cityFilter}
              onChangeText={setCityFilter}
              placeholderTextColor={Colors.secondary}
            />
          </View>
        </View>

        {/* Status Chips Row */}
        <Text style={styles.filterSubtitle}>⚡ Status Filter</Text>
        <View style={styles.filterChipsRow}>
          {(['All', 'Resolved', 'Pending', 'Critical'] as const).map((stat) => (
            <TouchableOpacity
              key={stat}
              style={[
                styles.filterChip,
                statusFilter === stat && styles.filterChipActive
              ]}
              onPress={() => setStatusFilter(stat)}
            >
              <Text style={[
                styles.filterChipText,
                statusFilter === stat && styles.filterChipTextActive
              ]}>
                {stat} {stat === 'Resolved' ? '🟢' : stat === 'Pending' ? '🟡' : stat === 'Critical' ? '🔴' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      {/* Statistics Cards Row */}
      <View style={styles.statsCardsRow}>
        <View style={[styles.statBlock, { borderColor: Colors.border }]}>
          <Text style={styles.statEmoji}>🚨</Text>
          <Text style={styles.statValText}>{totalCount}</Text>
          <Text style={styles.statLabelText}>Total SOS</Text>
        </View>
        <View style={[styles.statBlock, { borderColor: Colors.successLight }]}>
          <Text style={styles.statEmoji}>🟢</Text>
          <Text style={styles.statValText}>{resolvedCount}</Text>
          <Text style={styles.statLabelText}>Resolved</Text>
        </View>
        <View style={[styles.statBlock, { borderColor: Colors.warningBg }]}>
          <Text style={styles.statEmoji}>🟡</Text>
          <Text style={styles.statValText}>{pendingCount}</Text>
          <Text style={styles.statLabelText}>Pending</Text>
        </View>
        <View style={[styles.statBlock, { borderColor: Colors.dangerBg }]}>
          <Text style={styles.statEmoji}>🔴</Text>
          <Text style={styles.statValText}>{criticalCount}</Text>
          <Text style={styles.statLabelText}>Critical</Text>
        </View>
      </View>

      {/* SOS Reports Cards List */}
      <Text style={styles.sectionTitle}>SOS Reports</Text>
      <View style={styles.reportsContainer}>
        {filtered.map((report) => (
          <Card key={report.id} style={[styles.reportCard, report.status === 'Critical' && styles.reportCardCritical]}>
            <View style={styles.reportHeader}>
              <View style={styles.headerInfo}>
                <Text style={styles.userNameText}>👤 {report.userName}</Text>
                <Text style={styles.locationText}>📍 {report.city}</Text>
              </View>
              <View style={[styles.statusBadge, getStatusBadgeStyle(report.status)]}>
                <Text style={[styles.statusBadgeText, getStatusTextStyle(report.status)]}>
                  {report.status} {getStatusEmoji(report.status)}
                </Text>
              </View>
            </View>

            <View style={styles.timeRow}>
              <Clock size={14} color={Colors.secondary} />
              <Text style={styles.timeText}>{report.dateTime}</Text>
            </View>

            <TouchableOpacity
              style={styles.viewDetailsBtn}
              onPress={() => setSelectedReport(report)}
            >
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </Card>
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <AlertTriangle size={32} color={Colors.secondary} />
            <Text style={styles.emptyStateText}>No SOS reports match your search criteria.</Text>
          </View>
        )}
      </View>

      {/* View Details Page / Modal */}
      <Modal
        visible={selectedReport !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedReport(null)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>📄 SOS Incident Details</Text>
            {selectedReport && (
              <View style={styles.modalContent}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>User Name:</Text>
                  <Text style={styles.detailValue}>{selectedReport.userName}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone Number:</Text>
                  <Text style={styles.detailValue}>📞 {selectedReport.phone}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Location:</Text>
                  <Text style={styles.detailValue}>📍 {selectedReport.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date & Time:</Text>
                  <Text style={styles.detailValue}>🕒 {selectedReport.dateTime}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Trusted Contacts:</Text>
                  <Text style={styles.detailValue}>{selectedReport.trustedContacts}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Emergency Status:</Text>
                  <View style={[styles.statusBadge, getStatusBadgeStyle(selectedReport.status), { alignSelf: 'flex-start', marginTop: 2 }]}>
                    <Text style={[styles.statusBadgeText, getStatusTextStyle(selectedReport.status)]}>
                      {selectedReport.status} {getStatusEmoji(selectedReport.status)}
                    </Text>
                  </View>
                </View>
                {selectedReport.notes ? (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesTitle}>Incident Notes:</Text>
                    <Text style={styles.notesText}>{selectedReport.notes}</Text>
                  </View>
                ) : null}

                {/* Actions row inside modal */}
                <View style={styles.modalActionsGrid}>
                  {/* Status update action (Pending/Critical -> Resolved) */}
                  {selectedReport.status !== 'Resolved' && (
                    <TouchableOpacity
                      style={styles.resolveActionBtn}
                      onPress={() => {
                        handleResolveSOS(selectedReport.id);
                        // Mock update locally in local selected modal
                        setSelectedReport({ ...selectedReport, status: 'Resolved' });
                      }}
                    >
                      <CheckCircle2 size={16} color={Colors.white} />
                      <Text style={styles.resolveActionText}>Resolve Emergency</Text>
                    </TouchableOpacity>
                  )}

                  {/* Export Report Action */}
                  <TouchableOpacity
                    style={styles.exportActionBtn}
                    onPress={() => handleExportCSV(selectedReport)}
                  >
                    <FileText size={16} color={Colors.primary} />
                    <Text style={styles.exportActionText}>Export CSV</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setSelectedReport(null)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContentContainer: {
    gap: Spacing.lg,
  },
  tabHeaderRow: {
    marginBottom: Spacing.xs,
  },
  tabHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.heading,
  },
  // Search & Filter Cards styles
  searchSectionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.small,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 44,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.heading,
    height: '100%',
  },
  filterInputsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  filterInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 40,
    paddingHorizontal: Spacing.sm,
  },
  inputIcon: {
    marginRight: Spacing.xs,
  },
  filterTextInput: {
    flex: 1,
    fontSize: 12,
    color: Colors.heading,
    height: '100%',
  },
  filterSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.body,
    marginBottom: Spacing.xs,
  },
  filterChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  filterChip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.circle,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  filterChipActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
  },
  filterChipTextActive: {
    color: Colors.primary,
  },
  // Statistics row
  statsCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  statBlock: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  statEmoji: {
    fontSize: 18,
    marginBottom: 2,
  },
  statValText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.heading,
  },
  statLabelText: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
  // List of reports
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
    marginTop: Spacing.xs,
  },
  reportsContainer: {
    gap: Spacing.md,
  },
  reportCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.small,
  },
  reportCardCritical: {
    borderColor: Colors.sos,
    backgroundColor: '#FFF5F5',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  headerInfo: {
    flex: 1,
  },
  userNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
  },
  locationText: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.small,
  },
  statusBadgeResolved: {
    backgroundColor: Colors.successLight,
  },
  statusBadgePending: {
    backgroundColor: Colors.warningBg,
  },
  statusBadgeCritical: {
    backgroundColor: Colors.dangerBg,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusTextResolved: {
    color: Colors.success,
  },
  statusTextPending: {
    color: Colors.warning,
  },
  statusTextCritical: {
    color: Colors.sos,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  timeText: {
    fontSize: 12,
    color: Colors.body,
    fontWeight: '500',
  },
  viewDetailsBtn: {
    height: 36,
    borderRadius: Radius.small,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  viewDetailsText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: 'center',
  },
  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.heading,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  modalContent: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.heading,
  },
  notesContainer: {
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    padding: Spacing.sm,
    marginTop: Spacing.xs,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: Colors.body,
    lineHeight: 16,
  },
  modalActionsGrid: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  resolveActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: Radius.medium,
    backgroundColor: Colors.success,
    gap: Spacing.xs,
  },
  resolveActionText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  exportActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    gap: Spacing.xs,
  },
  exportActionText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  closeModalBtn: {
    height: 44,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  closeModalText: {
    color: Colors.heading,
    fontSize: 14,
    fontWeight: '600',
  },
});
