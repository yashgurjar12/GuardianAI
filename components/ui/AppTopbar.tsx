import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import {
  Menu,
  Shield,
  Clock,
  Bell,
  Settings,
  LogOut,
  X,
  User,
  ChevronRight,
} from 'lucide-react-native';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { useNotifications } from '@/context/NotificationContext';

interface AppTopbarProps {
  title?: string;
  onNotificationPress?: () => void;
}

export default function AppTopbar({
  title = 'GuardianAI',
  onNotificationPress,
}: AppTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavigate = (route: string) => {
    setDrawerOpen(false);
    setProfileDropdownOpen(false);
    router.push(route as any);
  };

  const handleLogout = () => {
    setDrawerOpen(false);
    setProfileDropdownOpen(false);
    router.replace('/login');
  };

  const handleNotificationClick = () => {
    if (onNotificationPress) {
      onNotificationPress();
    }
    handleNavigate('/notifications');
  };

  // Check which drawer option is active based on pathname
  const isHistoryActive = pathname === '/history';
  const isNotificationsActive = pathname === '/notifications';
  const isSettingsActive = pathname === '/settings';

  return (
    <View style={styles.topbarContainer}>
      {/* Left Action: Hamburger Menu + Title */}
      <View style={styles.leftGroup}>
        <TouchableOpacity
          style={styles.hamburgerBtn}
          onPress={() => setDrawerOpen(true)}
          activeOpacity={0.7}
        >
          <Menu size={24} color={Colors.heading} />
        </TouchableOpacity>

        <Text style={styles.brandTitle}>{title}</Text>
      </View>

      {/* Right Actions: Bell & Profile */}
      <View style={styles.rightActions}>
        {/* Notification Bell */}
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={handleNotificationClick}
          activeOpacity={0.7}
        >
          <Bell size={20} color={Colors.heading} />
          {unreadCount > 0 && <View style={styles.redDot} />}
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => setProfileDropdownOpen(true)}
          activeOpacity={0.7}
        >
          <User size={22} color={Colors.heading} />
        </TouchableOpacity>
      </View>

      {/* Profile Dropdown Modal */}
      <Modal
        visible={profileDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setProfileDropdownOpen(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setProfileDropdownOpen(false)}
        >
          <View
            style={styles.dropdownCard}
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => handleNavigate('/settings')}
              activeOpacity={0.7}
            >
              <Settings size={18} color={Colors.heading} />
              <Text style={styles.optionTextHeading}>Settings</Text>
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <LogOut size={18} color={Colors.sos} />
              <Text style={styles.optionTextLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Sidebar / Drawer Modal */}
      <Modal
        visible={drawerOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDrawerOpen(false)}
      >
        <View style={styles.drawerOverlayContainer}>
          {/* Backdrop Overlay */}
          <Pressable
            style={styles.drawerBackdrop}
            onPress={() => setDrawerOpen(false)}
          />

          {/* Sliding Drawer Container matching design system & reference image */}
          <View style={styles.drawerContent}>
            {/* Header */}
            <View style={styles.sidebarHeader}>
              <View style={styles.sidebarLogoWrapper}>
                <Shield size={24} color={Colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sidebarLogoText} numberOfLines={1}>
                  GuardianAI
                </Text>
                <Text style={styles.sidebarSubtitle}>User Console</Text>
              </View>
              {/* Close Button (X) at top right */}
              <TouchableOpacity
                style={styles.drawerCloseBtn}
                onPress={() => setDrawerOpen(false)}
                activeOpacity={0.8}
              >
                <X size={18} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {/* Menu List */}
            <ScrollView
              style={styles.menuScrollView}
              contentContainerStyle={styles.menuList}
              showsVerticalScrollIndicator={false}
            >
              {/* Option 1: History */}
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  isHistoryActive && styles.menuItemActive,
                ]}
                onPress={() => handleNavigate('/history')}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.menuIconWrapper,
                    isHistoryActive
                      ? styles.menuIconActive
                      : styles.menuIconInactive,
                  ]}
                >
                  <Clock
                    size={20}
                    color={isHistoryActive ? Colors.primary : Colors.secondary}
                  />
                </View>
                <Text
                  style={[
                    styles.menuText,
                    isHistoryActive && styles.menuTextActive,
                  ]}
                >
                  History
                </Text>
                <ChevronRight size={16} color="rgba(255, 255, 255, 0.3)" />
              </TouchableOpacity>

              {/* Option 2: Notifications */}
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  isNotificationsActive && styles.menuItemActive,
                ]}
                onPress={() => handleNavigate('/notifications')}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.menuIconWrapper,
                    isNotificationsActive
                      ? styles.menuIconActive
                      : styles.menuIconInactive,
                  ]}
                >
                  <Bell
                    size={20}
                    color={
                      isNotificationsActive ? Colors.primary : Colors.secondary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.menuText,
                    isNotificationsActive && styles.menuTextActive,
                  ]}
                >
                  Notifications
                </Text>
                {unreadCount > 0 && (
                  <View style={styles.badgeSOS}>
                    <Text style={styles.badgeTextSOS}>{unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Option 3: Settings */}
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  isSettingsActive && styles.menuItemActive,
                ]}
                onPress={() => handleNavigate('/settings')}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.menuIconWrapper,
                    isSettingsActive
                      ? styles.menuIconActive
                      : styles.menuIconInactive,
                  ]}
                >
                  <Settings
                    size={20}
                    color={isSettingsActive ? Colors.primary : Colors.secondary}
                  />
                </View>
                <Text
                  style={[
                    styles.menuText,
                    isSettingsActive && styles.menuTextActive,
                  ]}
                >
                  Settings
                </Text>
                <ChevronRight size={16} color="rgba(255, 255, 255, 0.3)" />
              </TouchableOpacity>
            </ScrollView>

            {/* Footer: Logout */}
            <View style={styles.sidebarFooter}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <LogOut size={20} color={Colors.sos} />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  topbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    backgroundColor: 'transparent',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  hamburgerBtn: {
    padding: Spacing.xs,
    borderRadius: Radius.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.heading,
    letterSpacing: -0.3,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...Shadows.small,
  },
  redDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.sos,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 64,
    paddingRight: Spacing.lg,
  },
  dropdownCard: {
    width: 170,
    backgroundColor: Colors.surface,
    borderRadius: Radius.medium,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Shadows.medium,
    elevation: 12,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.xs,
  },
  optionTextHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.heading,
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 2,
  },
  optionTextLogout: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.sos,
  },
  // Sidebar Drawer Styles
  drawerOverlayContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlay,
  },
  drawerContent: {
    width: 290,
    height: '100%',
    backgroundColor: '#0F172A',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    ...Shadows.large,
    elevation: 16,
    zIndex: 1000,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
    position: 'relative',
  },
  sidebarLogoWrapper: {
    width: 44,
    height: 44,
    borderRadius: Radius.medium,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  sidebarLogoText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  sidebarSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontWeight: '600',
  },
  drawerCloseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  menuScrollView: {
    flex: 1,
  },
  menuList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.medium,
    marginVertical: 2,
  },
  menuItemActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.18)',
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
  },
  menuIconInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuText: {
    color: Colors.disabled,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: Spacing.sm,
    flex: 1,
  },
  menuTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  badgeSOS: {
    backgroundColor: Colors.sos,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.circle,
  },
  badgeTextSOS: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  sidebarFooter: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  logoutButtonText: {
    color: Colors.sos,
    fontSize: 16,
    fontWeight: '600',
  },
});

