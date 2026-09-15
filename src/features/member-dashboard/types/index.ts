export type RoleType = 'Member' | 'Trainer' | 'Admin' | 'Staff';

export interface MemberUser {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  role: RoleType;
  membershipTier: 'Basic' | 'Silver' | 'Gold' | 'VIP';
  memberCode: string;
  qrCodeUrl?: string;
  joinDate: string;
  expiryDate: string;
}

export interface MenuItem {
  id: string;
  title: string;
  path: string;
  iconName: string;
  badge?: string | number;
}

export interface SidebarSection {
  title: string;
  items: MenuItem[];
}

export interface DashboardStats {
  upcomingBookingsCount: number;
  monthlyWorkoutsCount: number;
  activeMembershipName: string;
  daysRemaining: number;
  rewardPoints: number;
  assignedTrainerName?: string;
}

export interface UpcomingSession {
  id: string;
  title: string;
  category: 'Lớp học' | 'Đặt sân';
  sport: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  instructorOrCourt: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

export interface ActivityItem {
  id: string;
  type: 'checking' | 'booking' | 'payment' | 'workout';
  title: string;
  description: string;
  timestamp: string;
  amount?: string;
  status?: 'success' | 'pending' | 'warning';
}

export interface MembershipDetails {
  planName: string;
  tier: 'VIP' | 'Gold' | 'Silver' | 'Basic';
  price: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  usedSessions: number;
  benefits: string[];
  status: 'Active' | 'Expired' | 'Pending';
}
