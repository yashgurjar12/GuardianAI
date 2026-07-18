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
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react-native';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import AnimatedInput from '@/components/ui/AnimatedInput';
import PremiumButton from '@/components/ui/PremiumButton';
import { Colors, Spacing, Radius } from '@/constants/theme';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    router.replace('/permissions');
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
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={22} color={Colors.heading} />
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join GuardianAI for a safer tomorrow
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <AnimatedInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                icon={<User size={20} />}
              />

              <AnimatedInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<Mail size={20} />}
              />

              <AnimatedInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                icon={<Phone size={20} />}
              />

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

              {/* Terms */}
              <Text style={styles.terms}>
                By creating an account, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>

              {/* Premium Sign Up Button */}
              <PremiumButton title="Create Account" onPress={handleSignup} />
            </View>

            {/* Login Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.loginText}>Sign In</Text>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.heading,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    marginTop: Spacing.xs,
  },
  form: {},
  terms: {
    fontSize: 12,
    color: Colors.secondary,
    lineHeight: 18,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '500',
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
  loginText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
