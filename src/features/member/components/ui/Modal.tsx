import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';

interface Props {
  open: boolean;
  title?: ReactNode;
  onCancel: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  footer?: ReactNode | null;
  width?: number;
  top?: number;
  closable?: boolean;
  bodyClassName?: string;
  children: ReactNode;
}

export function Modal({
  open,
  title,
  onCancel,
  onOk,
  okText = 'OK',
  cancelText = 'Hủy',
  footer,
  width = 520,
  top = 100,
  closable = true,
  bodyClassName = '',
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-1000 overflow-y-auto bg-[rgba(0,0,0,.45)] px-2" onMouseDown={onCancel}>
      <div
        className="sc-fade relative mx-auto mb-6 w-full rounded-xl bg-white shadow-[0_6px_16px_rgba(0,0,0,.08),0_3px_6px_-4px_rgba(0,0,0,.12),0_9px_28px_8px_rgba(0,0,0,.05)]"
        style={{ maxWidth: width, marginTop: top }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <div className="text-base font-semibold text-sc-ink">{title}</div>
            {closable && (
              <button
                type="button"
                onClick={onCancel}
                className="-mr-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-sc-muted hover:bg-sc-paper hover:text-sc-ink"
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div className={`px-6 py-3 ${bodyClassName}`}>{children}</div>
        {footer !== null && (
          <div className="flex justify-end gap-2 px-6 pt-2 pb-5">
            {footer ?? (
              <>
                <Button onClick={onCancel}>{cancelText}</Button>
                <Button variant="primary" onClick={onOk}>
                  {okText}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
