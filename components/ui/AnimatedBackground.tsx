import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';

export default function AnimatedBackground({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();

  // Blob 1: Top Right (Blue)
  const blob1X = useSharedValue(0);
  const blob1Y = useSharedValue(0);
  const blob1Scale = useSharedValue(1);

  // Blob 2: Bottom Left (Purple)
  const blob2X = useSharedValue(0);
  const blob2Y = useSharedValue(0);
  const blob2Scale = useSharedValue(1);

  // Blob 3: Center Right (Indigo)
  const blob3X = useSharedValue(0);
  const blob3Y = useSharedValue(0);
  const blob3Scale = useSharedValue(0.9);

  useEffect(() => {
    // Blob 1 animation loop
    blob1X.value = withRepeat(
      withSequence(
        withTiming(width * 0.15, { duration: 10000 }),
        withTiming(-width * 0.1, { duration: 12000 }),
        withTiming(0, { duration: 10000 })
      ),
      -1,
      false
    );
    blob1Y.value = withRepeat(
      withSequence(
        withTiming(height * 0.1, { duration: 11000 }),
        withTiming(-height * 0.05, { duration: 13000 }),
        withTiming(0, { duration: 11000 })
      ),
      -1,
      false
    );
    blob1Scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 8000 }),
        withTiming(0.9, { duration: 9000 }),
        withTiming(1, { duration: 8000 })
      ),
      -1,
      false
    );

    // Blob 2 animation loop
    blob2X.value = withRepeat(
      withSequence(
        withTiming(-width * 0.1, { duration: 12000 }),
        withTiming(width * 0.12, { duration: 10000 }),
        withTiming(0, { duration: 12000 })
      ),
      -1,
      false
    );
    blob2Y.value = withRepeat(
      withSequence(
        withTiming(-height * 0.1, { duration: 13000 }),
        withTiming(height * 0.08, { duration: 11000 }),
        withTiming(0, { duration: 13000 })
      ),
      -1,
      false
    );
    blob2Scale.value = withRepeat(
      withSequence(
        withTiming(0.85, { duration: 9000 }),
        withTiming(1.25, { duration: 8000 }),
        withTiming(1, { duration: 9000 })
      ),
      -1,
      false
    );

    // Blob 3 animation loop (delayed offset)
    blob3X.value = withRepeat(
      withSequence(
        withTiming(width * 0.08, { duration: 9000 }),
        withTiming(-width * 0.15, { duration: 11000 }),
        withTiming(0, { duration: 9000 })
      ),
      -1,
      false
    );
    blob3Y.value = withRepeat(
      withSequence(
        withTiming(-height * 0.08, { duration: 10000 }),
        withTiming(height * 0.12, { duration: 12000 }),
        withTiming(0, { duration: 10000 })
      ),
      -1,
      false
    );
    blob3Scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 10000 }),
        withTiming(0.8, { duration: 10000 }),
        withTiming(0.9, { duration: 10000 })
      ),
      -1,
      false
    );
  }, [width, height]);

  const styleBlob1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: blob1X.value },
      { translateY: blob1Y.value },
      { scale: blob1Scale.value },
    ],
  }));

  const styleBlob2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: blob2X.value },
      { translateY: blob2Y.value },
      { scale: blob2Scale.value },
    ],
  }));

  const styleBlob3 = useAnimatedStyle(() => ({
    transform: [
      { translateX: blob3X.value },
      { translateY: blob3Y.value },
      { scale: blob3Scale.value },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Background soft color */}
      <View style={styles.baseBg} />

      {/* Blob 1: Blue Glow */}
      <Animated.View
        style={[
          styles.blob,
          styles.blobBlue,
          { top: -height * 0.1, right: -width * 0.1, width: width * 0.7, height: width * 0.7, borderRadius: (width * 0.7) / 2 },
          styleBlob1,
        ]}
      />

      {/* Blob 2: Purple Glow */}
      <Animated.View
        style={[
          styles.blob,
          styles.blobPurple,
          { bottom: -height * 0.05, left: -width * 0.1, width: width * 0.75, height: width * 0.75, borderRadius: (width * 0.75) / 2 },
          styleBlob2,
        ]}
      />

      {/* Blob 3: Indigo Glow */}
      <Animated.View
        style={[
          styles.blob,
          styles.blobIndigo,
          { top: height * 0.35, right: -width * 0.2, width: width * 0.6, height: width * 0.6, borderRadius: (width * 0.6) / 2 },
          styleBlob3,
        ]}
      />

      {/* Frosted glass/semi-transparent background cover */}
      <View style={styles.overlay} />

      {/* Foreground Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  baseBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F8FAFC',
  },
  blob: {
    position: 'absolute',
    opacity: 0.45,
  },
  blobBlue: {
    backgroundColor: '#93C5FD', // light blue
  },
  blobPurple: {
    backgroundColor: '#C084FC', // light purple
  },
  blobIndigo: {
    backgroundColor: '#818CF8', // light indigo
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(248, 250, 252, 0.75)', // Glassmorphic translucent mask
  },
  content: {
    flex: 1,
  },
});
