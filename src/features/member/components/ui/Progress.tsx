interface Props {
  percent: number;
  strokeColor?: string;
  railColor?: string;
  className?: string;
}

/** Thanh tiến độ dạng line, cao 8px như antd Progress. */
export function Progress({ percent, strokeColor = '#0f4d34', railColor = '#f0ede6', className = '' }: Props) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full ${className}`} style={{ background: railColor }}>
      <div
        className="h-full rounded-full transition-[width] duration-300"
        style={{ width: `${p}%`, background: strokeColor }}
      />
    </div>
  );
}
