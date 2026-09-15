import { Link, useRouterState } from '@tanstack/react-router';
import {
  Activity,
  CalendarDays,
  CalendarPlus,
  ClipboardList,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  QrCode,
  Receipt,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import React from 'react';
import { CURRENT_MEMBER_USER, SIDEBAR_SECTIONS } from '../data/mockData';

interface MemberSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  CreditCard,
  ShieldCheck,
  Receipt,
  Dumbbell,
  CalendarPlus,
  CalendarDays,
  Users,
  QrCode,
  TrendingUp,
  ClipboardList,
  LifeBuoy,
  Sparkles,
};

export const MemberSidebar: React.FC<MemberSidebarProps> = ({ isOpen = false, onClose }) => {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <aside
      className={`w-70 bg-sc-primary-dark text-white flex flex-col h-screen sticky top-0 z-40 border-r border-white/10 shrink-0 transition-transform duration-300 shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } fixed md:sticky`}
    >
      {/* Header */}
      <div className="p-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-10.5 h-10.5 bg-sc-lime text-sc-primary-dark rounded-xl flex items-center justify-center font-black shadow-md shrink-0">
          <Activity size={24} />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg tracking-wide uppercase text-white leading-none">
            SPORTS CENTER
          </h2>
          <span className="text-[11px] text-[#9cb5a8] uppercase tracking-widest font-semibold">Management System</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden ml-auto text-white p-1" aria-label="Close Sidebar">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3">
        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7b9c8c] px-3 py-2">
              {section.title}
            </div>
            {section.items.map((item) => {
              const IconComponent = ICON_MAP[item.iconName] || LayoutDashboard;
              const isActive =
                currentPath === item.path || (item.path !== '/member' && currentPath.startsWith(item.path));

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all ${
                    isActive
                      ? 'bg-sc-primary text-white font-semibold shadow-md border-l-4 border-sc-lime'
                      : 'text-[#c7d8ce] hover:bg-white/10 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-4.5 h-4.5 ${isActive ? 'text-sc-lime' : 'text-[#8dae9d]'}`} />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        item.badge === 'AI' || item.badge === 'VIP'
                          ? 'bg-sc-lime text-sc-primary-dark'
                          : 'bg-sc-accent text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between">
        {/* 👇 Bọc thông tin tài khoản bằng Link tới trang /member/profile */}
        <Link
          to="/member/profile"
          onClick={onClose}
          className="flex items-center gap-3 overflow-hidden group hover:opacity-90 transition-opacity cursor-pointer flex-1"
        >
          <img
            src={CURRENT_MEMBER_USER.avatar}
            alt={CURRENT_MEMBER_USER.fullName}
            className="w-10 h-10 rounded-full object-cover border-2 border-sc-lime shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="truncate">
            <p className="text-sm font-semibold text-white truncate group-hover:text-sc-lime transition-colors">
              {CURRENT_MEMBER_USER.fullName}
            </p>
            <span className="text-[11px] font-bold text-sc-lime uppercase tracking-wider">
              {CURRENT_MEMBER_USER.role}
            </span>
          </div>
        </Link>

        {/* Nút Đăng xuất giữ nguyên */}
        <button
          className="p-1.5 text-[#8dae9d] hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
          title="Đăng xuất"
          onClick={() => alert('Đăng xuất thành công!')}
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};
