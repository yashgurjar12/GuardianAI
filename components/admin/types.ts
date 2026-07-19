// Types for Admin Panel State
export interface MonitoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  joinedDate: string;
  status: 'active' | 'blocked';
  trustedContacts: string;
  totalSOSTriggered: number;
  location?: string;
  riskScore?: number;
  lastActive?: string;
}

export interface SafetyTip {
  id: string;
  title: string;
  category: 'Personal Safety' | 'Cyber Safety' | 'Travel Safety' | 'Student Safety' | 'Workplace Safety' | 'Emergency Tips';
  description: string;
  status: 'Published' | 'Draft';
  lastUpdated: string;
  imageUri?: string;
}

export interface SOSReport {
  id: string;
  userName: string;
  phone: string;
  location: string;
  city: string;
  dateTime: string;
  status: 'Resolved' | 'Pending' | 'Critical';
  trustedContacts: string;
  notes?: string;
}

export interface AdminProfile {
  name: string;
  role: string;
  email: string;
  avatarInitials: string;
}
