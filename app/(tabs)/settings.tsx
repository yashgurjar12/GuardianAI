import Card from '@/components/ui/Card';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SettingTile from '@/components/ui/SettingTile';
import AppTopbar from '@/components/ui/AppTopbar';
import AnimatedInput from '@/components/ui/AnimatedInput';
import { Colors, Radius, Shadows, Spacing } from '@/constants/theme';
import { useContacts } from '@/context/ContactsContext';
import { mockUser } from '@/constants/mockData';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {
  Bell,
  Brain,
  Clock,
  Info,
  Lock,
  Mail,
  MessageSquare,
  Moon,
  Navigation,
  Phone as PhoneIcon,
  Radio,
  Shield,
  ShieldCheck,
  UserPlus,
  Vibrate,
  Volume2,
  X,
  User,
  Eye,
  EyeOff,
  Check,
  Key,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Camera,
  Trash2,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const { contacts } = useContacts();

  // User Profile State
  const [userName, setUserName] = useState(mockUser.name);
  const [userEmail, setUserEmail] = useState(mockUser.email);
  const [userPhone, setUserPhone] = useState(mockUser.phone);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  // Modals state
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(userName);
  const [editEmail, setEditEmail] = useState(userEmail);
  const [editPhone, setEditPhone] = useState(userPhone);
  const [editAvatar, setEditAvatar] = useState<string | null>(userAvatar);

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Image Picker Handler
  const pickImage = async () => {
    if (Platform.OS === 'web') {
      try {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (uploadEvent) => {
              const result = uploadEvent.target?.result as string;
              setEditAvatar(result);
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      } catch (err) {
        console.error('Web image pick error:', err);
      }
    } else {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access photo library is required to select a profile photo!');
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          setEditAvatar(result.assets[0].uri);
        }
      } catch (err) {
        console.error('Image picker error:', err);
      }
    }
  };

  const removeImage = () => {
    setEditAvatar(null);
  };

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) return;
    setUserName(editName.trim());
    setUserEmail(editEmail.trim());
    setUserPhone(editPhone.trim());
    setUserAvatar(editAvatar);
    setEditProfileModalOpen(false);
    showToast('Profile updated successfully! 🎉');
  };

  const handleChangePassword = () => {
    setPasswordError('');
    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    // Success
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setChangePasswordModalOpen(false);
    showToast('Password updated successfully! 🔒');
  };

  const [settings, setSettings] = useState({
    pushNotifications: true,
    smsAlerts: true,
    emailAlerts: false,
    vibrationAlerts: true,
    autoActivateNight: false,
    fakeCallSchedule: false,
    silentSOS: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Topbar Header */}
        <AppTopbar title="GuardianAI" />

        {/* Toast Alert Banner */}
        {toastMessage && (
          <View style={styles.toastBanner}>
            <CheckCircle2 size={18} color={Colors.white} />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}

        {/* Hero Section (No Back Button) */}
        <View style={styles.heroSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pageTitle}>Settings</Text>
            <Text style={styles.pageSubtitle}>
              Customize profile details, safety preferences & system alerts
            </Text>
          </View>
        </View>

        {/* User Card Summary Banner */}
        <Card style={styles.userBannerCard}>
          <View style={styles.userBannerRow}>
            <View style={styles.avatarCircle}>
              {userAvatar ? (
                <Image source={{ uri: userAvatar }} style={styles.avatarImg} />
              ) : (
                <Text style={styles.avatarText}>
                  {userName.split(' ').map((n) => n[0]).join('')}
                </Text>
              )}
            </View>
            <View style={styles.userBannerInfo}>
              <Text style={styles.userBannerName}>{userName}</Text>
              <Text style={styles.userBannerEmail}>{userEmail}</Text>
              <Text style={styles.userBannerPhone}>{userPhone}</Text>
            </View>
          </View>
        </Card>

        {/* Account & Profile Section */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <User size={18} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Account & Profile</Text>
          </View>
          <Card style={{ paddingVertical: Spacing.xs }}>
            <SettingTile
              icon={<Edit3 size={20} color={Colors.primary} />}
              title="Edit Profile"
              subtitle="Update profile photo, full name, email & phone"
              onPress={() => {
                setEditName(userName);
                setEditEmail(userEmail);
                setEditPhone(userPhone);
                setEditAvatar(userAvatar);
                setEditProfileModalOpen(true);
              }}
            />
            <SettingTile
              icon={<Lock size={20} color={Colors.warning} />}
              title="Change Password"
              subtitle="Update your security login password"
              onPress={() => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setPasswordError('');
                setChangePasswordModalOpen(true);
              }}
            />
            <SettingTile
              icon={<Shield size={20} color={Colors.sos} />}
              title="Emergency Contacts"
              subtitle="Manage your trusted emergency contacts network"
              onPress={() => router.push('/(tabs)/contacts')}
            />
            <SettingTile
              icon={<Clock size={20} color={Colors.primary} />}
              title="History"
              subtitle="View past travel routes & emergency alerts log"
              onPress={() => router.push('/history')}
              isLast
            />
          </Card>
        </View>

        {/* Notifications Settings */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <Bell size={18} color={Colors.warning} />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          <Card style={{ paddingVertical: Spacing.xs }}>
            <SettingTile
              icon={<Bell size={20} color={Colors.primary} />}
              title="Push Notifications"
              subtitle="Alerts for risk level changes & safety updates"
              value={settings.pushNotifications}
              onToggle={() => toggle('pushNotifications')}
            />
            <SettingTile
              icon={<MessageSquare size={20} color={Colors.success} />}
              title="SMS Alerts to Contacts"
              subtitle="Send SMS with live link when SOS triggers"
              value={settings.smsAlerts}
              onToggle={() => toggle('smsAlerts')}
            />
            <SettingTile
              icon={<Mail size={20} color={Colors.secondary} />}
              title="Email Notifications"
              subtitle="Weekly safety summaries & status reports"
              value={settings.emailAlerts}
              onToggle={() => toggle('emailAlerts')}
              isLast
            />
          </Card>
        </View>

        {/* Safety Features */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <ShieldCheck size={18} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Safety Features</Text>
          </View>
          <Card style={{ paddingVertical: Spacing.xs }}>
            <SettingTile
              icon={<Vibrate size={20} color={Colors.sos} />}
              title="Vibration on SOS Alert"
              subtitle="Haptic feedback during emergency trigger"
              value={settings.vibrationAlerts}
              onToggle={() => toggle('vibrationAlerts')}
            />
            <SettingTile
              icon={<Moon size={20} color="#8B5CF6" />}
              title="Auto Night Protection"
              subtitle="Automatically increase monitoring after 10 PM"
              value={settings.autoActivateNight}
              onToggle={() => toggle('autoActivateNight')}
            />
            <SettingTile
              icon={<PhoneIcon size={20} color={Colors.primary} />}
              title="Scheduled Fake Call"
              subtitle="Enable quick exit fake call option"
              value={settings.fakeCallSchedule}
              onToggle={() => toggle('fakeCallSchedule')}
            />
            <SettingTile
              icon={<Radio size={20} color={Colors.sos} />}
              title="Silent SOS Mode"
              subtitle="Trigger SOS without playing loud alarm audio"
              value={settings.silentSOS}
              onToggle={() => toggle('silentSOS')}
              isLast
            />
          </Card>
        </View>

        {/* Account & App */}
        <View style={styles.section}>
          <View style={styles.sectionLabelRow}>
            <Lock size={18} color={Colors.secondary} />
            <Text style={styles.sectionTitle}>Account & App</Text>
          </View>
          <Card style={{ paddingVertical: Spacing.xs }}>
            <SettingTile
              icon={<Lock size={20} color={Colors.heading} />}
              title="Permissions"
              subtitle="Location, Contacts, Notifications & Camera"
              onPress={() => router.push('/permissions')}
            />
            <SettingTile
              icon={<Info size={20} color={Colors.primary} />}
              title="About GuardianAI"
              subtitle="Version 1.0.0 (Build 2026.07)"
              onPress={() => setAboutModalVisible(true)}
              isLast
            />
          </Card>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editProfileModalOpen}
        onRequestClose={() => setEditProfileModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setEditProfileModalOpen(false)}>
          <Pressable style={styles.formModalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeaderRow}>
              <View style={styles.modalHeaderTitleGroup}>
                <Edit3 size={20} color={Colors.primary} />
                <Text style={styles.modalTitle}>Edit Profile</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setEditProfileModalOpen(false)}
              >
                <X size={18} color={Colors.secondary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDesc}>
                Update your personal information and profile picture used for safety verification.
              </Text>

              {/* Profile Image Picker Section */}
              <View style={styles.avatarPickerSection}>
                <View style={styles.avatarPickerWrapper}>
                  {editAvatar ? (
                    <Image source={{ uri: editAvatar }} style={styles.avatarPickerImage} />
                  ) : (
                    <View style={styles.avatarPickerPlaceholder}>
                      <Text style={styles.avatarPickerInitials}>
                        {editName ? editName.split(' ').map((n) => n[0]).join('') : 'SJ'}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.cameraOverlayBtn}
                    onPress={pickImage}
                    activeOpacity={0.8}
                  >
                    <Camera size={14} color={Colors.white} />
                  </TouchableOpacity>
                </View>

                <View style={styles.avatarActionBtns}>
                  <TouchableOpacity
                    style={styles.changePhotoBtn}
                    onPress={pickImage}
                    activeOpacity={0.7}
                  >
                    <Camera size={14} color={Colors.primary} />
                    <Text style={styles.changePhotoText}>
                      {editAvatar ? 'Change Photo' : 'Add Photo'}
                    </Text>
                  </TouchableOpacity>
                  {editAvatar ? (
                    <TouchableOpacity
                      style={styles.removePhotoBtn}
                      onPress={removeImage}
                      activeOpacity={0.7}
                    >
                      <Trash2 size={14} color={Colors.sos} />
                      <Text style={styles.removePhotoText}>Remove</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>

              <AnimatedInput
                label="Full Name"
                value={editName}
                onChangeText={setEditName}
                icon={<User size={20} color={Colors.secondary} />}
              />

              <AnimatedInput
                label="Email Address"
                value={editEmail}
                onChangeText={setEditEmail}
                icon={<Mail size={20} color={Colors.secondary} />}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <AnimatedInput
                label="Phone Number"
                value={editPhone}
                onChangeText={setEditPhone}
                icon={<PhoneIcon size={20} color={Colors.secondary} />}
                keyboardType="phone-pad"
              />

              <View style={styles.formActionRow}>
                <TouchableOpacity
                  style={styles.cancelFormBtn}
                  onPress={() => setEditProfileModalOpen(false)}
                >
                  <Text style={styles.cancelFormText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveFormBtn}
                  onPress={handleSaveProfile}
                  activeOpacity={0.8}
                >
                  <Check size={18} color={Colors.white} />
                  <Text style={styles.saveFormText}>Save Profile</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalOpen}
        onRequestClose={() => setChangePasswordModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setChangePasswordModalOpen(false)}>
          <Pressable style={styles.formModalCard} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeaderRow}>
              <View style={styles.modalHeaderTitleGroup}>
                <Key size={20} color={Colors.warning} />
                <Text style={styles.modalTitle}>Change Password</Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setChangePasswordModalOpen(false)}
              >
                <X size={18} color={Colors.secondary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDesc}>
                Set a strong new password for your account to ensure your safety profile remains secure.
              </Text>

              {passwordError ? (
                <View style={styles.errorBanner}>
                  <AlertCircle size={16} color={Colors.sos} />
                  <Text style={styles.errorText}>{passwordError}</Text>
                </View>
              ) : null}

              {/* Current Password */}
              <AnimatedInput
                label="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                icon={<Lock size={20} color={Colors.secondary} />}
                secureTextEntry={!showCurrentPass}
                autoCapitalize="none"
                rightElement={
                  <TouchableOpacity onPress={() => setShowCurrentPass(!showCurrentPass)}>
                    {showCurrentPass ? (
                      <EyeOff size={18} color={Colors.secondary} />
                    ) : (
                      <Eye size={18} color={Colors.secondary} />
                    )}
                  </TouchableOpacity>
                }
              />

              {/* New Password */}
              <AnimatedInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                icon={<Lock size={20} color={Colors.secondary} />}
                secureTextEntry={!showNewPass}
                autoCapitalize="none"
                rightElement={
                  <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)}>
                    {showNewPass ? (
                      <EyeOff size={18} color={Colors.secondary} />
                    ) : (
                      <Eye size={18} color={Colors.secondary} />
                    )}
                  </TouchableOpacity>
                }
              />

              {/* Confirm Password */}
              <AnimatedInput
                label="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                icon={<Lock size={20} color={Colors.secondary} />}
                secureTextEntry={!showConfirmPass}
                autoCapitalize="none"
                rightElement={
                  <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass ? (
                      <EyeOff size={18} color={Colors.secondary} />
                    ) : (
                      <Eye size={18} color={Colors.secondary} />
                    )}
                  </TouchableOpacity>
                }
              />

              <View style={styles.formActionRow}>
                <TouchableOpacity
                  style={styles.cancelFormBtn}
                  onPress={() => setChangePasswordModalOpen(false)}
                >
                  <Text style={styles.cancelFormText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveFormBtn, { backgroundColor: Colors.primary }]}
                  onPress={handleChangePassword}
                  activeOpacity={0.8}
                >
                  <Check size={18} color={Colors.white} />
                  <Text style={styles.saveFormText}>Update Password</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* About Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutModalVisible}
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setAboutModalVisible(false)}>
          <Pressable style={styles.aboutModalCard} onPress={(e) => e.stopPropagation()}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setAboutModalVisible(false)}>
              <X size={20} color={Colors.secondary} />
            </TouchableOpacity>

            <View style={styles.appHeader}>
              <View style={styles.logoBadge}>
                <Shield size={32} color={Colors.white} />
              </View>
              <Text style={styles.appName}>GuardianAI</Text>
              <Text style={styles.versionBadge}>v1.0.0 • AI-Powered Women Safety System</Text>
              <Text style={styles.tagline}>Intelligent • Proactive • Always Guardian</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 300 }}>
              <View style={styles.aboutCardBox}>
                <Text style={styles.aboutDesc}>
                  GuardianAI is an advanced personal safety system using artificial intelligence to detect
                  route anomalies, monitor late-night travel, notify emergency contacts, and dispatch automated SOS alerts.
                </Text>
              </View>

              <Text style={styles.modalSectionTitle}>Key Capabilities</Text>
              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: Colors.primaryLight }]}>
                  <Brain size={18} color={Colors.primary} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>AI Digital Twin</Text>
                  <Text style={styles.featureSub}>Learns travel routines & flags anomalies</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: Colors.dangerBg }]}>
                  <Radio size={18} color={Colors.sos} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Hold-to-Activate SOS</Text>
                  <Text style={styles.featureSub}>Instant dispatch with SMS, GPS & audio</Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: Colors.successLight }]}>
                  <Navigation size={18} color={Colors.success} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Safe Route Mapping</Text>
                  <Text style={styles.featureSub}>Real-time lighting & CCTV safe navigation</Text>
                </View>
              </View>
            </ScrollView>

            <PrimaryButton title="Close" onPress={() => setAboutModalVisible(false)} style={{ marginTop: Spacing.md }} />
          </Pressable>
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
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  toastBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.medium,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  toastText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 13,
  },
  userBannerCard: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderColor: Colors.border,
  },
  userBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    overflow: 'hidden',
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
  avatarPickerSection: {
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  avatarPickerWrapper: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  avatarPickerImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2.5,
    borderColor: Colors.primary,
  },
  avatarPickerPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: Colors.primary,
  },
  avatarPickerInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
  },
  cameraOverlayBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    ...Shadows.small,
  },
  avatarActionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.circle,
    backgroundColor: Colors.primaryLight,
  },
  changePhotoText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  removePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.circle,
    backgroundColor: Colors.dangerBg,
  },
  removePhotoText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.sos,
  },
  userBannerInfo: {
    flex: 1,
  },
  userBannerName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.heading,
  },
  userBannerEmail: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
  userBannerPhone: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.heading,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  addText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  aboutModalCard: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.large,
    borderTopRightRadius: Radius.large,
    padding: Spacing.lg,
    maxHeight: '85%',
  },
  formModalCard: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.large,
    borderTopRightRadius: Radius.large,
    padding: Spacing.lg,
    maxHeight: '90%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  modalHeaderTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs + 2,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.heading,
  },
  modalDesc: {
    fontSize: 12,
    color: Colors.secondary,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs + 2,
    backgroundColor: Colors.dangerBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.small,
    marginBottom: Spacing.md,
  },
  errorText: {
    color: Colors.sos,
    fontSize: 12,
    fontWeight: '600',
  },
  formActionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  cancelFormBtn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelFormText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.heading,
  },
  saveFormBtn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.medium,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  saveFormText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.heading,
  },
  versionBadge: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '500',
    marginTop: 2,
  },
  tagline: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  aboutCardBox: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: Radius.medium,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aboutDesc: {
    fontSize: 13,
    color: Colors.body,
    lineHeight: 20,
  },
  modalSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.heading,
  },
  featureSub: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
});
