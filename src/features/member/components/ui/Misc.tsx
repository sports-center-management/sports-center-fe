import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

/** Trạng thái rỗng kiểu antd Empty (simple). */
export function Empty({
  description = 'Không có dữ liệu',
  className = '',
}: {
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 text-sm text-[#9a968c] ${className}`}>
      <Inbox size={40} strokeWidth={1.2} className="mb-2 text-[#d8d3c7]" />
      {description}
    </div>
  );
}

/** Bảng mô tả có viền (antd Descriptions bordered size=small, column=1). */
export function Descriptions({ items }: { items: { label: ReactNode; children: ReactNode }[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-sc-border-soft">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {items.map((it, i) => (
            <tr key={i} className="border-b border-sc-border-soft last:border-b-0">
              <th className="w-[180px] bg-[#f7f5f0] px-4 py-2 text-left font-medium text-sc-muted max-md:w-[120px]">
                {it.label}
              </th>
              <td className="px-4 py-2 text-sc-ink">{it.children}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Nút chọn dạng segmented (antd Segmented). */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="inline-flex h-[38px] items-center rounded-lg bg-[#f3f1ec] p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`h-full cursor-pointer rounded-md px-3 text-sm font-medium transition-all ${
            o.value === value
              ? 'bg-white text-sc-ink shadow-[0_1px_2px_rgba(0,0,0,.06)]'
              : 'text-sc-muted hover:text-sc-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-md border border-sc-border border-b-2 bg-sc-paper px-1.5 font-body text-[11px] font-semibold leading-4 text-sc-muted">
      {children}
    </kbd>
  );
}

/** Alert kiểu antd (warning / error) với nút hành động. */
export function Alert({ type, title, action }: { type: 'warning' | 'error'; title: ReactNode; action?: ReactNode }) {
  const c =
    type === 'warning'
      ? 'border-[#ffe58f] bg-[#fffbe6] text-[#d48806]'
      : 'border-[#ffccc7] bg-[#fff2f0] text-[#cf1322]';
  return (
    <div className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm ${c}`}>
      <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-current text-[10px] font-bold">
        !
      </span>
      <div className="flex-1 text-sc-ink">{title}</div>
      {action}
    </div>
  );
}
