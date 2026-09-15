export type Role = 'MANAGER' | 'COACH' | 'MEMBER' | 'RECEPTIONIST';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: Role;
  status: 'ACTIVE' | 'LOCKED';
  dob?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  goal?: string;
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  healthNote?: string;
  memberCode?: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  durationDays: number;
  benefits: string;
  active: boolean;
}

export interface Subscription {
  id: string;
  memberId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
}

export interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Room {
  id: string;
  name: string;
  location: string;
}

export interface GymClass {
  id: string;
  name: string;
  sportId: string;
  roomId: string;
  coachId: string;
  capacity: number;
  price: number;
  status: 'OPEN' | 'CLOSED' | 'CANCELLED';
}

export interface Schedule {
  id: string;
  classId: string;
  dayOfWeek: number; // 1 = Mon ... 7 = Sun
  startTime: string;
  endTime: string;
}

export interface Enrollment {
  id: string;
  classId: string;
  memberId: string;
  status: 'ACTIVE' | 'CANCELLED';
}

export interface Payment {
  id: string;
  invoiceNo: string;
  memberId: string;
  amount: number;
  refName: string;
  paidAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Attendance {
  id: string;
  memberId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
}

export interface Homework {
  id: string;
  classId: string;
  title: string;
  content: string;
}

export interface CheckIn {
  id: string;
  memberId: string;
  time: string;
}

export interface AppData {
  users: User[];
  plans: Plan[];
  subscriptions: Subscription[];
  sports: Sport[];
  rooms: Room[];
  classes: GymClass[];
  schedules: Schedule[];
  enrollments: Enrollment[];
  payments: Payment[];
  notifications: Notification[];
  attendances: Attendance[];
  homeworks: Homework[];
  checkIns: CheckIn[];
}

export type MembershipStatus = 'ACTIVE' | 'EXPIRING' | 'EXPIRED' | 'NONE';
