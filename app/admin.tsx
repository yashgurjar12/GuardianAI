import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
  Modal,
  Platform,
  Alert,
  Switch,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Menu,
  X,
  Bell,
  User,
  Shield,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Users,
  AlertTriangle,
  Brain,
  MessageSquare,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Eye,
  Lightbulb,
  LogOut,
  Send,
  Mail,
  Phone,
  Calendar,
  Lock,
  Settings,
} from 'lucide-react-native';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import { MonitoredUser, SafetyTip, SOSReport, AdminProfile } from '@/components/admin/types';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminUserManagement from '@/components/admin/AdminUserManagement';
import AdminSafetyTips from '@/components/admin/AdminSafetyTips';
import AdminSOSReport from '@/components/admin/AdminSOSReport';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminEditProfile from '@/components/admin/AdminEditProfile';
import AdminChangePassword from '@/components/admin/AdminChangePassword';

const mockAdminProfiles: AdminProfile[] = [
  { name: 'Admin', role: 'Chief Administrator', email: 'admin@guardian.ai', avatarInitials: 'AD' },
  { name: 'James Carter', role: 'Emergency Supervisor', email: 'j.carter@guardian.ai', avatarInitials: 'JC' },
  { name: 'Sarah Mitchell', role: 'Duty Officer', email: 's.mitchell@guardian.ai', avatarInitials: 'SM' },
];

const initialUsers: MonitoredUser[] = [
  {
    id: '1',
    name: 'Sonam Gupta',
    email: 'sonam@gmail.com',
    phone: '9876543210',
    city: 'Indore',
    joinedDate: '2026-05-12',
    status: 'active',
    trustedContacts: 'Mom, Partner (Aakash)',
    totalSOSTriggered: 2,
    location: 'Vijay Nagar, Indore',
    riskScore: 12,
    lastActive: '2 mins ago',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    phone: '9822155432',
    city: 'Bhopal',
    joinedDate: '2026-06-15',
    status: 'active',
    trustedContacts: 'Amit Sharma (Brother)',
    totalSOSTriggered: 0,
    location: 'MP Nagar, Bhopal',
    riskScore: 8,
    lastActive: '5 mins ago',
  },
  {
    id: '3',
    name: 'Riya Patel',
    email: 'riya@gmail.com',
    phone: '9844099887',
    city: 'Gwalior',
    joinedDate: '2026-07-01',
    status: 'blocked',
    trustedContacts: 'Rohan Patel (Father)',
    totalSOSTriggered: 5,
    location: 'Lashkar, Gwalior',
    riskScore: 84,
    lastActive: 'Blocked',
  },
  {
    id: '4',
    name: 'Neha Verma',
    email: 'neha@gmail.com',
    phone: '9899011223',
    city: 'Indore',
    joinedDate: '2026-07-10',
    status: 'active',
    trustedContacts: 'Mom, Sister (Payal)',
    totalSOSTriggered: 1,
    location: 'Palasia, Indore',
    riskScore: 15,
    lastActive: '10 mins ago',
  },
  {
    id: '5',
    name: 'Pooja Mishra',
    email: 'pooja@gmail.com',
    phone: '9811223344',
    city: 'Bhopal',
    joinedDate: '2026-07-18',
    status: 'active',
    trustedContacts: 'Husband (Vivek)',
    totalSOSTriggered: 0,
    location: 'Arera Colony, Bhopal',
    riskScore: 5,
    lastActive: '15 mins ago',
  }
];

const initialTips: SafetyTip[] = [
  {
    id: '1',
    title: "Don't Share OTP",
    category: 'Cyber Safety',
    description: 'Never share your One Time Password (OTP) or account password with anyone. Banks and official representatives will never ask for it.',
    status: 'Published',
    lastUpdated: '18 Jul 2026',
  },
  {
    id: '2',
    title: 'Secure Taxi Share',
    category: 'Travel Safety',
    description: 'Before riding, verify the taxi details and driver ID. Always share your live route tracking link with a trusted contact.',
    status: 'Published',
    lastUpdated: '19 Jul 2026',
  },
  {
    id: '3',
    title: 'Dim Path Precaution',
    category: 'Personal Safety',
    description: 'Avoid walking through dimly lit shortcuts or unfamiliar alleyways at night. Stick to main, crowded roads whenever possible.',
    status: 'Draft',
    lastUpdated: '17 Jul 2026',
  },
  {
    id: '4',
    title: 'Campus Safe Escort',
    category: 'Student Safety',
    description: 'Utilize your university safe escort services if you have to walk across campus late at night.',
    status: 'Published',
    lastUpdated: '15 Jul 2026',
  },
  {
    id: '5',
    title: 'Late Office Exit Log',
    category: 'Workplace Safety',
    description: 'If leaving the office after regular working hours, log your exit with building security and ensure the elevator corridors are lit.',
    status: 'Draft',
    lastUpdated: '16 Jul 2026',
  }
];

