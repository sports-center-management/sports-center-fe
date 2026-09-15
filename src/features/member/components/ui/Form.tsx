import { ChevronDown } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

const CONTROL =
  'w-full rounded-lg border border-sc-border bg-white px-3 text-sm text-sc-ink outline-none transition-all duration-150 placeholder:text-[#9a968c] hover:border-sc-primary focus:border-sc-primary focus:shadow-[0_0_0_3px_rgba(15,77,52,.12)]';

/** Nhãn + ô nhập theo layout dọc của antd Form.Item. */
export function Field({
  label,
  required,
  children,
  className = '',
}: {
  label: ReactNode;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`mb-4 block ${className}`}>
      <span className="mb-1.5 block text-sm text-sc-ink">
        {required && <span className="mr-1 text-[#dc2626]">*</span>}
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input({ className = '', ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...rest} className={`${CONTROL} h-[38px] ${className}`} />;
}

export function TextArea({ className = '', rows = 3, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={rows} {...rest} className={`${CONTROL} resize-y py-2 leading-relaxed ${className}`} />;
}

export function Select({
  className = '',
  options,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }) {
  return (
    <span className="relative block">
      <select {...rest} className={`${CONTROL} h-[38px] cursor-pointer appearance-none pr-9 ${className}`}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#9a968c]" />
    </span>
  );
}
