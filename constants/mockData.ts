/**
 * GuardianAI – Mock Data
 * All prototype data for screens (no real backend)
 */

export const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (415) 555-0192',
  avatar: null,
  role: 'user' as const,
  status: 'Safe' as const,
  riskScore: 12,
  location: '4th Mound Road, California',
};

export const mockTrustedContacts = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    relation: 'Partner',
    phone: '+1 (415) 555-0192',
    initials: 'SM',
    color: '#2563EB',
  },
  {
    id: '2',
    name: 'James Carter',
    relation: 'Brother',
    phone: '+1 (628) 555-0847',
    initials: 'JC',
    color: '#22C55E',
  },
  {
    id: '3',
    name: 'Dr. Emily Ross',
    relation: 'Doctor',
    phone: '+1 (510) 555-0334',
    initials: 'ER',
    color: '#F59E0B',
  },
  {
    id: '4',
    name: 'Mom',
    relation: 'Mother',
    phone: '+1 (415) 555-0901',
    initials: 'MJ',
    color: '#EF4444',
  },
];

export const mockAIInsights = [
  {
    id: '1',
    title: 'Routine Deviation',
    description: 'You usually leave work by 6:00 PM. Today you stayed 45 minutes later.',
    icon: 'clock' as const,
    type: 'info' as const,
    time: '6:45 PM',
  },
  {
    id: '2',
    title: 'Unusual Area',
    description: 'You are in an area you have not visited before in the last 30 days.',
    icon: 'map-pin' as const,
    type: 'warning' as const,
    time: '7:20 PM',
  },
  {
    id: '3',
    title: 'Low Light Zone',
    description: 'Current area has limited street lighting. Stay alert.',
    icon: 'sun' as const,
    type: 'warning' as const,
    time: '8:15 PM',
  },
  {
    id: '4',
    title: 'Safe Zone Reached',
    description: 'You have arrived at your home safely.',
    icon: 'shield-check' as const,
    type: 'success' as const,
    time: '8:30 PM',
  },
];

export const mockWeeklyActivity = [
  { day: 'Mon', trips: 3, risk: 8 },
  { day: 'Tue', trips: 2, risk: 5 },
  { day: 'Wed', trips: 4, risk: 15 },
  { day: 'Thu', trips: 2, risk: 10 },
  { day: 'Fri', trips: 3, risk: 12 },
  { day: 'Sat', trips: 1, risk: 3 },
  { day: 'Sun', trips: 1, risk: 2 },
];

export const mockRoutes = [
  {
    id: '1',
    name: 'Home → College',
    distance: '3.2 km',
    duration: '12 min',
    safetyScore: 92,
    status: 'recommended' as const,
    waypoints: ['Well-lit Main Street', 'Police Station nearby', 'CCTV coverage'],
  },
  {
    id: '2',
    name: 'Home → College (Alt)',
    distance: '2.8 km',
    duration: '10 min',
    safetyScore: 67,
    status: 'alternative' as const,
    waypoints: ['Park road (dim lighting)', 'Construction zone'],
  },
];

export const mockNearbyPlaces = [
  { id: '1', name: 'City Police Station', type: 'police', distance: '0.3 km' },
  { id: '2', name: 'Central Hospital', type: 'hospital', distance: '0.8 km' },
  { id: '3', name: 'Fire Station #4', type: 'fire', distance: '1.2 km' },
  { id: '4', name: '24hr Pharmacy', type: 'pharmacy', distance: '0.5 km' },
];

export const mockHistory = [
  {
    id: '1',
    date: 'Today',
    time: '8:30 AM',
    route: 'Home → College',
    status: 'safe' as const,
    riskScore: 8,
    duration: '12 min',
  },
  {
    id: '2',
    date: 'Today',
    time: '6:15 PM',
    route: 'College → Home',
    status: 'safe' as const,
    riskScore: 15,
    duration: '14 min',
  },
  {
    id: '3',
    date: 'Yesterday',
    time: '9:00 PM',
    route: 'Home → Market',
    status: 'warning' as const,
    riskScore: 42,
    duration: '8 min',
  },
  {
    id: '4',
    date: 'Yesterday',
    time: '9:30 PM',
    route: 'Market → Home',
    status: 'alert' as const,
    riskScore: 68,
    duration: '10 min',
  },
  {
    id: '5',
    date: '2 days ago',
    time: '7:00 AM',
    route: 'Home → Gym',
    status: 'safe' as const,
    riskScore: 5,
    duration: '6 min',
  },
  {
    id: '6',
    date: '2 days ago',
    time: '5:00 PM',
    route: 'College → Library',
    status: 'safe' as const,
    riskScore: 10,
    duration: '15 min',
  },
];

export const mockNotifications = [
  {
    id: '1',
    title: 'Route Completed',
    message: 'You arrived at College safely.',
    time: '8:42 AM',
    read: true,
  },
  {
    id: '2',
    title: 'Route Deviation',
    message: 'You deviated from your usual route near Park Avenue.',
    time: 'Yesterday',
    read: false,
  },
  {
    id: '3',
    title: 'Weekly Report',
    message: 'Your weekly safety summary is ready.',
    time: '2 days ago',
    read: true,
  },
];

export const mockTodayJourney = [
  { time: '8:00 AM', event: 'Left Home', status: 'completed' as const },
  { time: '8:12 AM', event: 'Arrived at College', status: 'completed' as const },
  { time: '12:30 PM', event: 'Lunch Break - Cafeteria', status: 'completed' as const },
  { time: '5:00 PM', event: 'Left College', status: 'completed' as const },
  { time: '5:15 PM', event: 'Currently Traveling', status: 'active' as const },
  { time: '5:30 PM', event: 'Expected at Home', status: 'upcoming' as const },
];

export const emergencyTypes = [
  { id: '1', label: 'Medical', icon: 'heart-pulse', color: '#EF4444' },
  { id: '2', label: 'Fire', icon: 'flame', color: '#F97316' },
  { id: '3', label: 'Violence', icon: 'shield-alert', color: '#DC2626' },
  { id: '4', label: 'Accident', icon: 'car', color: '#F59E0B' },
  { id: '5', label: 'Stalking', icon: 'eye', color: '#8B5CF6' },
  { id: '6', label: 'Rescue', icon: 'life-buoy', color: '#2563EB' },
];