export default function AdminScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  // States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'tips' | 'sos' | 'edit-profile' | 'change-password'>('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Custom interactive models for notifications
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  
  // Data States
  const [usersList, setUsersList] = useState<MonitoredUser[]>(initialUsers);
  const [tipsList, setTipsList] = useState<SafetyTip[]>(initialTips);
  
  // User Management tab filtering/sorting and interactive modals state
  const [filterOption, setFilterOption] = useState<'all' | 'active' | 'blocked' | 'new'>('all');
  const [sortOption, setSortOption] = useState<'name' | 'date'>('name');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  
  const [selectedUserForView, setSelectedUserForView] = useState<MonitoredUser | null>(null);
  const [selectedUserForBlock, setSelectedUserForBlock] = useState<MonitoredUser | null>(null);
  const [selectedUserForUnblock, setSelectedUserForUnblock] = useState<MonitoredUser | null>(null);
  
  // Dynamic list of SOS reports
  const [sosReports, setSosReports] = useState<SOSReport[]>([
    {
      id: '1',
      userName: 'Sonam Gupta',
      phone: '9876543210',
      location: 'Vijay Nagar, Indore',
      city: 'Indore',
      dateTime: '18 Jul 2026 | 10:35 AM',
      status: 'Resolved',
      trustedContacts: 'Husband (Vivek)',
      notes: 'Accident alert resolved by local response dispatch.'
    },
    {
      id: '2',
      userName: 'Priya Sharma',
      phone: '9844099887',
      location: 'Arera Colony, Bhopal',
      city: 'Bhopal',
      dateTime: '18 Jul 2026 | 11:10 AM',
      status: 'Pending',
      trustedContacts: 'Father (Rohan Patel)',
      notes: 'Unusual route deviation detected by AI assistant. User not responding to SMS check-ins.'
    },
    {
      id: '3',
      userName: 'Riya Patel',
      phone: '9555102030',
      location: 'Lashkar Road, Gwalior',
      city: 'Gwalior',
      dateTime: '19 Jul 2026 | 02:15 PM',
      status: 'Critical',
      trustedContacts: 'Sister (Pooja)',
      notes: 'SOS Triggered manually by user. Stalking reports active in immediate area.'
    }
  ]);

  // Admin Profile State
  const [currentAdmin, setCurrentAdmin] = useState<AdminProfile>(mockAdminProfiles[0]);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [editAdminName, setEditAdminName] = useState(currentAdmin.name);
  const [editAdminEmail, setEditAdminEmail] = useState(currentAdmin.email);
  const [editAdminAvatar, setEditAdminAvatar] = useState<string | undefined>(currentAdmin.avatarUri);

  // Stats
  const activeSOSCount = sosReports.filter(s => s.status !== 'Resolved').length;

  // Recent Registered Users
  const recentRegisteredUsers = ['Priya', 'Neha', 'Riya'];

  // Interactive forms states
  const [searchQuery, setSearchQuery] = useState('');
  const [tipsSearchQuery, setTipsSearchQuery] = useState('');
  const [showAddTipForm, setShowAddTipForm] = useState(false);
  const [editingTipId, setEditingTipId] = useState<string | null>(null);

  // Safety tip form fields state
  const [tipFormTitle, setTipFormTitle] = useState('');
  const [tipFormCategory, setTipFormCategory] = useState<SafetyTip['category']>('Personal Safety');
  const [tipFormDesc, setTipFormDesc] = useState('');
  const [tipFormImage, setTipFormImage] = useState('');
  const [tipFormStatus, setTipFormStatus] = useState<'Published' | 'Draft'>('Published');

  // Modals for Safety Tips preview & delete confirmation
  const [selectedTipForView, setSelectedTipForView] = useState<SafetyTip | null>(null);
  const [selectedTipForDelete, setSelectedTipForDelete] = useState<SafetyTip | null>(null);

  // Logs state
  const [logsList, setLogsList] = useState<string[]>([
    '[SYSTEM] Admin Console initialized successfully.',
    '[SYSTEM] Connected to Safe-Route GIS server.',
    '[ALERT] High Risk deviation detected for User: Emma Watson.',
    '[SMS] Dispatching safety alert to contacts of Sonam Gupta.',
  ]);

  // Drawer Slide Animation
  const drawerX = useSharedValue(-280);

  useEffect(() => {
    if (isDrawerOpen && !isLargeScreen) {
      drawerX.value = withTiming(0, { duration: 250 });
    } else {
      drawerX.value = withTiming(-280, { duration: 200 });
    }
  }, [isDrawerOpen, isLargeScreen]);

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drawerX.value }],
  }));

  // Greeting based on current time
  const [greeting, setGreeting] = useState('Good Morning');
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const handleTabChange = (tab: 'dashboard' | 'users' | 'tips' | 'sos' | 'edit-profile' | 'change-password') => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    router.replace('/login');
  };

  const handleResolveSOS = (id: string) => {
    setSosReports(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Resolved' } : item))
    );
    const resolvedItem = sosReports.find(i => i.id === id);
    if (resolvedItem) {
      addLog(`[SOS] Resolved alarm for ${resolvedItem.userName}. Dispatch cancelled.`);
      if (resolvedItem.userName === 'Emma Watson' || resolvedItem.userName === 'Sonam Gupta') {
        setUsersList(prev =>
          prev.map(u => (u.name === resolvedItem.userName ? { ...u, status: 'active', riskScore: 10 } : u))
        );
      }
    }
  };

  const handleSaveTip = () => {
    if (!tipFormTitle.trim() || !tipFormDesc.trim()) {
      if (Platform.OS === 'web') alert('Please fill out all required fields.');
      else Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }

    const formattedDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }); // e.g. "19 Jul 2026"

    if (editingTipId) {
      setTipsList(prev =>
        prev.map(t =>
          t.id === editingTipId
            ? {
                ...t,
                title: tipFormTitle,
                category: tipFormCategory,
                description: tipFormDesc,
                imageUri: tipFormImage || undefined,
                status: tipFormStatus,
                lastUpdated: formattedDate,
              }
            : t
        )
      );
      addLog(`[TIPS] Updated safety tip: "${tipFormTitle}"`);
      setEditingTipId(null);
    } else {
      const newTip: SafetyTip = {
        id: String(Date.now()),
        title: tipFormTitle,
        category: tipFormCategory,
        description: tipFormDesc,
        imageUri: tipFormImage || undefined,
        status: tipFormStatus,
        lastUpdated: formattedDate,
      };
      setTipsList([newTip, ...tipsList]);
      addLog(`[TIPS] Added new safety tip: "${tipFormTitle}" [${tipFormStatus.toUpperCase()}]`);
    }

    setTipFormTitle('');
    setTipFormCategory('Personal Safety');
    setTipFormDesc('');
    setTipFormImage('');
    setTipFormStatus('Published');
    setShowAddTipForm(false);
  };

  const handleStartEditTip = (tip: SafetyTip) => {
    setEditingTipId(tip.id);
    setTipFormTitle(tip.title);
    setTipFormCategory(tip.category);
    setTipFormDesc(tip.description);
    setTipFormImage(tip.imageUri || '');
    setTipFormStatus(tip.status);
    setShowAddTipForm(true);
  };

  const handleCancelTipForm = () => {
    setEditingTipId(null);
    setTipFormTitle('');
    setTipFormCategory('Personal Safety');
    setTipFormDesc('');
    setTipFormImage('');
    setTipFormStatus('Published');
    setShowAddTipForm(false);
  };

  const handleSendNotification = () => {
    if (!notificationMsg.trim()) {
      if (Platform.OS === 'web') alert('Please enter notification text.');
      else Alert.alert('Error', 'Please enter notification text.');
      return;
    }
    addLog(`[PUSH/SMS] Broadcast: "${notificationMsg}" successfully sent to all active users.`);
    setNotificationMsg('');
    setShowNotificationModal(false);
    if (Platform.OS === 'web') alert('Notification broadcast sent successfully!');
    else Alert.alert('Sent', 'Notification broadcast sent successfully!');
  };

  const handleTriggerSimAlert = (userName: string) => {
    setUsersList(prev =>
      prev.map(u => (u.name === userName ? { ...u, status: 'active', riskScore: 90 } : u))
    );
    const userToSim = usersList.find(u => u.name === userName);
    const newSOS: SOSReport = {
      id: String(Date.now()),
      userName,
      phone: userToSim?.phone || '9876543210',
      location: 'Simulated Threat Zone, Indore',
      city: userToSim?.city || 'Indore',
      dateTime: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' | ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Critical',
      trustedContacts: userToSim?.trustedContacts || 'Husband (Vivek)',
      notes: 'Manually triggered by Administrator via Admin Console.',
    };
    setSosReports([newSOS, ...sosReports]);
    addLog(`[ALERT] Admin manually triggered SOS State for User: ${userName}`);
    if (Platform.OS === 'web') alert(`Emergency SOS state triggered for ${userName}.`);
    else Alert.alert('SOS Triggered', `Emergency SOS state triggered for ${userName}.`);
  };

  const handleSaveProfile = () => {
    if (!editAdminName.trim() || !editAdminEmail.trim()) {
      if (Platform.OS === 'web') alert('Please fill in profile fields.');
      else Alert.alert('Error', 'Please fill in profile fields.');
      return;
    }
    setCurrentAdmin(prev => ({
      ...prev,
      name: editAdminName,
      email: editAdminEmail,
      avatarUri: editAdminAvatar,
      avatarInitials: editAdminName.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD'
    }));
    addLog(`[PROFILE] Updated administrator details to: ${editAdminName} (${editAdminEmail})`);
    if (Platform.OS === 'web') alert('Profile updated successfully!');
    else Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleSwitchProfile = (profile: AdminProfile) => {
    setCurrentAdmin(profile);
    setEditAdminName(profile.name);
    setEditAdminEmail(profile.email);
    setEditAdminAvatar(profile.avatarUri);
    addLog(`[PROFILE] Switched session to Administrator: ${profile.name}`);
    if (Platform.OS === 'web') alert(`Switched session to ${profile.name}`);
    else Alert.alert('Profile Switched', `Switched session to ${profile.name}`);
  };

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogsList(prev => [`[${time}] ${message}`, ...prev]);
  };

  const getFilteredUsers = () => {
    let list = [...usersList];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query)
      );
    }
    
    if (filterOption === 'active') {
      list = list.filter(u => u.status === 'active');
    } else if (filterOption === 'blocked') {
      list = list.filter(u => u.status === 'blocked');
    } else if (filterOption === 'new') {
      list = list.filter(u => u.joinedDate.startsWith('2026-07'));
    }
    
    if (sortOption === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'date') {
      list.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
    }
    
    return list;
  };

  // Render Sidebar menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Menu size={20} /> },
    { id: 'users', label: 'User Management', icon: <Users size={20} /> },
    { id: 'tips', label: 'Safety Tips', icon: <Lightbulb size={20} /> },
    { id: 'sos', label: 'SOS Report', icon: <AlertTriangle size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderSidebarContent = () => (
    <View style={styles.sidebarContainer}>
      <View style={styles.sidebarHeader}>
        <View style={styles.sidebarLogoWrapper}>
          <Shield size={24} color={Colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sidebarLogoText} numberOfLines={1}>GuardianAI</Text>
          <Text style={styles.sidebarSubtitle}>Admin Console</Text>
        </View>
      </View>

      <ScrollView style={styles.menuScrollView} contentContainerStyle={styles.menuList}>
        {menuItems.map((item) => {
          const isSettingsActive = activeTab === 'edit-profile' || activeTab === 'change-password';
          const isActive = item.id === 'settings' ? isSettingsActive : activeTab === item.id;

          const handlePress = () => {
            if (item.id === 'settings') {
              setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
            } else {
              handleTabChange(item.id as any);
            }
          };

          return (
            <View key={item.id}>
              <TouchableOpacity
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={handlePress}
              >
                <View style={[styles.menuIconWrapper, isActive ? styles.menuIconActive : styles.menuIconInactive]}>
                  {React.cloneElement(item.icon, {
                    color: isActive ? Colors.primary : Colors.secondary,
                  })}
                </View>
                <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                  {item.label}
                </Text>
                {item.id === 'sos' && activeSOSCount > 0 && (
                  <View style={styles.badgeSOS}>
                    <Text style={styles.badgeTextSOS}>{activeSOSCount}</Text>
                  </View>
                )}
                {item.id === 'settings' && (
                  <View style={{ marginLeft: 'auto' }}>
                    {isSettingsDropdownOpen ? (
                      <ChevronUp size={16} color={isActive ? Colors.primary : Colors.secondary} />
                    ) : (
                      <ChevronDown size={16} color={isActive ? Colors.primary : Colors.secondary} />
                    )}
                  </View>
                )}
              </TouchableOpacity>

              {item.id === 'settings' && isSettingsDropdownOpen && (
                <View style={styles.submenuContainer}>
                  <TouchableOpacity
                    style={[styles.submenuItem, activeTab === 'edit-profile' && styles.submenuItemActive]}
                    onPress={() => handleTabChange('edit-profile')}
                  >
                    <User size={16} color={activeTab === 'edit-profile' ? Colors.primary : Colors.secondary} />
                    <Text style={[styles.submenuText, activeTab === 'edit-profile' && styles.submenuTextActive]}>
                      Edit Profile
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.submenuItem, activeTab === 'change-password' && styles.submenuItemActive]}
                    onPress={() => handleTabChange('change-password')}
                  >
                    <Lock size={16} color={activeTab === 'change-password' ? Colors.primary : Colors.secondary} />
                    <Text style={[styles.submenuText, activeTab === 'change-password' && styles.submenuTextActive]}>
                      Change Password
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.sidebarFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
          <LogOut size={20} color={Colors.sos} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Mobile Drawer Modal */}
      {!isLargeScreen ? (
        <Modal
          visible={isDrawerOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDrawerOpen(false)}
        >
          <View style={styles.drawerOverlayContainer}>
            <Pressable
              style={styles.drawerBackdrop}
              onPress={() => setIsDrawerOpen(false)}
            />
            <Animated.View style={[styles.mobileDrawer, animatedDrawerStyle]}>
              <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
                {renderSidebarContent()}
              </SafeAreaView>
              <TouchableOpacity
                style={styles.drawerCloseBtn}
                onPress={() => setIsDrawerOpen(false)}
                activeOpacity={0.8}
              >
                <X size={18} color={Colors.heading} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      ) : (
        <View style={styles.desktopSidebar}>
          {renderSidebarContent()}
        </View>
      )}

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Header Bar */}
        <View style={styles.topHeader}>
          <View style={styles.topHeaderLeft}>
            <TouchableOpacity style={styles.menuToggleBtn} onPress={() => {
              if (isLargeScreen) {
                // Large screen toggle not needed, but can do nothing or toggle sidebar width if implemented
              } else {
                setIsDrawerOpen(true);
              }
            }}>
              <Menu size={24} color={Colors.heading} />
            </TouchableOpacity>
            <Text style={styles.headerTitleText}>GuardianAI Admin</Text>
          </View>
          <View style={styles.topHeaderActions}>
            <TouchableOpacity style={styles.topActionIconBtn} onPress={() => handleTabChange('sos')}>
              <Bell size={22} color={Colors.heading} />
              {activeSOSCount > 0 && <View style={styles.notifBadge} />}
            </TouchableOpacity>
            <View style={{ position: 'relative', zIndex: 1000 }}>
              <TouchableOpacity 
                style={styles.topActionIconBtn} 
                onPress={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                {currentAdmin.avatarUri ? (
                  <Image 
                    source={{ uri: currentAdmin.avatarUri }} 
                    style={{ width: 32, height: 32, borderRadius: 16 }} 
                  />
                ) : (
                  <User size={22} color={Colors.heading} />
                )}
              </TouchableOpacity>

              {isProfileDropdownOpen && (
                <View style={styles.headerProfileDropdown}>
                  <TouchableOpacity
                    style={styles.headerDropdownItem}
                    onPress={() => {
                      setIsSettingsDropdownOpen(true);
                      handleTabChange('edit-profile');
                    }}
                  >
                    <User size={16} color={Colors.heading} />
                    <Text style={styles.headerDropdownText}>Edit Profile</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.headerDropdownDivider} />

                  <TouchableOpacity
                    style={styles.headerDropdownItem}
                    onPress={() => {
                      setIsProfileDropdownOpen(false);
                      setShowLogoutModal(true);
                    }}
                  >
                    <LogOut size={16} color={Colors.sos} />
                    <Text style={[styles.headerDropdownText, { color: Colors.sos }]}>Logout</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Dynamic Panels */}
        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          
          {/* TAB 1: REDESIGNED DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <AdminDashboard
              greeting={greeting}
              adminName={currentAdmin.name}
              usersList={usersList}
              tipsList={tipsList}
              sosReports={sosReports}
              recentRegisteredUsers={recentRegisteredUsers}
              activeSOSCount={activeSOSCount}
              handleTabChange={handleTabChange}
              setShowNotificationModal={setShowNotificationModal}
              handleResolveSOS={handleResolveSOS}
            />
          )}

          {/* TAB 2: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <AdminUserManagement
              usersList={usersList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              sortOption={sortOption}
              setSortOption={setSortOption}
              isFilterDropdownOpen={isFilterDropdownOpen}
              setIsFilterDropdownOpen={setIsFilterDropdownOpen}
              setSelectedUserForView={setSelectedUserForView}
              setSelectedUserForBlock={setSelectedUserForBlock}
              setSelectedUserForUnblock={setSelectedUserForUnblock}
              getFilteredUsers={getFilteredUsers}
            />
          )}

          {/* TAB 3: SAFETY TIPS */}
          {activeTab === 'tips' && (
            <AdminSafetyTips
              tipsList={tipsList}
              tipsSearchQuery={tipsSearchQuery}
              setTipsSearchQuery={setTipsSearchQuery}
              showAddTipForm={showAddTipForm}
              setShowAddTipForm={setShowAddTipForm}
              editingTipId={editingTipId}
              tipFormTitle={tipFormTitle}
              setTipFormTitle={setTipFormTitle}
              tipFormCategory={tipFormCategory}
              setTipFormCategory={setTipFormCategory}
              tipFormDesc={tipFormDesc}
              setTipFormDesc={setTipFormDesc}
              tipFormImage={tipFormImage}
              setTipFormImage={setTipFormImage}
              tipFormStatus={tipFormStatus}
              setTipFormStatus={setTipFormStatus}
              setSelectedTipForView={setSelectedTipForView}
              setSelectedTipForDelete={setSelectedTipForDelete}
              handleSaveTip={handleSaveTip}
              handleStartEditTip={handleStartEditTip}
              handleCancelTipForm={handleCancelTipForm}
            />
          )}

          {/* TAB 4: SOS REPORT */}
          {activeTab === 'sos' && (
            <AdminSOSReport
              sosReports={sosReports}
              handleResolveSOS={handleResolveSOS}
            />
          )}

          {/* TAB 5: EDIT PROFILE */}
          {activeTab === 'edit-profile' && (
            <View style={styles.tabContentContainer}>
              <View style={styles.tabHeaderRow}>
                <Text style={styles.tabHeaderTitle}>⚙ Edit Profile Details</Text>
              </View>
              <Card style={styles.settingsSectionCard}>
                <View style={{ padding: Spacing.md }}>
                  <AdminEditProfile
                    editAdminName={editAdminName}
                    setEditAdminName={setEditAdminName}
                    editAdminEmail={editAdminEmail}
                    setEditAdminEmail={setEditAdminEmail}
                    editAdminAvatar={editAdminAvatar}
                    setEditAdminAvatar={setEditAdminAvatar}
                    handleSaveProfile={handleSaveProfile}
                  />
                </View>
              </Card>
            </View>
          )}

          {/* TAB 6: CHANGE PASSWORD */}
          {activeTab === 'change-password' && (
            <View style={styles.tabContentContainer}>
              <View style={styles.tabHeaderRow}>
                <Text style={styles.tabHeaderTitle}>⚙ Change Password</Text>
              </View>
              <Card style={styles.settingsSectionCard}>
                <View style={{ padding: Spacing.md }}>
                  <AdminChangePassword />
                </View>
              </Card>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Broadcast Notification Modal */}
      <Modal
        visible={showNotificationModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotificationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.broadcastModalTitle}>Broadcast Alert Notification</Text>
            <Text style={styles.broadcastModalDesc}>This message will be sent instantly as a push notification and SMS alert to all tracked app users.</Text>
            
            <TextInput
              style={styles.broadcastInput}
              placeholder="e.g. Traffic block on Indore Main Road, take Oxford detour."
              multiline
              numberOfLines={4}
              value={notificationMsg}
              onChangeText={setNotificationMsg}
              placeholderTextColor={Colors.secondary}
            />

            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowNotificationModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalLogoutBtn, { backgroundColor: Colors.primary }]} onPress={handleSendNotification}>
                <Send size={16} color={Colors.white} />
                <Text style={styles.modalLogoutText}>Send Broadcast</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <AlertTriangle size={48} color={Colors.sos} style={{ marginBottom: Spacing.md, alignSelf: 'center' }} />
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to end your administrator session? Live safety monitoring will continue running.
            </Text>
            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalLogoutBtn} onPress={handleLogout}>
                <Text style={styles.modalLogoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>

      {/* View User Details Modal */}
      <Modal
        visible={selectedUserForView !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedUserForView(null)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>👤 User Profile</Text>
            {selectedUserForView && (
              <View style={styles.profileDetailsContent}>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Name:</Text>
                  <Text style={styles.profileDetailValue}>{selectedUserForView.name}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Email:</Text>
                  <Text style={styles.profileDetailValue}>{selectedUserForView.email}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Phone:</Text>
                  <Text style={styles.profileDetailValue}>{selectedUserForView.phone || 'N/A'}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>City:</Text>
                  <Text style={styles.profileDetailValue}>{selectedUserForView.city || 'N/A'}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Joined Date:</Text>
                  <Text style={styles.profileDetailValue}>{selectedUserForView.joinedDate || 'N/A'}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Trusted Contacts:</Text>
                  <Text style={styles.profileDetailValue}>{selectedUserForView.trustedContacts || 'None'}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Total SOS Triggered:</Text>
                  <Text style={styles.profileDetailValue}>{selectedUserForView.totalSOSTriggered}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Status:</Text>
                  <Text style={[
                    styles.profileDetailValue, 
                    selectedUserForView.status === 'active' ? { color: Colors.success, fontWeight: '700' } : { color: Colors.sos, fontWeight: '700' }
                  ]}>
                    {selectedUserForView.status === 'active' ? 'Active 🟢' : 'Blocked 🔴'}
                  </Text>
                </View>
              </View>
            )}
            <TouchableOpacity style={[styles.modalCancelBtn, { marginTop: Spacing.md }]} onPress={() => setSelectedUserForView(null)}>
              <Text style={styles.modalCancelText}>Close</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>

      {/* Block Confirmation Modal */}
      <Modal
        visible={selectedUserForBlock !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedUserForBlock(null)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <AlertTriangle size={48} color={Colors.sos} style={{ marginBottom: Spacing.md, alignSelf: 'center' }} />
            <Text style={styles.modalTitle}>Block this user?</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to block {selectedUserForBlock?.name}? They will lose access to safety route tracking.
            </Text>
            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setSelectedUserForBlock(null)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalLogoutBtn, { backgroundColor: Colors.sos }]} 
                onPress={() => {
                  if (selectedUserForBlock) {
                    setUsersList(prev => 
                      prev.map(u => u.id === selectedUserForBlock.id ? { ...u, status: 'blocked' } : u)
                    );
                    setLogsList(prev => [
                      `[ADMIN] Blocked user: ${selectedUserForBlock.name}`,
                      ...prev
                    ]);
                    setSelectedUserForBlock(null);
                  }
                }}
              >
                <Text style={styles.modalLogoutText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>

      {/* Unblock Confirmation Modal */}
      <Modal
        visible={selectedUserForUnblock !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedUserForUnblock(null)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <CheckCircle2 size={48} color={Colors.success} style={{ marginBottom: Spacing.md, alignSelf: 'center' }} />
            <Text style={styles.modalTitle}>Unblock this user?</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to unblock {selectedUserForUnblock?.name}? They will regain active safety tracking permissions.
            </Text>
            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setSelectedUserForUnblock(null)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalLogoutBtn, { backgroundColor: Colors.success }]} 
                onPress={() => {
                  if (selectedUserForUnblock) {
                    setUsersList(prev => 
                      prev.map(u => u.id === selectedUserForUnblock.id ? { ...u, status: 'active' } : u)
                    );
                    setLogsList(prev => [
                      `[ADMIN] Unblocked user: ${selectedUserForUnblock.name}`,
                      ...prev
                    ]);
                    setSelectedUserForUnblock(null);
                  }
                }}
              >
                <Text style={styles.modalLogoutText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>

      {/* View Tip Details Modal */}
      <Modal
        visible={selectedTipForView !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedTipForView(null)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>🛡 Safety Tip Details</Text>
            {selectedTipForView && (
              <View style={styles.profileDetailsContent}>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Title:</Text>
                  <Text style={styles.profileDetailValue}>{selectedTipForView.title}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Category:</Text>
                  <Text style={styles.profileDetailValue}>{selectedTipForView.category}</Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Description:</Text>
                  <Text style={styles.profileDetailValue}>{selectedTipForView.description}</Text>
                </View>
                {selectedTipForView.imageUri ? (
                  <View style={styles.profileDetailRow}>
                    <Text style={styles.profileDetailLabel}>Image URL:</Text>
                    <Text style={styles.profileDetailValue}>{selectedTipForView.imageUri}</Text>
                  </View>
                ) : null}
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Status:</Text>
                  <Text style={[
                    styles.profileDetailValue,
                    selectedTipForView.status === 'Published' ? { color: Colors.success, fontWeight: '700' } : { color: Colors.warning, fontWeight: '700' }
                  ]}>
                    {selectedTipForView.status}
                  </Text>
                </View>
                <View style={styles.profileDetailRow}>
                  <Text style={styles.profileDetailLabel}>Last Updated:</Text>
                  <Text style={styles.profileDetailValue}>{selectedTipForView.lastUpdated}</Text>
                </View>
              </View>
            )}
            <TouchableOpacity style={[styles.modalCancelBtn, { marginTop: Spacing.md }]} onPress={() => setSelectedTipForView(null)}>
              <Text style={styles.modalCancelText}>Close</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>

      {/* Delete Tip Confirmation Modal */}
      <Modal
        visible={selectedTipForDelete !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedTipForDelete(null)}
      >
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <AlertTriangle size={48} color={Colors.sos} style={{ marginBottom: Spacing.md, alignSelf: 'center' }} />
            <Text style={styles.modalTitle}>Delete this safety tip?</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to delete &quot;{selectedTipForDelete?.title}&quot;? This tip will be permanently removed from live devices.
            </Text>
            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setSelectedTipForDelete(null)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalLogoutBtn, { backgroundColor: Colors.sos }]}
                onPress={() => {
                  if (selectedTipForDelete) {
                    setTipsList(prev => prev.filter(t => t.id !== selectedTipForDelete.id));
                    addLog(`[TIPS] Deleted safety tip: "${selectedTipForDelete.title}"`);
                    setSelectedTipForDelete(null);
                  }
                }}
              >
                <Text style={styles.modalLogoutText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: 'row',
  },
  // Responsive sidebar layouts
  desktopSidebar: {
    width: 260,
    backgroundColor: '#0F172A',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    height: '100%',
  },
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
  mobileDrawer: {
    width: 290,
    height: '100%',
    backgroundColor: '#0F172A',
    ...Shadows.large,
    elevation: 20,
    position: 'relative',
  },
  drawerCloseBtn: {
    position: 'absolute',
    right: Spacing.md,
    top: Platform.OS === 'ios' ? 54 : 18,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
    zIndex: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // Sidebar items
  sidebarContainer: {
    flex: 1,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingRight: 46,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
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
  menuScrollView: {
    flex: 1,
  },
  menuList: {
    paddingHorizontal: Spacing.sm,
    gap: Spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.medium,
  },
  menuItemActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
  },
  menuIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
  },
  menuIconInactive: {
    backgroundColor: 'transparent',
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
    paddingHorizontal: Spacing.sm - 2,
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
  // Top Header bar
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md - 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'space-between',
    minHeight: 70,
    zIndex: 1000,
    elevation: 10,
  },
  topHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuToggleBtn: {
    marginRight: Spacing.md,
    padding: Spacing.xs,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.heading,
  },
  topHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  topActionIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.sos,
  },
  // Content View
  contentScroll: {
    padding: Spacing.lg,
  },
  tabContentContainer: {
    gap: Spacing.lg,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.xs,
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
  // User Management Tab Headers & Search
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

  // Modal Details styling
  profileDetailsContent: {
    gap: Spacing.sm,
    marginVertical: Spacing.md,
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: Radius.medium,
  },
  profileDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  profileDetailLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.heading,
  },
  profileDetailValue: {
    fontSize: 13,
    color: Colors.body,
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
    marginLeft: Spacing.md,
  },
  // Safety tips database
  addTipCard: {
    backgroundColor: Colors.white,
  },
  addTipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.body,
    marginBottom: 6,
  },
  tipTextInput: {
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
    height: 44,
    marginBottom: Spacing.md,
    fontSize: 14,
    color: Colors.heading,
  },
  tipTextMulti: {
    height: 80,
    textAlignVertical: 'top',
    paddingVertical: Spacing.sm,
  },
  catButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  catBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md - 2,
    height: 36,
    borderRadius: Radius.circle,
    borderWidth: 1,
    backgroundColor: Colors.white,
    gap: 6,
  },
  catBtnSelected: {
    backgroundColor: Colors.primaryLight,
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  catBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.body,
  },
  catBtnTextActive: {
    color: Colors.primary,
  },
  submitTipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: Radius.medium,
    backgroundColor: Colors.primary,
    gap: Spacing.sm,
  },
  submitTipText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  tipsListContainer: {
    gap: Spacing.md,
  },
  tipListItemCard: {
    backgroundColor: Colors.white,
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
  tipDateText: {
    fontSize: 11,
    color: Colors.secondary,
    fontWeight: '500',
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
  tipItemFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
    alignItems: 'flex-end',
  },
  deleteTipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteTipText: {
    color: Colors.sos,
    fontSize: 12,
    fontWeight: '600',
  },
  // SOS incident tab
  sosIncidentList: {
    gap: Spacing.md,
  },
  sosLogCard: {
    backgroundColor: Colors.white,
  },
  sosLogCardActive: {
    borderColor: Colors.sos,
    borderWidth: 1.5,
  },
  sosLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sosLogUserMeta: {},
  sosLogUser: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
  },
  sosLogTime: {
    fontSize: 11,
    color: Colors.secondary,
    marginTop: 2,
    fontWeight: '500',
  },
  sosLogBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.small,
  },
  sosLogBadgeActive: {
    backgroundColor: Colors.dangerBg,
  },
  sosLogBadgeResolved: {
    backgroundColor: Colors.successLight,
  },
  sosLogBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sosLogBadgeTextActive: {
    color: Colors.sos,
  },
  sosLogBadgeTextResolved: {
    color: Colors.success,
  },
  sosDetailsGrid: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: Radius.medium,
    marginBottom: Spacing.md,
  },
  sosDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sosDetailVal: {
    fontSize: 13,
    color: Colors.body,
    flex: 1,
  },
  sosLogActionRow: {},
  sosLogResolveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: Radius.medium,
    backgroundColor: Colors.success,
    gap: Spacing.xs,
  },
  sosLogResolveText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  // Restructured Settings & Dropdown Styles
  settingsSectionCard: {
    backgroundColor: Colors.white,
    padding: 0,
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dropdownHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dropdownHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
  },
  dropdownContent: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
  },
  collapsibleOptionSection: {
    paddingVertical: Spacing.sm,
  },
  collapsibleSecTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.sm,
  },
  collapsibleSecDesc: {
    fontSize: 12,
    color: Colors.secondary,
    marginBottom: Spacing.md,
  },
  optionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
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
  profileSwitchList: {
    gap: Spacing.sm,
  },
  profileSwitchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.medium,
    gap: Spacing.md,
  },
  profileSwitchRowActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '10',
  },
  profileSwitchAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSwitchAvatarText: {
    fontSize: 13,
    fontWeight: '700',
  },
  profileSwitchName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.heading,
  },
  profileSwitchRole: {
    fontSize: 11,
    color: Colors.secondary,
    marginTop: 2,
  },
  adminProfileSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  avatarBig: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBigText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  adminProfileName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.heading,
  },
  adminProfileRoleText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  adminProfileEmailText: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 2,
  },
  // Broadcast Notification Modal layout
  broadcastModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.heading,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  broadcastModalDesc: {
    fontSize: 12,
    color: Colors.body,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  broadcastInput: {
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    height: 100,
    fontSize: 14,
    color: Colors.heading,
    textAlignVertical: 'top',
    marginBottom: Spacing.lg,
  },
  // Confirm logout Modal
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
    marginBottom: Spacing.sm,
  },
  modalSubtitle: {
    fontSize: 13,
    color: Colors.body,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.lg,
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modalCancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    color: Colors.heading,
    fontSize: 14,
    fontWeight: '600',
  },
  modalLogoutBtn: {
    flex: 1,
    height: 44,
    borderRadius: Radius.medium,
    backgroundColor: Colors.sos,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  modalLogoutText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
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
  // Submenu Styles
  submenuContainer: {
    paddingLeft: Spacing.md,
    marginTop: 2,
    gap: 2,
    marginBottom: Spacing.xs,
  },
  submenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm - 2,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.small,
    marginLeft: Spacing.md,
    gap: Spacing.sm,
  },
  submenuItemActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  submenuText: {
    color: Colors.disabled,
    fontSize: 13,
    fontWeight: '500',
  },
  submenuTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  // Top Header Profile Dropdown
  headerProfileDropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: Radius.small,
    borderWidth: 1.5,
    borderColor: Colors.border,
    width: 140,
    padding: Spacing.xs,
    ...Shadows.medium,
    zIndex: 10000,
    elevation: 100,
  },
  headerDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm - 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.small,
  },
  headerDropdownText: {
    fontSize: 13,
    color: Colors.heading,
    fontWeight: '600',
  },
  headerDropdownDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
});
