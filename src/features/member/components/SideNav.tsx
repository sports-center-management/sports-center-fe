import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { LogOut, X, Zap } from 'lucide-react';
import { ROLE_COLOR, labelOf } from '../constants';
import { isNavActive, memberNav } from '../nav';
import { useMember } from '../store/MemberProvider';
import { Avatar } from './ui/Avatar';

interface Props {
  collapsed: boolean;
  onToggle: () => void;
  mobile?: boolean;
  onNavigate?: () => void;
}

export function SideNav({ collapsed, onToggle, mobile, onNavigate }: Props) {
  const { currentUser } = useMember();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const roleColor = ROLE_COLOR[currentUser.role];

  return (
    <div
      className={`flex shrink-0 flex-col border-r border-white/7 bg-sc-ink text-[#d6d2c8] transition-[width] duration-200 ${
        mobile ? 'relative h-full w-full' : 'sticky top-0 z-20 h-screen'
      } ${collapsed ? 'w-[76px]' : 'w-[252px]'}`}
    >
      {/* Brand */}
      <div
        className={`relative flex h-16 items-center gap-3 border-b border-white/6 ${collapsed ? 'px-5' : 'pr-4 pl-5'}`}
      >
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md bg-sc-lime text-sc-ink">
          <Zap size={17} fill="currentColor" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-display text-[19px] font-extrabold uppercase leading-none tracking-[.02em] text-white">
              Sports Center
            </div>
            <div className="mt-[3px] text-[11px] text-white/40">Management System</div>
          </div>
        )}
        {mobile && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute top-[18px] right-3 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/6 text-[#cbd5e1]"
            aria-label="Đóng menu"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Role chip */}
      {!collapsed && (
        <div className="mx-4 mt-3.5 mb-1 flex items-center gap-2 rounded-lg border border-white/7 bg-white/5 px-3 py-2 font-display text-[13px] font-bold uppercase tracking-[.06em] text-[#ece8df]">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: roleColor, boxShadow: `0 0 0 3px ${roleColor}33` }}
          />
          {labelOf(currentUser.role)}
          <span className="ml-auto font-body text-xs font-medium tracking-normal text-white/40 capitalize">
            {dayjs().format('ddd, DD/MM')}
          </span>
        </div>
      )}

      {/* Sections */}
      <nav className="sc-nav-scroll flex-1 overflow-y-auto px-3 pt-2 pb-3">
        {memberNav.map((sec, i) => (
          <div key={i} className="mt-2.5">
            {sec.title && !collapsed && (
              <div className="px-3 pt-2 pb-1.5 font-display text-xs font-bold uppercase tracking-[.14em] text-white/35">
                {sec.title}
              </div>
            )}
            {sec.title && collapsed && <div className="mx-3.5 mt-2.5 mb-2 h-px bg-white/7" />}
            {sec.items.map((it) => {
              const active = isNavActive(it.key, pathname);
              return (
                <Link
                  key={it.key}
                  to={it.key}
                  onClick={onNavigate}
                  title={collapsed ? it.label : undefined}
                  className={`group relative mb-0.5 flex h-[38px] items-center gap-2.5 rounded-lg text-[13.5px] font-medium no-underline transition-colors duration-150 ${
                    collapsed ? 'justify-center px-0' : 'px-2.5'
                  } ${
                    active
                      ? 'bg-white/8 text-white before:absolute before:top-[9px] before:bottom-[9px] before:-left-3 before:w-[3px] before:rounded-r-[3px] before:bg-sc-lime before:content-[""]'
                      : 'text-white/66 hover:bg-white/6 hover:text-white'
                  } ${collapsed ? 'before:hidden' : ''}`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150 ${
                      active
                        ? 'bg-sc-lime text-sc-ink'
                        : 'bg-white/4 text-white/70 group-hover:bg-white/10 group-hover:text-white'
                    }`}
                  >
                    {it.icon}
                  </span>
                  {!collapsed && <span className="flex-1 truncate">{it.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div
        onClick={() => {
          onNavigate?.();
          navigate({ to: '/member/profile' });
        }}
        className={`mx-3 mt-2 mb-3 flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-white/7 bg-white/5 transition-colors hover:bg-white/7 ${
          collapsed ? 'justify-center p-2' : 'p-2.5'
        }`}
      >
        <Avatar
          name={currentUser.fullName}
          size={collapsed ? 34 : 38}
          color={roleColor}
          style={{ border: `1px solid ${roleColor}55`, fontSize: 13 }}
        />
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-white">{currentUser.fullName}</div>
              <div className="truncate text-[11px] text-white/40">{currentUser.email}</div>
            </div>
            <button
              type="button"
              title="Đăng xuất"
              onClick={(e) => {
                e.stopPropagation();
                navigate({ to: '/' });
              }}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-white/45 hover:bg-[rgba(239,68,68,.15)] hover:text-[#f87171]"
            >
              <LogOut size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
