import type { ReactNode } from 'react';
import { Card } from './ui/Card';

interface Props {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  color?: string; // hex
  hint?: string;
  onClick?: () => void;
}

const hexToRgba = (hex: string, a: number) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

export function StatCard({ title, value, icon, color = '#0f4d34', hint, onClick }: Props) {
  // Số tiền dài: cho phép co chữ theo bề rộng ô, không bao giờ cắt
  const fontSize =
    typeof value === 'string'
      ? value.length > 13
        ? 'clamp(15px, 1.4vw, 18px)'
        : value.length > 10
          ? 'clamp(16px, 1.6vw, 20px)'
          : value.length > 7
            ? 24
            : 28
      : 28;
  return (
    <Card
      hoverable={!!onClick}
      onClick={onClick}
      className="h-full"
      bodyClassName="flex h-full items-center max-md:p-3!"
    >
      <div className="flex w-full items-center gap-4 max-md:gap-2.5">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] max-md:h-[34px] max-md:w-[34px] max-md:rounded-[10px] [&>svg]:h-[22px] [&>svg]:w-[22px] max-md:[&>svg]:h-4 max-md:[&>svg]:w-4"
          style={{ background: hexToRgba(color, 0.12), color }}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-sc-muted max-md:text-xs">{title}</div>
          <div
            className="font-display font-extrabold leading-[1.1] whitespace-nowrap tabular-nums text-sc-ink max-md:text-base! max-md:tracking-[-.03em]"
            style={{ fontSize }}
          >
            {value}
          </div>
          <div className="mt-0.5 truncate text-xs text-[#9a968c]" title={hint}>
            {hint ?? ' '}
          </div>
        </div>
      </div>
    </Card>
  );
}
