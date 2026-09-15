import type { ReactNode } from 'react';
import { STATUS_MAP, type TagColor } from '../../constants';

// Bảng màu preset của antd Tag (nền nhạt + chữ đậm), bỏ viền theo style demo.
const COLORS: Record<TagColor, string> = {
  default: 'bg-[#f3f1ec] text-[#3d3b35]',
  green: 'bg-[#f6ffed] text-[#389e0d]',
  red: 'bg-[#fff2f0] text-[#cf1322]',
  orange: 'bg-[#fff7e6] text-[#d46b08]',
  gold: 'bg-[#fffbe6] text-[#d48806]',
  blue: 'bg-[#e6f4ff] text-[#0958d9]',
  cyan: 'bg-[#e6fffb] text-[#08979c]',
  magenta: 'bg-[#fff0f6] text-[#c41d7f]',
  purple: 'bg-[#f9f0ff] text-[#531dab]',
  geekblue: 'bg-[#f0f5ff] text-[#1d39c4]',
  volcano: 'bg-[#fff2e8] text-[#d4380d]',
  pink: 'bg-[#fff0f6] text-[#c41d7f]',
};

export function Tag({
  color = 'default',
  children,
  className = '',
}: {
  color?: TagColor;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-[22px] items-center whitespace-nowrap rounded-md px-[9px] text-xs font-semibold leading-[22px] ${COLORS[color]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusTag({ value }: { value?: string }) {
  if (!value) return null;
  const m = STATUS_MAP[value] ?? { color: 'default' as TagColor, label: value };
  return <Tag color={m.color}>{m.label}</Tag>;
}
