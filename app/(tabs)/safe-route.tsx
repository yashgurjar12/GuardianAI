import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Navigation,
  Shield,
  MapPin,
  Building2,
  Flame,
  Pill,
  ChevronRight,
  Star,
} from 'lucide-react-native';
import SearchBar from '@/components/ui/SearchBar';
import Card from '@/components/ui/Card';
import PrimaryButton from '@/components/ui/PrimaryButton';
import StatusBadge from '@/components/ui/StatusBadge';
import AppTopbar from '@/components/ui/AppTopbar';
import { Colors, Spacing, Radius, Shadows } from '@/constants/theme';
import { mockRoutes, mockNearbyPlaces } from '@/constants/mockData';

const placeIcons: Record<string, React.ReactNode> = {
  police: <Shield size={18} color={Colors.primary} />,
  hospital: <Pill size={18} color={Colors.sos} />,
  fire: <Flame size={18} color={Colors.warning} />,
  pharmacy: <Building2 size={18} color={Colors.success} />,
};

export default function SafeRouteScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Topbar: GuardianAI title on left, Bell & Profile icon on right */}
        <AppTopbar title="GuardianAI" />

        {/* Below topbar: Safe Route section title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Safe Route</Text>
          <Text style={styles.subtitle}>Find the safest path to your destination</Text>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Where are you going?"
          style={styles.searchBar}
        />

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapGrid}>
              {/* Dark map styling inspired by reference images */}
              <View style={styles.mapRoute} />
              <View style={styles.mapDotStart} />
              <View style={styles.mapDotEnd} />
            </View>
            <View style={styles.mapOverlay}>
              <Navigation size={24} color={Colors.primary} />
              <Text style={styles.mapText}>Map Preview</Text>
              <Text style={styles.mapSubText}>Interactive map will appear here</Text>
            </View>
          </View>
        </View>

        {/* Routes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Routes</Text>
          {mockRoutes.map((route) => (
            <Card key={route.id} style={styles.routeCard}>
              <View style={styles.routeHeader}>
                <View style={styles.routeNameRow}>
                  {route.status === 'recommended' ? (
                    <Star size={16} color={Colors.warning} fill={Colors.warning} />
                  ) : null}
                  <Text style={styles.routeName}>{route.name}</Text>
                </View>
                <View
                  style={[
                    styles.scoreBadge,
                    {
                      backgroundColor:
                        route.safetyScore >= 80
                          ? Colors.successLight
                          : Colors.warningBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.scoreText,
                      {
                        color:
                          route.safetyScore >= 80
                            ? Colors.success
                            : Colors.warning,
                      },
                    ]}
                  >
                    {route.safetyScore}%
                  </Text>
                </View>
              </View>
              <View style={styles.routeMeta}>
                <Text style={styles.routeMetaText}>
                  📏 {route.distance} • ⏱ {route.duration}
                </Text>
              </View>
              {route.status === 'recommended' && (
                <StatusBadge status="safe" label="Recommended" style={{ marginTop: Spacing.sm }} />
              )}
              <View style={styles.waypointsSection}>
                {route.waypoints.map((wp, idx) => (
                  <View key={idx} style={styles.waypointRow}>
                    <View
                      style={[
                        styles.waypointDot,
                        {
                          backgroundColor: wp.includes('dim') || wp.includes('Construction')
                            ? Colors.warning
                            : Colors.success,
                        },
                      ]}
                    />
                    <Text style={styles.waypointText}>{wp}</Text>
                  </View>
                ))}
              </View>
            </Card>
          ))}
        </View>

        {/* Nearby Safe Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Safe Places</Text>
          <View style={styles.placesGrid}>
            {mockNearbyPlaces.map((place) => (
              <Card key={place.id} style={styles.placeCard}>
                <View style={styles.placeIcon}>
                  {placeIcons[place.type]}
                </View>
                <Text style={styles.placeName} numberOfLines={1}>{place.name}</Text>
                <Text style={styles.placeDistance}>{place.distance}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Start Navigation */}
        <PrimaryButton
          title="Start Navigation"
          onPress={() => { }}
          icon={<Navigation size={20} color={Colors.white} />}
          style={{ marginBottom: Spacing.xl }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionHeader: {
    marginBottom: Spacing.lg,
    paddingTop: Spacing.xs,
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
  searchBar: {
    marginBottom: Spacing.lg,
  },
  mapContainer: {
    marginBottom: Spacing.lg,
  },
  mapPlaceholder: {
    height: 200,
    borderRadius: Radius.large,
    backgroundColor: '#1A1A2E',
    overflow: 'hidden',
    position: 'relative',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  mapRoute: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: '60%',
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    transform: [{ rotate: '-15deg' }],
  },
  mapDotStart: {
    position: 'absolute',
    top: '35%',
    left: '15%',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  mapDotEnd: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.sos,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
  mapSubText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.heading,
    marginBottom: Spacing.md,
  },
  routeCard: {
    marginBottom: Spacing.md,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.heading,
  },
  scoreBadge: {
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.small,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
  },
  routeMeta: {
    marginTop: Spacing.sm,
  },
  routeMetaText: {
    fontSize: 13,
    color: Colors.secondary,
  },
  waypointsSection: {
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  waypointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs + 2,
  },
  waypointDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: Spacing.sm,
  },
  waypointText: {
    fontSize: 13,
    color: Colors.body,
  },
  placesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  placeCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  placeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  placeName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.heading,
    textAlign: 'center',
  },
  placeDistance: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 2,
  },
});
