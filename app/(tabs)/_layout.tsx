import { Tabs, useRouter } from 'expo-router';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { Home, Navigation, Bot, Users, ShieldAlert, User } from 'lucide-react-native';
import { Colors, Spacing } from '@/constants/theme';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.disabled,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai-twin"
        options={{
          title: 'AI Twin',
          tabBarIcon: ({ color, size }) => <Bot size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: 'SOS',
          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.sosButtonWrapper}
              onPress={() => router.push('/sos-countdown')}
            >
              <View style={styles.sosTabBtn}>
                <ShieldAlert size={22} color={Colors.white} />
              </View>
              <Text style={styles.sosButtonLabel}>SOS</Text>
            </TouchableOpacity>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/sos-countdown');
          },
        }}
      />
      <Tabs.Screen
        name="safe-route"
        options={{
          title: 'Safe Route',
          tabBarIcon: ({ color, size }) => <Navigation size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          href: null,
          title: 'History',
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          title: 'Notifications',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 88 : 72,
    paddingTop: Spacing.xs,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: Platform.OS === 'ios' ? 0 : 4,
  },
  tabItem: {
    paddingTop: 4,
  },
  sosButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -12,
  },
  sosTabBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.sos,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.sos,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  sosButtonLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.sos,
    marginTop: 2,
  },
});
