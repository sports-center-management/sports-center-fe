import { createFileRoute } from '@tanstack/react-router';
import { Dumbbell } from 'lucide-react';

export const Route = createFileRoute('/member/classes')({
  component: () => (
    <div className="sc-card-box">
      <div className="sc-card-box-header">
        <div className="sc-card-box-title">
          <Dumbbell size={20} style={{ color: 'var(--sc-primary)' }} />
          <h3>Danh Sách Lớp Học Thể Thao</h3>
        </div>
      </div>
      <p style={{ color: '#666' }}>Các lớp Yoga, Gym, Pilates, Boxing và Bơi lội đang mở đăng ký.</p>
    </div>
  ),
});
