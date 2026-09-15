/* eslint-disable react-refresh/only-export-components */
import dayjs from 'dayjs';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CURRENT_USER_ID, initialData } from '../data/mock';
import type { AppData, MembershipStatus, Notification, Subscription, User } from '../types';

type Collection = keyof AppData;
type Item<K extends Collection> = AppData[K][number];

interface MemberContextValue {
  data: AppData;
  currentUser: User;
  update: <K extends Collection>(key: K, id: string, patch: Partial<Item<K>>) => void;
  userById: (id?: string) => User | undefined;
  nameOf: (id?: string) => string;
  activeSubscription: (memberId: string) => Subscription | undefined;
  membershipStatus: (memberId: string) => MembershipStatus;
  myNotifications: () => Notification[];
  toast: (msg: string) => void;
}

const MemberContext = createContext<MemberContextValue | null>(null);

// Prototype: giữ dữ liệu giả lập trong sessionStorage để F5 không mất trạng thái khi demo.
const DATA_KEY = 'sc_member_data_v1';
const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = sessionStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function MemberProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => load(DATA_KEY, initialData));
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    sessionStorage.setItem(DATA_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 2400);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const update = useCallback(<K extends Collection>(key: K, id: string, patch: Partial<Item<K>>) => {
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as Item<K>[]).map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  }, []);

  const value = useMemo<MemberContextValue>(() => {
    const userById = (id?: string) => data.users.find((u) => u.id === id);
    const nameOf = (id?: string) => userById(id)?.fullName ?? '—';
    const activeSubscription = (memberId: string) =>
      data.subscriptions
        .filter((s) => s.memberId === memberId && s.status === 'ACTIVE')
        .sort((a, b) => b.endDate.localeCompare(a.endDate))[0];
    const membershipStatus = (memberId: string): MembershipStatus => {
      const s = activeSubscription(memberId);
      if (!s) return data.subscriptions.some((x) => x.memberId === memberId) ? 'EXPIRED' : 'NONE';
      const days = dayjs(s.endDate).diff(dayjs(), 'day');
      if (days < 0) return 'EXPIRED';
      if (days <= 7) return 'EXPIRING';
      return 'ACTIVE';
    };
    const currentUser = userById(CURRENT_USER_ID)!;
    return {
      data,
      currentUser,
      update,
      userById,
      nameOf,
      activeSubscription,
      membershipStatus,
      myNotifications: () => data.notifications.filter((n) => n.userId === currentUser.id),
      toast: setToastMsg,
    };
  }, [data, update]);

  return (
    <MemberContext.Provider value={value}>
      {children}
      {toastMsg && (
        <div className="sc-fade fixed top-5 left-1/2 z-100 -translate-x-1/2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-sc-ink shadow-[0_6px_24px_rgba(20,19,15,.12)] border border-sc-border-soft flex items-center gap-2">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#16a34a] text-[10px] text-white">
            ✓
          </span>
          {toastMsg}
        </div>
      )}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const ctx = useContext(MemberContext);
  if (!ctx) throw new Error('useMember must be used inside MemberProvider');
  return ctx;
}

export const fmtMoney = (n: number) => n.toLocaleString('vi-VN') + ' ₫';
export const DAY_NAMES = ['', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
export const initialsOf = (name?: string) =>
  (name ?? '?')
    .split(' ')
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
