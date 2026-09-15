import type { CSSProperties } from 'react';
import { initialsOf } from '../../store/MemberProvider';

interface Props {
  name: string;
  size?: number;
  color?: string; // màu chữ; nền = màu này pha 15%
  bg?: string;
  className?: string;
  style?: CSSProperties;
}

/** Avatar chữ cái đầu (2 chữ cuối của tên) như demo. */
export function Avatar({ name, size = 32, color = '#7a776f', bg, className = '', style }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold leading-none ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.38),
        background: bg ?? `${color}26`,
        color,
        ...style,
      }}
    >
      {initialsOf(name)}
    </span>
  );
}
