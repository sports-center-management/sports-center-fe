import type { Role } from './types';

export const ROLE_COLOR: Record<Role, string> = {
  MANAGER: '#c94a1e',
  COACH: '#0f4d34',
  MEMBER: '#0891b2',
  RECEPTIONIST: '#d9a400',
};

export type TagColor =
  | 'default'
  | 'green'
  | 'red'
  | 'orange'
  | 'gold'
  | 'blue'
  | 'cyan'
  | 'magenta'
  | 'purple'
  | 'geekblue'
  | 'volcano'
  | 'pink';

export const STATUS_MAP: Record<string, { color: TagColor; label: string }> = {
  ACTIVE: { color: 'green', label: 'Đang hoạt động' },
  LOCKED: { color: 'red', label: 'Đã khóa' },
  EXPIRED: { color: 'red', label: 'Hết hạn' },
  EXPIRING: { color: 'orange', label: 'Sắp hết hạn' },
  PENDING: { color: 'gold', label: 'Chờ thanh toán' },
  NONE: { color: 'default', label: 'Chưa có gói' },
  OPEN: { color: 'green', label: 'Đang mở' },
  CLOSED: { color: 'default', label: 'Đã kết thúc' },
  CANCELLED: { color: 'red', label: 'Đã hủy' },
  PRESENT: { color: 'green', label: 'Có mặt' },
  ABSENT: { color: 'red', label: 'Vắng' },
  LATE: { color: 'orange', label: 'Muộn' },
  MANAGER: { color: 'volcano', label: 'Quản lý' },
  COACH: { color: 'blue', label: 'Huấn luyện viên' },
  MEMBER: { color: 'green', label: 'Thành viên' },
  RECEPTIONIST: { color: 'gold', label: 'Lễ tân' },
  BEGINNER: { color: 'default', label: 'Mới bắt đầu' },
  INTERMEDIATE: { color: 'blue', label: 'Trung bình' },
  ADVANCED: { color: 'purple', label: 'Nâng cao' },
  MALE: { color: 'blue', label: 'Nam' },
  FEMALE: { color: 'pink', label: 'Nữ' },
  OTHER: { color: 'default', label: 'Khác' },
};

export const labelOf = (v?: string) => (v ? (STATUS_MAP[v]?.label ?? v) : '');
