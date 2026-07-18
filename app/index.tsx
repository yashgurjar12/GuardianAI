import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield } from 'lucide-react-native';
import { Colors, Spacing } from '@/constants/theme';

export default function SplashScreenPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // Animations
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.8)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslate = useRef(new Animated.Value(15)).current;

  // Particle values (5 floating points)
  const particles = Array.from({ length: 8 }).map(() => ({
    x: Math.random() * width,
    y: new Animated.Value(height * 0.7),
    opacity: new Animated.Value(0),
    scale: Math.random() * 0.6 + 0.4,
  }));

  useEffect(() => {
    // 1. Logo Scale and Spring Bounce
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 40,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Glow pulsing behind the shield
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.4,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.4,
            duration: 750,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // 3. Tagline entry after logo spring finishes
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(taglineTranslate, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 800);

    // 4. Floating particles rising
    particles.forEach((p, idx) => {
      const delay = idx * 250;
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            // Reset position, fade in and float up
            Animated.parallel([
              Animated.timing(p.opacity, {
                toValue: 0.6,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.timing(p.y, {
                toValue: height * 0.2,
                duration: 4000,
                useNativeDriver: true,
              }),
            ]),
            // Fade out at top
            Animated.timing(p.opacity, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
            // Reset position
            Animated.timing(p.y, {
              toValue: height * 0.7,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, delay);
    });

    // 5. Navigate to login screen
    const navigationTimer = setTimeout(() => {
      router.replace('/login');
    }, 4500);

    return () => clearTimeout(navigationTimer);
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark, '#0B0F19']}
      style={styles.container}
    >
      {/* Floating Particles background layer */}
      {particles.map((p, idx) => (
        <Animated.View
          key={idx}
          style={[
            styles.particle,
            {
              left: p.x,
              transform: [{ translateY: p.y }, { scale: p.scale }],
              opacity: p.opacity,
            },
          ]}
        />
      ))}

      {/* Main Logo & Glow Rings */}
      <View style={styles.centerContainer}>
        {/* Animated Glow layer */}
        <Animated.View
          style={[
            styles.glowRing,
            {
              transform: [{ scale: glowScale }],
              opacity: glowOpacity,
            },
          ]}
        />

        {/* Shield Logo with Scale Anim */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <Shield size={44} color={Colors.white} strokeWidth={2.5} />
          </View>
          <Text style={styles.title}>GuardianAI</Text>
        </Animated.View>
      </View>

      {/* Tagline Footer with slide up */}
      <Animated.View
        style={[
          styles.taglineContainer,
          {
            opacity: taglineOpacity,
            transform: [{ translateY: taglineTranslate }],
          },
        ]}
      >
        <Text style={styles.tagline}>Your Intelligent Safety Companion</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>Smart Protection. Always With You.</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 1,
  },
  glowRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#38BDF8',
    filter: 'blur(30px)', // Adds blur if platform supports it (reverts nicely if unsupported)
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
  },
  taglineContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
  },
  tagline: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.85)',
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: Spacing.md,
    borderRadius: 1,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '500',
  },
});
