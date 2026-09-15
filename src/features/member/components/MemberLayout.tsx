import { Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Bell, LayoutGrid, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Search, UserRound, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ROLE_COLOR, labelOf } from '../constants';
import { MEMBER_BASE, flatNav, isNavActive, memberMobileTabs } from '../nav';
import { MemberProvider, useMember } from '../store/MemberProvider';
import { GlobalSearch } from './GlobalSearch';
import { SideNav } from './SideNav';
import { Avatar } from './ui/Avatar';
import { Kbd } from './ui/Misc';

function useIsMobile() {
  const [m, setM] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = (e: MediaQueryListEvent) => setM(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

function useClickOutside<T extends HTMLElement>(open: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!open) return;
    const on = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', on);
    return () => document.removeEventListener('mousedown', on);
  }, [open, onClose]);
  return ref;
}

const HEADER_ICON_BTN =
  'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sc-ink transition-colors hover:bg-[rgba(0,0,0,.06)]';

function NotificationBell({ isMobile }: { isMobile: boolean }) {
  const { myNotifications, update } = useMember();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(open, () => setOpen(false));
  const notis = myNotifications().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const unread = notis.filter((n) => !n.read).length;
  const goAll = () => {
    setOpen(false);
    navigate({ to: '/member/notifications' });
  };

  const badge = unread > 0 && (
    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff4d4f] px-1 text-[11px] font-medium leading-none text-white shadow-[0_0_0_1px_#fff]">
      {unread}
    </span>
  );

  if (isMobile) {
    return (
      <button type="button" className={`${HEADER_ICON_BTN} relative`} onClick={goAll} aria-label="Thông báo">
        <Bell size={17} />
        {badge}
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className={`${HEADER_ICON_BTN} relative`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Thông báo"
      >
        <Bell size={17} />
        {badge}
      </button>
      {open && (
        <div className="sc-fade absolute top-full right-0 z-40 mt-2 w-[360px] overflow-hidden rounded-xl border border-sc-border-soft bg-white shadow-[0_6px_24px_rgba(20,19,15,.10)]">
          <div className="flex items-center justify-between border-b border-sc-border-soft px-4 py-3">
            <b className="text-sm">Thông báo</b>
            {unread > 0 && (
              <a
                className="cursor-pointer text-xs text-sc-primary hover:underline"
                onClick={() => notis.forEach((n) => !n.read && update('notifications', n.id, { read: true }))}
              >
                Đọc tất cả
              </a>
            )}
          </div>
          <div className="max-h-[360px] overflow-y-auto">
            {notis.length === 0 && <div className="p-6 text-center text-sm text-[#9a968c]">Không có thông báo</div>}
            {notis.slice(0, 6).map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  update('notifications', n.id, { read: true });
                  goAll();
                }}
                className={`flex cursor-pointer gap-2.5 border-b border-[#f4f6fb] px-4 py-2.5 ${n.read ? '' : 'bg-[#f5f8ff]'}`}
              >
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-sc-border' : 'bg-sc-primary'}`} />
                <div className="min-w-0">
                  <div className={`text-[13px] ${n.read ? 'font-medium' : 'font-semibold'}`}>{n.title}</div>
                  <div className="truncate text-xs text-sc-muted">{n.content}</div>
                  <div className="text-[11px] text-[#9a968c]">{dayjs(n.createdAt).fromNow()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-sc-border-soft px-4 py-2.5 text-center">
            <a className="cursor-pointer text-sm text-sc-primary hover:underline" onClick={goAll}>
              Xem tất cả thông báo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function UserMenu({ isMobile }: { isMobile: boolean }) {
  const { currentUser } = useMember();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(open, () => setOpen(false));
  const roleColor = ROLE_COLOR[currentUser.role];
  const item =
    'flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm text-sc-ink hover:bg-[rgba(0,0,0,.04)]';

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center gap-2.5 rounded-full border border-sc-border-soft bg-white ${isMobile ? 'ml-1 p-0.5' : 'ml-2 py-1 pr-2.5 pl-1'}`}
      >
        <Avatar
          name={currentUser.fullName}
          size={30}
          color={roleColor}
          bg={`${roleColor}22`}
          style={{ fontSize: 12 }}
        />
        {!isMobile && (
          <div className="leading-[1.15]">
            <div className="text-[13px] font-semibold">{currentUser.fullName}</div>
            <div className="text-[11px] font-semibold" style={{ color: roleColor }}>
              {labelOf(currentUser.role)}
            </div>
          </div>
        )}
      </div>
      {open && (
        <div className="sc-fade absolute top-full right-0 z-40 mt-2 min-w-[180px] rounded-lg border border-sc-border-soft bg-white p-1 shadow-[0_6px_24px_rgba(20,19,15,.10)]">
          <button
            type="button"
            className={item}
            onClick={() => {
              setOpen(false);
              navigate({ to: '/member/profile' });
            }}
          >
            <UserRound size={14} /> Hồ sơ cá nhân
          </button>
          <div className="my-1 h-px bg-sc-border-soft" />
          <button
            type="button"
            className={item}
            onClick={() => {
              setOpen(false);
              navigate({ to: '/' });
            }}
          >
            <LogOut size={14} /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

function Shell() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sc_nav_collapsed') === '1';
    } catch {
      return false;
    }
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('sc_nav_collapsed', collapsed ? '1' : '0');
    } catch {
      // empty
    }
  }, [collapsed]);

  const tabItems = memberMobileTabs.map((t) => ({ ...flatNav.find((i) => i.key === t.key)!, label: t.label }));

  return (
    <div className="flex min-h-screen bg-sc-paper font-body text-sc-ink">
      {!isMobile && <SideNav collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />}
      {isMobile && navOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-[rgba(0,0,0,.45)]" onClick={() => setNavOpen(false)} />
          <div className="relative h-full w-[288px] max-w-full bg-sc-ink shadow-2xl">
            <SideNav collapsed={false} mobile onToggle={() => setNavOpen(false)} onNavigate={() => setNavOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className={`sticky top-0 z-10 flex h-16 items-center justify-between gap-2 border-b border-sc-border-soft bg-white/90 backdrop-blur-[8px] ${
            isMobile ? 'px-3' : 'px-6'
          }`}
        >
          {isMobile ? (
            <div className="flex min-w-0 items-center gap-1.5">
              <button type="button" className={HEADER_ICON_BTN} onClick={() => setNavOpen(true)} aria-label="Mở menu">
                <Menu size={18} />
              </button>
              <Link to={MEMBER_BASE} className="flex min-w-0 items-center gap-2 text-sc-ink no-underline">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sc-lime text-sc-ink">
                  <Zap size={14} fill="currentColor" />
                </span>
                <b className="whitespace-nowrap text-sm">Sports Center</b>
              </Link>
            </div>
          ) : (
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
                onClick={() => setCollapsed((c) => !c)}
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-sc-border bg-white text-[#3d3b35] transition-all hover:border-[#b9d3c5] hover:bg-sc-primary-soft hover:text-sc-primary"
              >
                {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-[38px] w-[380px] max-w-full cursor-pointer items-center gap-2.5 rounded-lg border border-sc-border bg-white pr-1.5 pl-3.5 text-left text-[13px] text-[#9a968c] shadow-[0_1px_2px_rgba(20,19,15,.03)] transition-all hover:border-[#b9d3c5] hover:text-sc-muted hover:shadow-[0_0_0_3px_rgba(15,77,52,.10)]"
              >
                <Search size={15} className="text-sc-muted" />
                <span className="flex-1 truncate">Tìm thành viên, lớp học, hóa đơn…</span>
                <span className="inline-flex gap-1">
                  <Kbd>Ctrl</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </button>
            </div>
          )}

          <div className={`flex items-center ${isMobile ? 'gap-0' : 'gap-1'}`}>
            {isMobile && (
              <button
                type="button"
                className={HEADER_ICON_BTN}
                onClick={() => setSearchOpen(true)}
                aria-label="Tìm kiếm"
              >
                <Search size={17} />
              </button>
            )}
            <NotificationBell isMobile={isMobile} />
            <UserMenu isMobile={isMobile} />
          </div>
        </header>

        <main
          className={`mx-auto w-full min-w-0 max-w-[1440px] ${isMobile ? 'px-3 pt-3.5 pb-[84px]' : 'px-7 pt-6 pb-10'}`}
        >
          <Outlet />
        </main>

        {isMobile && (
          <nav className="fixed right-0 bottom-0 left-0 z-30 grid grid-cols-5 border-t border-sc-border-soft bg-white/96 px-1 pt-1.5 pb-[calc(6px+env(safe-area-inset-bottom))] backdrop-blur-[10px]">
            {tabItems.map((it) => {
              const active = isNavActive(it.key, pathname);
              return (
                <Link
                  key={it.key}
                  to={it.key}
                  className={`flex flex-col items-center gap-0.5 rounded-[10px] px-0.5 py-1 text-[10.5px] font-medium no-underline ${active ? 'text-sc-primary' : 'text-sc-muted'}`}
                >
                  <span
                    className={`inline-flex leading-none [&>svg]:h-[19px] [&>svg]:w-[19px] ${active ? '-mx-3 -mt-[3px] rounded-[10px] bg-sc-primary-soft px-3 py-[3px]' : ''}`}
                  >
                    {it.icon}
                  </span>
                  <span className="max-w-full truncate">{it.label}</span>
                </Link>
              );
            })}
            <a
              onClick={() => setNavOpen(true)}
              className="flex cursor-pointer flex-col items-center gap-0.5 rounded-[10px] px-0.5 py-1 text-[10.5px] font-medium text-sc-muted"
            >
              <span className="inline-flex leading-none">
                <LayoutGrid size={19} />
              </span>
              <span>Menu</span>
            </a>
          </nav>
        )}
        <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </div>
  );
}

export function MemberLayout() {
  return (
    <MemberProvider>
      <Shell />
    </MemberProvider>
  );
}
