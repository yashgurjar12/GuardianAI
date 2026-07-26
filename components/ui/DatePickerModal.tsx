import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Check } from 'lucide-react-native';
import { Colors, Radius, Spacing, Shadows } from '@/constants/theme';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (dateStr: string) => void;
  initialDate?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function DatePickerModal({
  visible,
  onClose,
  onSelectDate,
  initialDate = '',
}: DatePickerModalProps) {
  const today = new Date();
  const currentYear = today.getFullYear();

  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [viewMode, setViewMode] = useState<'calendar' | 'year' | 'month'>('calendar');

  // Generate range of years (1940 to currentYear)
  const years = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (initialDate && initialDate.includes('/')) {
      const parts = initialDate.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        if (!isNaN(day) && day >= 1 && day <= 31) setSelectedDay(day);
        if (!isNaN(month) && month >= 0 && month <= 11) setSelectedMonth(month);
        if (!isNaN(year) && year >= 1900 && year <= currentYear) setSelectedYear(year);
      }
    }
  }, [initialDate, visible]);

  // Days in selected month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // First day of week for selected month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handleConfirm = () => {
    const formattedDay = selectedDay < 10 ? `0${selectedDay}` : `${selectedDay}`;
    const formattedMonth = selectedMonth + 1 < 10 ? `0${selectedMonth + 1}` : `${selectedMonth + 1}`;
    const dateStr = `${formattedDay}/${formattedMonth}/${selectedYear}`;
    onSelectDate(dateStr);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <CalendarIcon size={20} color={Colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.headerTitle}>Select Date of Birth</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <X size={20} color={Colors.secondary} />
            </TouchableOpacity>
          </View>

          {/* Selected Date Summary Banner */}
          <View style={styles.summaryBanner}>
            <Text style={styles.summaryLabel}>Selected Date</Text>
            <Text style={styles.summaryDate}>
              {selectedDay} {MONTH_NAMES[selectedMonth]} {selectedYear}
            </Text>
          </View>

          {/* Month / Year Selector Bar */}
          <View style={styles.navBar}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={handlePrevMonth}
              disabled={viewMode !== 'calendar'}
            >
              <ChevronLeft size={20} color={viewMode === 'calendar' ? Colors.heading : Colors.disabled} />
            </TouchableOpacity>

            <View style={styles.navTitles}>
              <TouchableOpacity
                style={styles.selectorPill}
                onPress={() => setViewMode(viewMode === 'month' ? 'calendar' : 'month')}
              >
                <Text style={styles.selectorPillText}>{MONTH_NAMES[selectedMonth]}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.selectorPill}
                onPress={() => setViewMode(viewMode === 'year' ? 'calendar' : 'year')}
              >
                <Text style={styles.selectorPillText}>{selectedYear}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.navBtn}
              onPress={handleNextMonth}
              disabled={viewMode !== 'calendar'}
            >
              <ChevronRight size={20} color={viewMode === 'calendar' ? Colors.heading : Colors.disabled} />
            </TouchableOpacity>
          </View>

          {/* Body View Mode: Year Selector Grid */}
          {viewMode === 'year' && (
            <ScrollView style={styles.yearGridScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.yearGrid}>
                {years.map((yr) => (
                  <TouchableOpacity
                    key={yr}
                    style={[
                      styles.yearItem,
                      yr === selectedYear && styles.yearItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedYear(yr);
                      setViewMode('calendar');
                    }}
                  >
                    <Text
                      style={[
                        styles.yearItemText,
                        yr === selectedYear && styles.yearItemTextSelected,
                      ]}
                    >
                      {yr}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}

          {/* Body View Mode: Month Selector Grid */}
          {viewMode === 'month' && (
            <View style={styles.monthGrid}>
              {MONTH_NAMES.map((monthName, idx) => (
                <TouchableOpacity
                  key={monthName}
                  style={[
                    styles.monthItem,
                    idx === selectedMonth && styles.monthItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedMonth(idx);
                    setViewMode('calendar');
                  }}
                >
                  <Text
                    style={[
                      styles.monthItemText,
                      idx === selectedMonth && styles.monthItemTextSelected,
                    ]}
                  >
                    {monthName.substring(0, 3)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Body View Mode: Standard Calendar Days Grid */}
          {viewMode === 'calendar' && (
            <View style={styles.calendarContainer}>
              {/* Day Name Headers */}
              <View style={styles.daysHeaderRow}>
                {DAYS_OF_WEEK.map((d) => (
                  <Text key={d} style={styles.dayHeaderCell}>
                    {d}
                  </Text>
                ))}
              </View>

              {/* Day Cells Grid */}
              <View style={styles.daysGrid}>
                {/* Blank cells for offset before 1st day of month */}
                {Array.from({ length: firstDay }).map((_, idx) => (
                  <View key={`empty-${idx}`} style={styles.dayCellEmpty} />
                ))}

                {/* Actual day numbers */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isSelected = dayNum === selectedDay;

                  return (
                    <TouchableOpacity
                      key={`day-${dayNum}`}
                      style={[
                        styles.dayCell,
                        isSelected && styles.dayCellSelected,
                      ]}
                      onPress={() => setSelectedDay(dayNum)}
                    >
                      <Text
                        style={[
                          styles.dayCellText,
                          isSelected && styles.dayCellTextSelected,
                        ]}
                      >
                        {dayNum}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Bottom Actions */}
          <View style={styles.footerActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Check size={18} color={Colors.white} style={{ marginRight: 6 }} />
              <Text style={styles.confirmBtnText}>Set Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.white,
    borderRadius: Radius.extraLarge,
    padding: Spacing.lg,
    ...Shadows.large,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.heading,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryBanner: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.medium,
    padding: Spacing.sm + 2,
    marginBottom: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
  summaryLabel: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryDate: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryDark,
    marginTop: 2,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  navTitles: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  selectorPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.circle,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectorPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.heading,
  },
  calendarContainer: {
    marginBottom: Spacing.md,
  },
  daysHeaderRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  dayHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCellEmpty: {
    width: '14.28%',
    height: 40,
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  dayCellSelected: {
    backgroundColor: Colors.primary,
  },
  dayCellText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.heading,
  },
  dayCellTextSelected: {
    color: Colors.white,
    fontWeight: '700',
  },
  yearGridScroll: {
    maxHeight: 240,
    marginBottom: Spacing.md,
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  yearItem: {
    width: '23%',
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.medium,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  yearItemSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  yearItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.heading,
  },
  yearItemTextSelected: {
    color: Colors.white,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs + 2,
    marginBottom: Spacing.md,
  },
  monthItem: {
    width: '31%',
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.medium,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  monthItemSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  monthItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.heading,
  },
  monthItemTextSelected: {
    color: Colors.white,
  },
  footerActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  cancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: Radius.medium,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
  },
  confirmBtn: {
    flex: 1.5,
    height: 46,
    borderRadius: Radius.medium,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  confirmBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
});
