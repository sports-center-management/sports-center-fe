import { createFileRoute } from '@tanstack/react-router';
import { LifeBuoy } from 'lucide-react';

export const Route = createFileRoute('/member/support')({
  component: () => (
    <div className="sc-card-box">
      <div className="sc-card-box-header">
        <div className="sc-card-box-title">
          <LifeBuoy size={20} style={{ color: 'var(--sc-primary)' }} />
          <h3>Trung Tâm Yêu Cầu Hỗ Trợ</h3>
        </div>
      </div>
      <p style={{ color: '#666' }}>
        Gửi phản hồi, yêu cầu bảo trì thiết bị hoặc giải đáp thắc mắc về gói thẻ hội viên.
      </p>
    </div>
  ),
});
