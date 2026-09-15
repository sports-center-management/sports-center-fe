import { createFileRoute } from '@tanstack/react-router';
import { CalendarPlus } from 'lucide-react';

export const Route = createFileRoute('/member/court-booking')({
  component: () => (
    <div className="sc-card-box">
      <div className="sc-card-box-header">
        <div className="sc-card-box-title">
          <CalendarPlus size={20} style={{ color: 'var(--sc-primary)' }} />
          <h3>Đặt Sân Thể Thao</h3>
        </div>
      </div>
      <p style={{ color: '#666' }}>
        Chọn môn thể thao (Cầu lông, Tennis, Bóng rổ, Futsal) và giữ lịch đặt sân theo giờ.
      </p>
    </div>
  ),
});
