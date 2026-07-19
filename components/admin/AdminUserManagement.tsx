import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Search,
  X,
  User,
  Users,
  Eye,
  CheckCircle2,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { MonitoredUser } from './types';

interface AdminUserManagementProps {
  usersList: MonitoredUser[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterOption: 'all' | 'active' | 'blocked' | 'new';
  setFilterOption: (option: 'all' | 'active' | 'blocked' | 'new') => void;
  sortOption: 'name' | 'date';
  setSortOption: (option: 'name' | 'date') => void;
  isFilterDropdownOpen: boolean;
  setIsFilterDropdownOpen: (open: boolean) => void;
  setSelectedUserForView: (user: MonitoredUser | null) => void;
  setSelectedUserForBlock: (user: MonitoredUser | null) => void;
  setSelectedUserForUnblock: (user: MonitoredUser | null) => void;
  getFilteredUsers: () => MonitoredUser[];
}

export default function AdminUserManagement({
  usersList,
  searchQuery,
  setSearchQuery,
  filterOption,
  setFilterOption,
  sortOption,
  setSortOption,
  isFilterDropdownOpen,
  setIsFilterDropdownOpen,
  setSelectedUserForView,
  setSelectedUserForBlock,
  setSelectedUserForUnblock,
  getFilteredUsers,
}: AdminUserManagementProps) {
  return (
    <View style={styles.tabContentContainer}>
      {/* Header inside tab */}
      <View style={styles.tabHeaderRow}>
        <Text style={styles.tabHeaderTitle}>👤 User Management</Text>
      </View>

      {/* Search & Filter Section */}
      <View style={styles.searchSectionCard}>
        <View style={styles.searchRow}>
          <View style={styles.searchBarContainer}>
            <Search size={18} color={Colors.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by Name / Email"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.secondary}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={18} color={Colors.secondary} style={{ marginRight: 6 }} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.filterToggleBtn, isFilterDropdownOpen && styles.filterToggleBtnActive]}
            onPress={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            <Text style={[styles.filterToggleText, isFilterDropdownOpen && styles.filterToggleTextActive]}>
              {isFilterDropdownOpen ? 'Hide Filters' : '+ Filter'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Options collapsible */}
        {isFilterDropdownOpen && (
          <View style={styles.filterDropdownContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Filter Options:</Text>
              <View style={styles.filterChipsRow}>
                {(['all', 'active', 'blocked', 'new'] as const).map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.filterChip, filterOption === opt && styles.filterChipActive]}
                    onPress={() => setFilterOption(opt)}
                  >
                    <Text style={[styles.filterChipText, filterOption === opt && styles.filterChipTextActive]}>
                      {opt === 'all' ? 'All' : opt === 'active' ? 'Active 🟢' : opt === 'blocked' ? 'Blocked 🔴' : 'New Users 📅'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.optionDivider} />

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Sort By:</Text>
              <View style={styles.filterChipsRow}>
                {(['name', 'date'] as const).map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.filterChip, sortOption === opt && styles.filterChipActive]}
                    onPress={() => setSortOption(opt)}
                  >
                    <Text style={[styles.filterChipText, sortOption === opt && styles.filterChipTextActive]}>
                      {opt === 'name' ? 'Name (A-Z)' : 'Joined Date (Newest)'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Overview Counters */}
      <View style={styles.countersRow}>
        <View style={[styles.counterBlock, { borderColor: Colors.border }]}>
          <Text style={styles.counterEmoji}>👥</Text>
          <Text style={styles.counterValue}>{1245 + usersList.length}</Text>
          <Text style={styles.counterLabel}>Total Users</Text>
        </View>
        <View style={[styles.counterBlock, { borderColor: Colors.successLight }]}>
          <Text style={styles.counterEmoji}>🟢</Text>
          <Text style={styles.counterValue}>{975 + usersList.filter(u => u.status === 'active').length}</Text>
          <Text style={styles.counterLabel}>Active</Text>
        </View>
        <View style={[styles.counterBlock, { borderColor: Colors.dangerBg }]}>
          <Text style={styles.counterEmoji}>🔴</Text>
          <Text style={styles.counterValue}>{15 + usersList.filter(u => u.status === 'blocked').length}</Text>
          <Text style={styles.counterLabel}>Blocked</Text>
        </View>
      </View>

      {/* User List */}
      <Text style={styles.userListTitle}>User List</Text>
      <View style={styles.userCardsGrid}>
        {getFilteredUsers().map((user) => (
          <Card key={user.id} style={styles.userManagementCard}>
            <View style={styles.userCardHeader}>
              <View style={styles.userAvatarContainer}>
                <User size={18} color={Colors.white} />
              </View>
              <View style={{ flex: 1, marginLeft: Spacing.sm }}>
                <Text style={styles.userCardName}>{user.name}</Text>
                <Text style={styles.userCardEmail}>📧 {user.email}</Text>
              </View>
              <View style={[
                styles.statusIndicator,
                user.status === 'active' ? styles.statusActive : styles.statusBlocked
              ]}>
                <Text style={user.status === 'active' ? styles.statusActiveText : styles.statusBlockedText}>
                  {user.status === 'active' ? 'Active 🟢' : 'Blocked 🔴'}
                </Text>
              </View>
            </View>

            <View style={styles.userCardContent}>
              {user.phone ? (
                <Text style={styles.userCardDetailText}>📱 Phone: {user.phone}</Text>
              ) : null}
              {user.city ? (
                <Text style={styles.userCardDetailText}>📍 City: {user.city}</Text>
              ) : null}
              {user.joinedDate ? (
                <Text style={styles.userCardDetailText}>📅 Joined: {user.joinedDate}</Text>
              ) : null}
            </View>

            <View style={styles.userCardActionRow}>
              <TouchableOpacity
                style={styles.cardViewBtn}
                onPress={() => setSelectedUserForView(user)}
              >
                <Eye size={14} color={Colors.primary} />
                <Text style={styles.cardViewText}>View</Text>
              </TouchableOpacity>

              {user.status === 'active' ? (
                <TouchableOpacity
                  style={styles.cardBlockBtn}
                  onPress={() => setSelectedUserForBlock(user)}
                >
                  <X size={14} color={Colors.sos} />
                  <Text style={styles.cardBlockText}>Block</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.cardUnblockBtn}
                  onPress={() => setSelectedUserForUnblock(user)}
                >
                  <CheckCircle2 size={14} color={Colors.success} />
                  <Text style={styles.cardUnblockText}>Unblock</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
        ))}

        {getFilteredUsers().length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Users size={32} color={Colors.secondary} />
            <Text style={styles.emptyStateText}>No users matched your search criteria.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContentContainer: {
    gap: Spacing.lg,
  },
  tabHeaderRow: {
    marginBottom: Spacing.sm,
  },
  tabHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.heading,
  },
  searchSectionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.small,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 44,
    paddingHorizontal: Spacing.sm,
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
  filterToggleBtn: {
    paddingHorizontal: Spacing.md,
    height: 44,
    borderRadius: Radius.small,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterToggleBtnActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  filterToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.body,
  },
  filterToggleTextActive: {
    color: Colors.primary,
  },
  filterDropdownContent: {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  filterSection: {
    marginBottom: Spacing.sm,
  },
  filterTitle: {
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
  optionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  // Counters Row Layout
  countersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  counterBlock: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  counterEmoji: {
    fontSize: 18,
    marginBottom: 2,
  },
  counterValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.heading,
  },
  counterLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
  // User list titles & cards
  userListTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
    marginTop: Spacing.sm,
  },
  userCardsGrid: {
    gap: Spacing.md,
  },
  userManagementCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.small,
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  userAvatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCardName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
  },
  userCardEmail: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.small,
  },
  statusActive: {
    backgroundColor: Colors.successLight,
  },
  statusBlocked: {
    backgroundColor: Colors.dangerBg,
  },
  statusActiveText: {
    color: Colors.success,
    fontSize: 10,
    fontWeight: '700',
  },
  statusBlockedText: {
    color: Colors.sos,
    fontSize: 10,
    fontWeight: '700',
  },
  userCardContent: {
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  userCardDetailText: {
    fontSize: 13,
    color: Colors.body,
    fontWeight: '500',
  },
  userCardActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  cardViewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    height: 32,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  cardViewText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  cardBlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    height: 32,
    borderRadius: Radius.small,
    backgroundColor: Colors.dangerBg,
    borderWidth: 1,
    borderColor: Colors.sos,
  },
  cardBlockText: {
    color: Colors.sos,
    fontSize: 12,
    fontWeight: '700',
  },
  cardUnblockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    height: 32,
    borderRadius: Radius.small,
    backgroundColor: Colors.successLight,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  cardUnblockText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: '700',
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
});
