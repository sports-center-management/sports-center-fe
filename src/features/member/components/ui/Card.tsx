import type { CSSProperties, ReactNode } from 'react';

interface Props {
  title?: ReactNode;
  extra?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  style?: CSSProperties;
  hoverable?: boolean;
  onClick?: () => void;
}

/** Card kiểu antd: viền mềm, bóng nhẹ, head 52px. */
export function Card({ title, extra, children, className = '', bodyClassName = '', style, hoverable, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`rounded-xl border border-sc-border-soft bg-white shadow-[0_1px_2px_rgba(20,19,15,.03),0_2px_10px_rgba(20,19,15,.04)] ${
        hoverable
          ? 'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(20,19,15,.10)]'
          : ''
      } ${className}`}
    >
      {(title || extra) && (
        <div className="flex min-h-[52px] items-center justify-between gap-3 border-b border-sc-border-soft px-5 text-[15px] font-semibold text-sc-ink">
          <div className="min-w-0 truncate">{title}</div>
          {extra && <div className="shrink-0 text-sm font-normal">{extra}</div>}
        </div>
      )}
      <div className={`p-5 max-md:p-3.5 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
