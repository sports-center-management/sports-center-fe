import { createFileRoute } from '@tanstack/react-router';
import { Users } from 'lucide-react';

export const Route = createFileRoute('/member/trainers')({
  component: () => (
    <div className="sc-card-box">
      <div className="sc-card-box-header">
        <div className="sc-card-box-title">
          <Users size={20} style={{ color: 'var(--sc-primary)' }} />
          <h3>Huấn Luyện Viên Của Tôi</h3>
        </div>
      </div>
      <p style={{ color: '#666' }}>Thông tin HLV cá nhân (PT), lịch hẹn 1-on-1 và tiến độ đánh giá bài tập.</p>
    </div>
  ),
});
