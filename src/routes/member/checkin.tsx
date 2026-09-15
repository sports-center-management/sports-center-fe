import { createFileRoute } from '@tanstack/react-router';
import { QrCode } from 'lucide-react';
import { CURRENT_MEMBER_USER } from '~/features/member-dashboard/data/mockData';

export const Route = createFileRoute('/member/checkin')({
  component: () => (
    <div className="sc-card-box" style={{ maxWidth: '500px', textAlign: 'center', margin: '2rem auto' }}>
      <QrCode size={48} style={{ color: 'var(--sc-primary)', marginBottom: '1rem' }} />
      <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0' }}>Mã Check-in Kỹ Thuật Số</h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        Đưa mã QR này vào thiết bị quét tại cổng vào Sports Center để hoàn tất điểm danh.
      </p>
      <div
        style={{
          background: '#ffffff',
          border: '2px dashed var(--sc-primary)',
          borderRadius: '16px',
          padding: '2rem',
          margin: '1.5rem 0',
        }}
      >
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--sc-primary)', letterSpacing: '0.15em' }}>
          {CURRENT_MEMBER_USER.memberCode}
        </div>
      </div>
    </div>
  ),
});
