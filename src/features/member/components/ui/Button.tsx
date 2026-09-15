import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'text';
  size?: 'small' | 'middle';
  icon?: ReactNode;
  block?: boolean;
}

const VARIANT: Record<NonNullable<Props['variant']>, string> = {
  default: 'border border-sc-border bg-white text-sc-ink hover:border-sc-primary hover:text-sc-primary',
  primary: 'border border-sc-primary bg-sc-primary text-white hover:bg-[#1f6a4a] hover:border-[#1f6a4a]',
  text: 'border border-transparent bg-transparent text-sc-ink hover:bg-[rgba(0,0,0,.06)]',
};

export function Button({
  variant = 'default',
  size = 'middle',
  icon,
  block,
  className = '',
  children,
  ...rest
}: Props) {
  const h = size === 'small' ? 'h-7 px-2.5 text-[13px] rounded-md gap-1.5' : 'h-[38px] px-4 text-sm rounded-lg gap-2';
  const iconOnly = icon && !children ? (size === 'small' ? 'w-7 px-0' : 'w-[38px] px-0') : '';
  return (
    <button
      type="button"
      {...rest}
      className={`inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-45 ${h} ${iconOnly} ${VARIANT[variant]} ${
        block ? 'w-full' : ''
      } ${className}`}
    >
      {icon && <span className="inline-flex items-center [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      {children}
    </button>
  );
}
