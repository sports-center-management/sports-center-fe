import { createFileRoute } from '@tanstack/react-router';
import { TrendingUp } from 'lucide-react';

export const Route = createFileRoute('/member/progress')({
  component: () => (
    <div className="sc-card-box">
      <div className="sc-card-box-header">
        <div className="sc-card-box-title">
          <TrendingUp size={20} style={{ color: 'var(--sc-primary)' }} />
          <h3>Kết Quả & Tiến Độ Tập Luyện</h3>
        </div>
      </div>
      <p style={{ color: '#666' }}>Theo dõi chỉ số InBody, cân nặng, tỷ lệ cơ/mỡ và lượng calo tiêu thụ hàng tuần.</p>
    </div>
  ),
});
