import { createFileRoute } from '@tanstack/react-router';
import { CreditCard } from 'lucide-react';

export const Route = createFileRoute('/member/membership-plans')({
  component: () => (
    <div className="sc-card-box">
      <div className="sc-card-box-header">
        <div className="sc-card-box-title">
          <CreditCard size={20} style={{ color: 'var(--sc-primary)' }} />
          <h3>Gói Thành Viên Sports Center</h3>
        </div>
      </div>
      <p style={{ color: '#666' }}>Danh sách tất cả các gói thẻ tập VIP, Gold và Standard đang phát hành.</p>
    </div>
  ),
});
