import type {
  ActivityItem,
  DashboardStats,
  MembershipDetails,
  MemberUser,
  SidebarSection,
  UpcomingSession,
} from '../types';

export const CURRENT_MEMBER_USER: MemberUser = {
  id: 'mem-001',
  fullName: 'Hoàng Thị Dung',
  email: 'dung.hoang@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  role: 'Member',
  membershipTier: 'VIP',
  memberCode: 'SC-VIP-8892',
  joinDate: '2025-01-15',
  expiryDate: '2026-12-31',
};

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: 'CHUNG',
    items: [{ id: 'home', title: 'Trang chủ', path: '/member', iconName: 'LayoutDashboard' }],
  },
  {
    title: 'TÀI KHOẢN',
    items: [
      { id: 'membership-plans', title: 'Gói thành viên', path: '/member/membership-plans', iconName: 'CreditCard' },
      {
        id: 'my-membership',
        title: 'Gói của tôi',
        path: '/member/my-membership',
        iconName: 'ShieldCheck',
        badge: 'VIP',
      },
      { id: 'payments', title: 'Lịch sử thanh toán', path: '/member/payments', iconName: 'Receipt' },
    ],
  },
  {
    title: 'TẬP LUYỆN',
    items: [
      { id: 'classes', title: 'Lớp học', path: '/member/classes', iconName: 'Dumbbell', badge: '3 mới' },
      { id: 'court-booking', title: 'Đặt sân', path: '/member/court-booking', iconName: 'CalendarPlus' },
      { id: 'schedule', title: 'Lịch tập của tôi', path: '/member/schedule', iconName: 'CalendarDays', badge: 2 },
      { id: 'trainers', title: 'Huấn luyện viên của tôi', path: '/member/trainers', iconName: 'Users' },
      { id: 'checkin', title: 'Điểm danh', path: '/member/checkin', iconName: 'QrCode' },
      { id: 'progress', title: 'Kết quả & tiến độ', path: '/member/progress', iconName: 'TrendingUp' },
      { id: 'workout-plans', title: 'Kế hoạch & bài tập', path: '/member/workout-plans', iconName: 'ClipboardList' },
    ],
  },
  {
    title: 'HỖ TRỢ',
    items: [
      { id: 'support', title: 'Yêu cầu hỗ trợ', path: '/member/support', iconName: 'LifeBuoy' },
      { id: 'ai-assistant', title: 'Trợ lý AI', path: '/member/ai-assistant', iconName: 'Sparkles', badge: 'AI' },
    ],
  },
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  upcomingBookingsCount: 2,
  monthlyWorkoutsCount: 14,
  activeMembershipName: 'Gói Premium VIP 12 Thẻ',
  daysRemaining: 107,
  rewardPoints: 1250,
  assignedTrainerName: 'HLV. Nguyễn Văn Anh',
};

export const MOCK_CURRENT_MEMBERSHIP: MembershipDetails = {
  planName: 'Gói Thẻ VIP Platinum 1 Năm',
  tier: 'VIP',
  price: '12.500.000 VNĐ / năm',
  startDate: '2025-01-15',
  endDate: '2026-12-31',
  totalSessions: 120,
  usedSessions: 46,
  status: 'Active',
  benefits: [
    'Sử dụng toàn bộ 10 phòng tập & sân thể thao',
    'Miễn phí 10 buổi tập cùng Huấn luyện viên cá nhân (PT)',
    'Miễn phí khăn tắm, tủ đồ locker thông minh & phòng xông hơi Sauna',
    'Tặng 1 nước điện giải mỗi ngày check-in',
    'Ưu tiên đặt sân trước 7 ngày',
  ],
};

export const MOCK_UPCOMING_SESSIONS: UpcomingSession[] = [
  {
    id: 's-101',
    title: 'Lớp Yoga Hatha Phục Hồi',
    category: 'Lớp học',
    sport: 'Yoga',
    location: 'Phòng Yoga Studio A - Tầng 2',
    date: 'Hôm nay - 17:30',
    startTime: '17:30',
    endTime: '18:30',
    instructorOrCourt: 'HLV. Phạm Minh Trang',
    status: 'Confirmed',
  },
  {
    id: 's-102',
    title: 'Đặt Sân Cầu Lông Số 3',
    category: 'Đặt sân',
    sport: 'Badminton',
    location: 'Sân Cầu Lông Khu A',
    date: 'Ngày mai - 19:00',
    startTime: '19:00',
    endTime: '21:00',
    instructorOrCourt: 'Sân Cầu Lông VIP 03',
    status: 'Confirmed',
  },
  {
    id: 's-103',
    title: 'Lớp Kickboxing Cường Độ Cao',
    category: 'Lớp học',
    sport: 'Boxing',
    location: 'Phòng Tập Võ Studio B',
    date: 'Thứ 5, 18/09 - 18:00',
    startTime: '18:00',
    endTime: '19:00',
    instructorOrCourt: 'HLV. Trần Đức Anh',
    status: 'Pending',
  },
];

export const MOCK_RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'checking',
    title: 'Check-in thành công',
    description: 'Check-in tại Cổng chính Sports Center với thẻ VIP',
    timestamp: 'Hôm nay, 08:15 AM',
    status: 'success',
  },
  {
    id: 'act-2',
    type: 'booking',
    title: 'Xác nhận đặt sân Cầu lông',
    description: 'Đã thanh toán & giữ lịch Sân 3 lúc 19:00 ngày mai',
    timestamp: 'Hôm qua, 14:30 PM',
    status: 'success',
  },
  {
    id: 'act-3',
    type: 'workout',
    title: 'Hoàn thành bài tập PT Gym',
    description: 'Buổi tập Leg Day cùng HLV. Nguyễn Văn Anh (60 phút)',
    timestamp: '14/09/2026, 17:00 PM',
    status: 'success',
  },
  {
    id: 'act-4',
    type: 'payment',
    title: 'Thanh toán nước & phụ kiện',
    description: 'Mua Pocari Sweat + Băng quấn cổ tay',
    timestamp: '12/09/2026, 19:20 PM',
    amount: '-85.000 VNĐ',
    status: 'success',
  },
];
