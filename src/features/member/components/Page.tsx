import { Link, useLocation } from '@tanstack/react-router';
import { Home } from 'lucide-react';
import type { ReactNode } from 'react';
import { MEMBER_BASE, flatNav } from '../nav';
import { Card } from './ui/Card';

interface Props {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
  children: ReactNode;
  noCard?: boolean;
}

function useCrumbs(title: string) {
  const { pathname } = useLocation();
  const items: ReactNode[] = [
    <Link key="home" to={MEMBER_BASE} className="inline-flex text-sc-muted hover:text-sc-ink">
      <Home size={13} />
    </Link>,
  ];
  if (pathname === MEMBER_BASE || pathname === `${MEMBER_BASE}/`) return items;
  const hit = flatNav
    .filter((i) => i.key !== MEMBER_BASE && (pathname === i.key || pathname.startsWith(i.key + '/')))
    .sort((a, b) => b.key.length - a.key.length)[0];
  if (hit) {
    if (hit.section)
      items.push(
        <span key="sec" className="text-sc-muted">
          {hit.section}
        </span>,
      );
    if (pathname === hit.key)
      items.push(
        <span key="cur" className="font-medium text-sc-ink">
          {hit.label}
        </span>,
      );
    else {
      items.push(
        <Link key="hit" to={hit.key} className="text-sc-muted hover:text-sc-ink">
          {hit.label}
        </Link>,
      );
      items.push(
        <span key="cur" className="font-medium text-sc-ink">
          {title}
        </span>,
      );
    }
    return items;
  }
  items.push(
    <span key="cur" className="font-medium text-sc-ink">
      {title}
    </span>,
  );
  return items;
}

/** Khung trang: breadcrumb + tiêu đề display uppercase + nội dung (mặc định bọc trong Card). */
export function Page({ title, subtitle, extra, children, noCard }: Props) {
  const crumbs = useCrumbs(title);
  return (
    <div className="sc-page flex w-full flex-col gap-[18px] max-md:gap-3">
      <div className="sc-page-head">
        <nav className="mb-1.5 flex items-center gap-1 text-xs">
          {crumbs.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1">
              {i > 0 && <span className="mx-1 text-sc-muted">/</span>}
              {c}
            </span>
          ))}
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-3 max-md:items-start">
          <div>
            <h1 className="m-0 font-display text-[28px] font-extrabold uppercase leading-[1.05] tracking-[.005em] text-sc-ink max-md:text-[23px]">
              {title}
            </h1>
            {subtitle && <div className="mt-1 text-[13.5px] text-sc-muted max-md:text-[12.5px]">{subtitle}</div>}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      </div>
      {noCard ? children : <Card>{children}</Card>}
    </div>
  );
}
