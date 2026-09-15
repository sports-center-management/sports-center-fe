import { createFileRoute } from '@tanstack/react-router';
import { ClipboardList } from 'lucide-react';

export const Route = createFileRoute('/member/workout-plans')({
  component: () => (
    <div className="sc-card-box">
      <div className="sc-card-box-header">
        <div className="sc-card-box-title">
          <ClipboardList size={20} style={{ color: 'var(--sc-primary)' }} />
          <h3>Kế Hoạch & Bài Tập Được Giao</h3>
        </div>
      </div>
      <p style={{ color: '#666' }}>Lộ trình luyện tập cá nhân hóa do HLV xây dựng dành riêng cho bạn.</p>
    </div>
  ),
});
