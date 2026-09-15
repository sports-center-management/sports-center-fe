import {
  Bot,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Gift,
  Headset,
  Home,
  IdCard,
  LayoutGrid,
  SquareCheck,
  Timer,
  Trophy,
  UserRound,
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface NavItem {
  key: string;
  label: string;
  icon: ReactNode;
}
export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const MEMBER_BASE = '/member';

const ico = (I: typeof Home) => <I size={15} strokeWidth={2} />;

export const memberNav: NavSection[] = [
  { items: [{ key: '/member', label: 'Trang chủ', icon: ico(Home) }] },
  {
    title: 'Thành viên',
    items: [
      { key: '/member/membership-plans', label: 'Gói thành viên', icon: ico(Gift) },
      { key: '/member/my-membership', label: 'Gói của tôi', icon: ico(IdCard) },
      { key: '/member/payments', label: 'Lịch sử thanh toán', icon: ico(CreditCard) },
    ],
  },
  {
    title: 'Tập luyện',
    items: [
      { key: '/member/classes', label: 'Lớp học', icon: ico(LayoutGrid) },
      { key: '/member/court-booking', label: 'Đặt sân', icon: ico(Timer) },
      { key: '/member/schedule', label: 'Lịch tập của tôi', icon: ico(CalendarDays) },
      { key: '/member/trainers', label: 'Huấn luyện viên', icon: ico(UserRound) },
      { key: '/member/checkin', label: 'Điểm danh', icon: ico(SquareCheck) },
      { key: '/member/progress', label: 'Kết quả & tiến độ', icon: ico(Trophy) },
      { key: '/member/workout-plans', label: 'Kế hoạch & bài tập', icon: ico(ClipboardList) },
    ],
  },
  {
    title: 'Hỗ trợ',
    items: [
      { key: '/member/support', label: 'Yêu cầu hỗ trợ', icon: ico(Headset) },
      { key: '/member/ai-assistant', label: 'Trợ lý AI', icon: ico(Bot) },
    ],
  },
];

/** 4 mục hiển thị trên thanh tab dưới cùng (mobile); mục thứ 5 là Menu. */
export const memberMobileTabs: { key: string; label: string }[] = [
  { key: '/member', label: 'Trang chủ' },
  { key: '/member/classes', label: 'Lớp học' },
  { key: '/member/schedule', label: 'Lịch tập' },
  { key: '/member/court-booking', label: 'Đặt sân' },
];

/** Danh sách phẳng (dùng cho breadcrumb, tìm kiếm). */
export const flatNav = memberNav.flatMap((s) => s.items.map((i) => ({ ...i, section: s.title })));

export const isNavActive = (key: string, pathname: string) =>
  key === MEMBER_BASE
    ? pathname === MEMBER_BASE || pathname === `${MEMBER_BASE}/`
    : pathname === key || pathname.startsWith(key + '/');
