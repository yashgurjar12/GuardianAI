import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  Home,
  Building,
  PhoneCall,
  Check,
  Heart,
  ShieldCheck,
} from 'lucide-react-native';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import AnimatedInput from '@/components/ui/AnimatedInput';
import PremiumButton from '@/components/ui/PremiumButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import DatePickerModal from '@/components/ui/DatePickerModal';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';

export default function SignupScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 640;
  const isNarrowMobile = width < 380;

  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1: Basic Information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Female');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Step 2: Safety Information
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [relationship, setRelationship] = useState('Mother');
  const [customRelationship, setCustomRelationship] = useState('');

  const genderOptions = [
    { label: 'Female', icon: '🚺' },
    { label: 'Male', icon: '🚹' },
    { label: 'Other', icon: '⚧' },
  ];

  const relationshipOptions = [
    { label: 'Mother', icon: '👩' },
    { label: 'Father', icon: '👨' },
    { label: 'Brother', icon: '👦' },
    { label: 'Sister', icon: '👧' },
    { label: 'Friend', icon: '🤝' },
    { label: 'Other', icon: '✨' },
  ];

  // Helper to clear error when user types in a field
  const updateField = (field: string, value: string, setter: (v: string) => void) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Full Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    if (!phone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (phone.trim().length < 10) {
      newErrors.phone = 'Mobile Number must be at least 10 digits';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
    }
    if (!gender) {
      newErrors.gender = 'Please select your Gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!address.trim()) {
      newErrors.address = 'Home Address is required';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!emergencyName.trim()) {
      newErrors.emergencyName = 'Emergency Contact Name is required';
    }
    if (!emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency Contact Number is required';
    } else if (emergencyPhone.trim().length < 10) {
      newErrors.emergencyPhone = 'Emergency Contact Number must be at least 10 digits';
    }
    if (!relationship) {
      newErrors.relationship = 'Please select a Relationship';
    }
    if (relationship === 'Other' && !customRelationship.trim()) {
      newErrors.customRelationship = 'Please specify your relationship';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setErrors({});
      setStep(2);
    }
  };

  const handleSignup = () => {
    if (validateStep2()) {
      setErrors({});
      router.replace('/permissions');
    }
  };

  const handleBack = () => {
    setErrors({});
    if (step === 2) {
      setStep(1);
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/login');
      }
    }
  };

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Centered Max-Width Wrapper for Responsive Devices */}
            <View style={[styles.mainWrapper, isDesktop && styles.mainWrapperDesktop]}>
              {/* Top Bar with Back Button & Step Badge Header */}
              <View style={styles.topRow}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleBack}
                  activeOpacity={0.8}
                >
                  <ArrowLeft size={20} color={Colors.heading} />
                </TouchableOpacity>
                <View style={styles.stepBadgeHeader}>
                  <ShieldCheck size={14} color={Colors.primary} style={{ marginRight: 4 }} />
                  <Text style={styles.stepBadgeText}>
                    Step {step} of 2 ({step === 1 ? '50%' : '100%'})
                  </Text>
                </View>
              </View>

              {/* Title Header */}
              <View style={styles.header}>
                <Text style={styles.title}>
                  {step === 1 ? 'Basic Information' : 'Safety Information'}
                </Text>
                <Text style={styles.subtitle}>
                  {step === 1
                    ? 'Enter your personal details to create your secure account'
                    : 'Add emergency contact details for instant protection'}
                </Text>
              </View>

              {/* Responsive Stepper Bar */}
              <View style={styles.stepperContainer}>
                <TouchableOpacity
                  style={[
                    styles.stepTab,
                    step === 1 && styles.stepTabActive,
                    step > 1 && styles.stepTabDone,
                  ]}
                  onPress={() => {
                    setErrors({});
                    setStep(1);
                  }}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.stepBadgeCircle,
                      step === 1 && styles.stepBadgeCircleActive,
                      step > 1 && styles.stepBadgeCircleDone,
                    ]}
                  >
                    {step > 1 ? (
                      <Check size={14} color={Colors.white} />
                    ) : (
                      <Text
                        style={[
                          styles.stepBadgeNumber,
                          step === 1 && styles.stepBadgeNumberActive,
                        ]}
                      >
                        1
                      </Text>
                    )}
                  </View>
                  <View style={styles.stepLabelBox}>
                    <Text style={styles.stepLabelTitle}>Basic Info</Text>
                    {!isNarrowMobile && (
                      <Text style={styles.stepLabelSub}>Personal Details</Text>
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.stepDividerLine}>
                  <View
                    style={[
                      styles.stepDividerFill,
                      { width: step === 2 ? '100%' : '0%' },
                    ]}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.stepTab,
                    step === 2 && styles.stepTabActive,
                  ]}
                  onPress={() => {
                    if (validateStep1()) {
                      setStep(2);
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.stepBadgeCircle,
                      step === 2 && styles.stepBadgeCircleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepBadgeNumber,
                        step === 2 && styles.stepBadgeNumberActive,
                      ]}
                    >
                      2
                    </Text>
                  </View>
                  <View style={styles.stepLabelBox}>
                    <Text style={styles.stepLabelTitle}>Safety Info</Text>
                    {!isNarrowMobile && (
                      <Text style={styles.stepLabelSub}>Emergency Contact</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Step 1 Form */}
              {step === 1 && (
                <View style={styles.cardContainer}>
                  <Text style={styles.cardSectionTitle}>👤 Personal Details</Text>

                  {isDesktop ? (
                    <>
                      {/* Responsive 2-Column Row for Desktop/Tablet */}
                      <View style={styles.formRow}>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Full Name *"
                            value={name}
                            onChangeText={(val) => updateField('name', val, setName)}
                            autoCapitalize="words"
                            icon={<User size={20} />}
                            error={errors.name}
                          />
                        </View>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Email Address *"
                            value={email}
                            onChangeText={(val) => updateField('email', val, setEmail)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon={<Mail size={20} />}
                            error={errors.email}
                          />
                        </View>
                      </View>

                      <View style={styles.formRow}>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Mobile Number *"
                            value={phone}
                            onChangeText={(val) => updateField('phone', val, setPhone)}
                            keyboardType="phone-pad"
                            icon={<Phone size={20} />}
                            error={errors.phone}
                          />
                        </View>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Date of Birth (DD/MM/YYYY) *"
                            value={dob}
                            onChangeText={(val) => updateField('dob', val, setDob)}
                            icon={<Calendar size={20} />}
                            error={errors.dob}
                            onPress={() => setShowDatePicker(true)}
                            rightElement={
                              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ padding: 4 }}>
                                <Calendar size={18} color={Colors.primary} />
                              </TouchableOpacity>
                            }
                          />
                        </View>
                      </View>

                      <View style={styles.formRow}>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Password *"
                            value={password}
                            onChangeText={(val) => updateField('password', val, setPassword)}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            icon={<Lock size={20} />}
                            error={errors.password}
                            rightElement={
                              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                  <EyeOff size={20} color={Colors.secondary} />
                                ) : (
                                  <Eye size={20} color={Colors.secondary} />
                                )}
                              </TouchableOpacity>
                            }
                          />
                        </View>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Confirm Password *"
                            value={confirmPassword}
                            onChangeText={(val) =>
                              updateField('confirmPassword', val, setConfirmPassword)
                            }
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                            icon={<Lock size={20} />}
                            error={errors.confirmPassword}
                            rightElement={
                              <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff size={20} color={Colors.secondary} />
                                ) : (
                                  <Eye size={20} color={Colors.secondary} />
                                )}
                              </TouchableOpacity>
                            }
                          />
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      {/* Standard 1-Column Stack for Mobile */}
                      <AnimatedInput
                        label="Full Name *"
                        value={name}
                        onChangeText={(val) => updateField('name', val, setName)}
                        autoCapitalize="words"
                        icon={<User size={20} />}
                        error={errors.name}
                      />

                      <AnimatedInput
                        label="Email Address *"
                        value={email}
                        onChangeText={(val) => updateField('email', val, setEmail)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon={<Mail size={20} />}
                        error={errors.email}
                      />

                      <AnimatedInput
                        label="Mobile Number *"
                        value={phone}
                        onChangeText={(val) => updateField('phone', val, setPhone)}
                        keyboardType="phone-pad"
                        icon={<Phone size={20} />}
                        error={errors.phone}
                      />

                      <AnimatedInput
                        label="Password *"
                        value={password}
                        onChangeText={(val) => updateField('password', val, setPassword)}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        icon={<Lock size={20} />}
                        error={errors.password}
                        rightElement={
                          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <EyeOff size={20} color={Colors.secondary} />
                            ) : (
                              <Eye size={20} color={Colors.secondary} />
                            )}
                          </TouchableOpacity>
                        }
                      />

                      <AnimatedInput
                        label="Confirm Password *"
                        value={confirmPassword}
                        onChangeText={(val) =>
                          updateField('confirmPassword', val, setConfirmPassword)
                        }
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        icon={<Lock size={20} />}
                        error={errors.confirmPassword}
                        rightElement={
                          <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} color={Colors.secondary} />
                            ) : (
                              <Eye size={20} color={Colors.secondary} />
                            )}
                          </TouchableOpacity>
                        }
                      />

                      <AnimatedInput
                        label="Date of Birth (DD/MM/YYYY) *"
                        value={dob}
                        onChangeText={(val) => updateField('dob', val, setDob)}
                        icon={<Calendar size={20} />}
                        error={errors.dob}
                        onPress={() => setShowDatePicker(true)}
                        rightElement={
                          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ padding: 4 }}>
                            <Calendar size={18} color={Colors.primary} />
                          </TouchableOpacity>
                        }
                      />
                    </>
                  )}

                  {/* Gender Selector */}
                  <View style={styles.selectorWrapper}>
                    <Text style={styles.selectorTitle}>🚺 Gender *</Text>
                    <View style={styles.genderRow}>
                      {genderOptions.map((g) => {
                        const isSelected = gender === g.label;
                        return (
                          <TouchableOpacity
                            key={g.label}
                            style={[
                              styles.genderChip,
                              isSelected && styles.genderChipSelected,
                            ]}
                            onPress={() => {
                              setGender(g.label);
                              if (errors.gender) {
                                setErrors((prev) => ({ ...prev, gender: '' }));
                              }
                            }}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.chipEmoji}>{g.icon}</Text>
                            <Text
                              style={[
                                styles.chipText,
                                isSelected && styles.chipTextSelected,
                              ]}
                            >
                              {g.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    {!!errors.gender && (
                      <Text style={styles.inlineErrorText}>{errors.gender}</Text>
                    )}
                  </View>

                  {/* Next Step Button */}
                  <View style={{ marginTop: Spacing.md }}>
                    <PremiumButton
                      title="Next: Safety Information"
                      onPress={handleNextStep}
                    />
                  </View>
                </View>
              )}

              {/* Step 2 Form */}
              {step === 2 && (
                <View style={styles.cardContainer}>
                  <Text style={styles.cardSectionTitle}>🏠 Address Details</Text>

                  {isDesktop ? (
                    <>
                      <View style={styles.formRow}>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Home Address *"
                            value={address}
                            onChangeText={(val) => updateField('address', val, setAddress)}
                            autoCapitalize="words"
                            icon={<Home size={20} />}
                            error={errors.address}
                          />
                        </View>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="City *"
                            value={city}
                            onChangeText={(val) => updateField('city', val, setCity)}
                            autoCapitalize="words"
                            icon={<Building size={20} />}
                            error={errors.city}
                          />
                        </View>
                      </View>

                      <Text style={[styles.cardSectionTitle, { marginTop: Spacing.sm }]}>
                        👨‍👩‍👧 Emergency Contact
                      </Text>

                      <View style={styles.formRow}>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Emergency Contact Name *"
                            value={emergencyName}
                            onChangeText={(val) =>
                              updateField('emergencyName', val, setEmergencyName)
                            }
                            autoCapitalize="words"
                            icon={<User size={20} />}
                            error={errors.emergencyName}
                          />
                        </View>
                        <View style={styles.formCol}>
                          <AnimatedInput
                            label="Emergency Contact Number *"
                            value={emergencyPhone}
                            onChangeText={(val) =>
                              updateField('emergencyPhone', val, setEmergencyPhone)
                            }
                            keyboardType="phone-pad"
                            icon={<PhoneCall size={20} />}
                            error={errors.emergencyPhone}
                          />
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      <AnimatedInput
                        label="Home Address *"
                        value={address}
                        onChangeText={(val) => updateField('address', val, setAddress)}
                        autoCapitalize="words"
                        icon={<Home size={20} />}
                        error={errors.address}
                      />

                      <AnimatedInput
                        label="City *"
                        value={city}
                        onChangeText={(val) => updateField('city', val, setCity)}
                        autoCapitalize="words"
                        icon={<Building size={20} />}
                        error={errors.city}
                      />

                      <Text style={[styles.cardSectionTitle, { marginTop: Spacing.md }]}>
                        👨‍👩‍👧 Emergency Contact
                      </Text>

                      <AnimatedInput
                        label="Emergency Contact Name *"
                        value={emergencyName}
                        onChangeText={(val) =>
                          updateField('emergencyName', val, setEmergencyName)
                        }
                        autoCapitalize="words"
                        icon={<User size={20} />}
                        error={errors.emergencyName}
                      />

                      <AnimatedInput
                        label="Emergency Contact Number *"
                        value={emergencyPhone}
                        onChangeText={(val) =>
                          updateField('emergencyPhone', val, setEmergencyPhone)
                        }
                        keyboardType="phone-pad"
                        icon={<PhoneCall size={20} />}
                        error={errors.emergencyPhone}
                      />
                    </>
                  )}

                  {/* Relationship Selector Grid */}
                  <View style={styles.selectorWrapper}>
                    <Text style={styles.selectorTitle}>
                      🤝 Relationship *
                    </Text>
                    <View style={styles.relationshipGrid}>
                      {relationshipOptions.map((rel) => {
                        const isSelected = relationship === rel.label;
                        return (
                          <TouchableOpacity
                            key={rel.label}
                            style={[
                              styles.relChip,
                              { minWidth: isDesktop ? '30%' : '47%' },
                              isSelected && styles.relChipSelected,
                            ]}
                            onPress={() => {
                              setRelationship(rel.label);
                              if (errors.relationship) {
                                setErrors((prev) => ({ ...prev, relationship: '' }));
                              }
                            }}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.chipEmoji}>{rel.icon}</Text>
                            <Text
                              style={[
                                styles.chipText,
                                isSelected && styles.chipTextSelected,
                              ]}
                            >
                              {rel.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    {!!errors.relationship && (
                      <Text style={styles.inlineErrorText}>{errors.relationship}</Text>
                    )}
                  </View>

                  {/* Custom Relationship Input Field when 'Other' is chosen */}
                  {relationship === 'Other' && (
                    <View style={styles.customRelContainer}>
                      <AnimatedInput
                        label="Specify Relationship *"
                        value={customRelationship}
                        onChangeText={(val) =>
                          updateField('customRelationship', val, setCustomRelationship)
                        }
                        autoCapitalize="words"
                        icon={<Heart size={20} />}
                        error={errors.customRelationship}
                      />
                    </View>
                  )}

                  {/* Terms notice */}
                  <Text style={styles.terms}>
                    By creating an account, you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>

                  {/* Action Buttons */}
                  <View style={styles.actionRow}>
                    <SecondaryButton
                      title="Back"
                      onPress={() => setStep(1)}
                      style={styles.backStepButton}
                      icon={<ArrowLeft size={18} color={Colors.primary} />}
                    />
                    <View style={{ flex: 1 }}>
                      <PremiumButton
                        title="Create Account"
                        onPress={handleSignup}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Login Link */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    } else {
                      router.replace('/login');
                    }
                  }}
                >
                  <Text style={styles.loginText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Interactive Date Picker Modal */}
          <DatePickerModal
            visible={showDatePicker}
            onClose={() => setShowDatePicker(false)}
            onSelectDate={(dateStr) => updateField('dob', dateStr, setDob)}
            initialDate={dob}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
  },
  mainWrapper: {
    width: '100%',
    maxWidth: 640,
  },
  mainWrapperDesktop: {
    paddingVertical: Spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.small,
  },
  stepBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.circle,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  header: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.heading,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.secondary,
    marginTop: 4,
    lineHeight: 18,
  },
  // Stepper Bar UI
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.large,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.small,
  },
  stepTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.medium,
  },
  stepTabActive: {
    backgroundColor: Colors.primaryLight,
  },
  stepTabDone: {
    backgroundColor: '#F0FDF4',
  },
  stepBadgeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.xs,
  },
  stepBadgeCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepBadgeCircleDone: {
    backgroundColor: Colors.success,
  },
  stepBadgeNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.secondary,
  },
  stepBadgeNumberActive: {
    color: Colors.white,
  },
  stepLabelBox: {
    flex: 1,
  },
  stepLabelTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.heading,
  },
  stepLabelSub: {
    fontSize: 10,
    color: Colors.secondary,
    marginTop: 1,
  },
  stepDividerLine: {
    width: 24,
    height: 3,
    backgroundColor: Colors.border,
    borderRadius: 1.5,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  stepDividerFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  // Form Card Container
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadows.medium,
  },
  cardSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.heading,
    marginBottom: Spacing.sm,
  },
  // Responsive Form Grid Rows
  formRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  formCol: {
    flex: 1,
  },
  // Selectors
  selectorWrapper: {
    marginVertical: Spacing.sm,
  },
  selectorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.heading,
    marginBottom: Spacing.xs + 2,
  },
  genderRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  genderChip: {
    flex: 1,
    height: 46,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  genderChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  relationshipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  relChip: {
    flex: 1,
    height: 44,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  relChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  chipEmoji: {
    fontSize: 15,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
  },
  chipTextSelected: {
    color: Colors.primary,
  },
  inlineErrorText: {
    fontSize: 12,
    color: Colors.sos,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '500',
  },
  customRelContainer: {
    marginTop: Spacing.xs,
  },
  // Terms & Actions
  terms: {
    fontSize: 12,
    color: Colors.secondary,
    lineHeight: 18,
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  backStepButton: {
    width: 90,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  footerText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});
