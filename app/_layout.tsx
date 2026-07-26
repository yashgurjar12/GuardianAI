import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/theme';

import { ContactsProvider } from '@/context/ContactsContext';
import { NotificationProvider } from '@/context/NotificationContext';

SplashScreen.preventAutoHideAsync();

const GuardianTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.heading,
    border: Colors.border,
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NotificationProvider>
      <ContactsProvider>
        <ThemeProvider value={GuardianTheme}>
          {Platform.OS === 'web' && (
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  input, textarea, select, button {
                    outline: none !important;
                    box-shadow: none !important;
                  }
                  input:focus, textarea:focus, select:focus {
                    outline: none !important;
                    box-shadow: none !important;
                  }
                  input:-webkit-autofill,
                  input:-webkit-autofill:hover,
                  input:-webkit-autofill:focus {
                    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
                    -webkit-text-fill-color: #0F172A !important;
                    transition: background-color 5000s ease-in-out 0s;
                  }
                `,
              }}
            />
          )}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="permissions" />
            <Stack.Screen name="admin" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="sos-countdown"
              options={{
                presentation: 'fullScreenModal',
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="emergency-active"
              options={{
                presentation: 'fullScreenModal',
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="route-alert"
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen name="history" />
            <Stack.Screen name="settings" />
          </Stack>
          <StatusBar style="dark" />
        </ThemeProvider>
      </ContactsProvider>
    </NotificationProvider>
  );
}
