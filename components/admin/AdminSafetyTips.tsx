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
  Plus,
  Eye,
  Trash2,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { SafetyTip } from './types';

interface AdminSafetyTipsProps {
  tipsList: SafetyTip[];
  tipsSearchQuery: string;
  setTipsSearchQuery: (query: string) => void;
  showAddTipForm: boolean;
  setShowAddTipForm: (show: boolean) => void;
  editingTipId: string | null;
  tipFormTitle: string;
  setTipFormTitle: (title: string) => void;
  tipFormCategory: SafetyTip['category'];
  setTipFormCategory: (cat: SafetyTip['category']) => void;
  tipFormDesc: string;
  setTipFormDesc: (desc: string) => void;
  tipFormImage: string;
  setTipFormImage: (image: string) => void;
  tipFormStatus: 'Published' | 'Draft';
  setTipFormStatus: (status: 'Published' | 'Draft') => void;
  setSelectedTipForView: (tip: SafetyTip | null) => void;
  setSelectedTipForDelete: (tip: SafetyTip | null) => void;
  handleSaveTip: () => void;
  handleStartEditTip: (tip: SafetyTip) => void;
  handleCancelTipForm: () => void;
}

export default function AdminSafetyTips({
  tipsList,
  tipsSearchQuery,
  setTipsSearchQuery,
  showAddTipForm,
  setShowAddTipForm,
  editingTipId,
  tipFormTitle,
  setTipFormTitle,
  tipFormCategory,
  setTipFormCategory,
  tipFormDesc,
  setTipFormDesc,
  tipFormImage,
  setTipFormImage,
  tipFormStatus,
  setTipFormStatus,
  setSelectedTipForView,
  setSelectedTipForDelete,
  handleSaveTip,
  handleStartEditTip,
  handleCancelTipForm,
}: AdminSafetyTipsProps) {
  return (
    <View style={styles.tabContentContainer}>
      {/* Header inside tab */}
      <View style={styles.tabHeaderRow}>
        <Text style={styles.tabHeaderTitle}>🛡 Safety Tips</Text>
      </View>

      {/* Search & Add New Tip Controls */}
      <View style={styles.searchSectionCard}>
        <View style={styles.searchRow}>
          <View style={styles.searchBarContainer}>
            <Search size={18} color={Colors.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Tips"
              value={tipsSearchQuery}
              onChangeText={setTipsSearchQuery}
              placeholderTextColor={Colors.secondary}
            />
            {tipsSearchQuery !== '' && (
              <TouchableOpacity onPress={() => setTipsSearchQuery('')}>
                <X size={18} color={Colors.secondary} style={{ marginRight: 6 }} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.filterToggleBtn, showAddTipForm && styles.filterToggleBtnActive]}
            onPress={() => {
              if (showAddTipForm) {
                handleCancelTipForm();
              } else {
                setShowAddTipForm(true);
              }
            }}
          >
            <Text style={[styles.filterToggleText, showAddTipForm && styles.filterToggleTextActive]}>
              {showAddTipForm ? 'Cancel' : '+ Add New Tip'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Collapsible Form for Add / Edit Tip */}
        {showAddTipForm && (
          <View style={styles.tipFormContent}>
            <Text style={styles.tipFormSubtitle}>
              {editingTipId ? '✏ Edit Safety Tip' : '➕ Add Safety Tip'}
            </Text>

            <Text style={styles.optionInputLabel}>Title</Text>
            <TextInput
              style={styles.optionInput}
              value={tipFormTitle}
              onChangeText={setTipFormTitle}
              placeholder="e.g. Don't Share OTP"
              placeholderTextColor={Colors.secondary}
            />

            <Text style={styles.optionInputLabel}>Category</Text>
            <View style={styles.categoryPickerContainer}>
              {(['Personal Safety', 'Cyber Safety', 'Travel Safety', 'Student Safety', 'Workplace Safety', 'Emergency Tips'] as const).map((cat) => {
                const getEmoji = (c: string) => {
                  if (c === 'Personal Safety') return '🚶';
                  if (c === 'Cyber Safety') return '🌐';
                  if (c === 'Travel Safety') return '🚕';
                  if (c === 'Student Safety') return '🏫';
                  if (c === 'Workplace Safety') return '🏢';
                  return '🚨';
                };
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categorySelectBtn,
                      tipFormCategory === cat && styles.categorySelectBtnActive
                    ]}
                    onPress={() => setTipFormCategory(cat)}
                  >
                    <Text style={[
                      styles.categorySelectText,
                      tipFormCategory === cat && styles.categorySelectTextActive
                    ]}>
                      {getEmoji(cat)} {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.optionInputLabel}>Description</Text>
            <TextInput
              style={[styles.optionInput, { height: 80, textAlignVertical: 'top', paddingVertical: Spacing.sm }]}
              value={tipFormDesc}
              onChangeText={setTipFormDesc}
              placeholder="Provide step-by-step instructions..."
              multiline
              numberOfLines={3}
              placeholderTextColor={Colors.secondary}
            />

            <Text style={styles.optionInputLabel}>Image URL (Optional)</Text>
            <TextInput
              style={styles.optionInput}
              value={tipFormImage}
              onChangeText={setTipFormImage}
              placeholder="e.g. https://example.com/tip.png"
              placeholderTextColor={Colors.secondary}
            />

            <Text style={styles.optionInputLabel}>Status</Text>
            <View style={styles.statusToggleRow}>
              {(['Published', 'Draft'] as const).map((stat) => (
                <TouchableOpacity
                  key={stat}
                  style={[
                    styles.statusToggleBtn,
                    tipFormStatus === stat && styles.statusToggleBtnActive
                  ]}
                  onPress={() => setTipFormStatus(stat)}
                >
                  <Text style={[
                    styles.statusToggleText,
                    tipFormStatus === stat && styles.statusToggleTextActive
                  ]}>
                    {stat === 'Published' ? 'Published 🟢' : 'Draft 🟡'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.optionSaveBtn} onPress={handleSaveTip}>
              <CheckCircle2 size={16} color={Colors.white} />
              <Text style={styles.optionSaveBtnText}>Save Tip</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Statistics Counters */}
      <View style={styles.countersRow}>
        <View style={[styles.counterBlock, { borderColor: Colors.border }]}>
          <Text style={styles.counterEmoji}>🛡</Text>
          <Text style={styles.counterValue}>{45 + tipsList.length}</Text>
          <Text style={styles.counterLabel}>Total Tips</Text>
        </View>
        <View style={[styles.counterBlock, { borderColor: Colors.successLight }]}>
          <Text style={styles.counterEmoji}>🟢</Text>
          <Text style={styles.counterValue}>{40 + tipsList.filter(t => t.status === 'Published').length}</Text>
          <Text style={styles.counterLabel}>Published</Text>
        </View>
        <View style={[styles.counterBlock, { borderColor: Colors.warningBg }]}>
          <Text style={styles.counterEmoji}>🟡</Text>
          <Text style={styles.counterValue}>{5 + tipsList.filter(t => t.status === 'Draft').length}</Text>
          <Text style={styles.counterLabel}>Draft</Text>
        </View>
      </View>

      {/* Tips List */}
      <Text style={styles.userListTitle}>Tips List</Text>
      <View style={styles.tipsListContainer}>
        {tipsList
          .filter(tip => 
            tip.title.toLowerCase().includes(tipsSearchQuery.toLowerCase()) || 
            tip.description.toLowerCase().includes(tipsSearchQuery.toLowerCase()) ||
            tip.category.toLowerCase().includes(tipsSearchQuery.toLowerCase())
          )
          .map((tip) => {
            const getEmoji = (c: string) => {
              if (c === 'Personal Safety') return '🚶';
              if (c === 'Cyber Safety') return '🌐';
              if (c === 'Travel Safety') return '🚕';
              if (c === 'Student Safety') return '🏫';
              if (c === 'Workplace Safety') return '🏢';
              return '🚨';
            };
            return (
              <Card key={tip.id} style={styles.tipListItemCard}>
                <View style={styles.tipCardMetaRow}>
                  <View style={styles.tipCategoryBadge}>
                    <Text style={styles.tipCategoryText}>
                      {getEmoji(tip.category)} {tip.category}
                    </Text>
                  </View>
                  <View style={[
                    styles.statusIndicator,
                    tip.status === 'Published' ? styles.statusActive : styles.statusBlocked
                  ]}>
                    <Text style={tip.status === 'Published' ? styles.statusActiveText : styles.statusBlockedText}>
                      {tip.status === 'Published' ? 'Published 🟢' : 'Draft 🟡'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.tipItemTitle}>🛡 {tip.title}</Text>
                <Text style={styles.tipItemDesc}>{tip.description}</Text>
                
                <View style={styles.tipCardMetaRow}>
                  <Text style={styles.tipDateText}>Last Updated: {tip.lastUpdated}</Text>
                </View>

                <View style={styles.userCardActionRow}>
                  <TouchableOpacity 
                    style={styles.cardViewBtn} 
                    onPress={() => setSelectedTipForView(tip)}
                  >
                    <Eye size={14} color={Colors.primary} />
                    <Text style={styles.cardViewText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.cardViewBtn, { borderColor: Colors.warning }]} 
                    onPress={() => handleStartEditTip(tip)}
                  >
                    <Plus size={14} color={Colors.warning} />
                    <Text style={[styles.cardViewText, { color: Colors.warning }]}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.cardBlockBtn} 
                    onPress={() => setSelectedTipForDelete(tip)}
                  >
                    <Trash2 size={14} color={Colors.sos} />
                    <Text style={styles.cardBlockText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          })}

        {tipsList.filter(tip => 
          tip.title.toLowerCase().includes(tipsSearchQuery.toLowerCase()) || 
          tip.description.toLowerCase().includes(tipsSearchQuery.toLowerCase())
        ).length === 0 && (
          <View style={styles.emptyStateContainer}>
            <Lightbulb size={32} color={Colors.secondary} />
            <Text style={styles.emptyStateText}>No safety tips match your search criteria.</Text>
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
  // Safety Tip form specific styles
  tipFormContent: {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  tipFormSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  optionInputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.body,
    marginBottom: 6,
  },
  optionInput: {
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
    height: 42,
    marginBottom: Spacing.md,
    fontSize: 14,
    color: Colors.heading,
  },
  categoryPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.md,
  },
  categorySelectBtn: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.circle,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  categorySelectBtnActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  categorySelectText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
  },
  categorySelectTextActive: {
    color: Colors.primary,
  },
  statusToggleRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statusToggleBtn: {
    flex: 1,
    height: 38,
    borderRadius: Radius.small,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  statusToggleBtnActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  statusToggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
  },
  statusToggleTextActive: {
    color: Colors.primary,
  },
  optionSaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    height: 44,
    borderRadius: Radius.medium,
    backgroundColor: Colors.primary,
    marginTop: Spacing.xs,
  },
  optionSaveBtnText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  tipsListContainer: {
    gap: Spacing.md,
  },
  tipListItemCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadows.small,
  },
  tipCardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  tipCategoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.circle,
  },
  tipCategoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.body,
  },
  tipItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
  },
  tipItemDesc: {
    fontSize: 13,
    color: Colors.body,
    lineHeight: 18,
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  tipDateText: {
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: '500',
  },
});
