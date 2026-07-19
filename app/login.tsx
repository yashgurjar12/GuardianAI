import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, Shield, User } from 'lucide-react-native';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import AIAssistant from '@/components/ui/AIAssistant';
import AnimatedInput from '@/components/ui/AnimatedInput';
import PremiumButton from '@/components/ui/PremiumButton';
import { Colors, Spacing, Radius } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email.trim().toLowerCase() === 'admin@guardian.ai') {
      router.replace('/admin');
    } else {
      router.replace('/permissions');
    }
  };

  const handleQuickLogin = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setEmail('admin@guardian.ai');
      setPassword('admin123');
      setTimeout(() => {
        router.replace('/admin');
      }, 100);
    } else {
      setEmail('user@guardian.ai');
      setPassword('user123');
      setTimeout(() => {
        router.replace('/permissions');
      }, 100);
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
            {/* AI Assistant mascot */}
            <AIAssistant />

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSubtitle}>
                Sign in to continue your safety journey
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <AnimatedInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<Mail size={20} />}
              />

              {/* Password Input */}
              <AnimatedInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                icon={<Lock size={20} />}
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

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Premium Animated Login Button */}
              <PremiumButton title="Sign In" onPress={handleLogin} />

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Sign In wrapper */}
              <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* Quick Testing Logins */}
              <View style={styles.dummyContainer}>
                <Text style={styles.dummyTitle}>Quick Testing Logins</Text>
                <View style={styles.dummyButtons}>
                  <TouchableOpacity
                    style={[styles.dummyButton, styles.dummyAdmin]}
                    onPress={() => handleQuickLogin('admin')}
                  >
                    <Shield size={16} color={Colors.white} />
                    <Text style={styles.dummyAdminText}>Login as Admin</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.dummyButton, styles.dummyUser]}
                    onPress={() => handleQuickLogin('user')}
                  >
                    <User size={16} color={Colors.primary} />
                    <Text style={styles.dummyUserText}>Login as User</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Sign Up Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.heading,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: Colors.secondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  form: {
    marginTop: Spacing.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    fontSize: 13,
    color: Colors.secondary,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
    marginRight: Spacing.sm,
  },
  googleText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.heading,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  footerText: {
    fontSize: 14,
    color: Colors.secondary,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  dummyContainer: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
  },
  dummyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dummyButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
    justifyContent: 'space-between',
  },
  dummyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    flex: 1,
    height: 48,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
  },
  dummyAdmin: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dummyAdminText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  dummyUser: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  dummyUserText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
