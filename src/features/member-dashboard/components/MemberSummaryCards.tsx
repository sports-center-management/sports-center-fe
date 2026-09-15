import { Award, CalendarCheck, Dumbbell, UserCheck } from 'lucide-react';
import React from 'react';
import { MOCK_DASHBOARD_STATS } from '../data/mockData';

export const MemberSummaryCards: React.FC = () => {
  const stats = MOCK_DASHBOARD_STATS;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
      <div className="bg-white border border-sc-border rounded-xl p-5 flex items-center gap-4 shadow-xs hover:-translate-y-1 transition-transform">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-sc-accent flex items-center justify-center shrink-0">
          <CalendarCheck size={24} />
        </div>
        <div>
          <label className="text-xs font-semibold text-sc-muted block mb-0.5">Lịch tập sắp tới</label>
          <div className="font-display text-2xl font-extrabold text-sc-ink">{stats.upcomingBookingsCount} buổi</div>
          <span className="text-[11px] text-zinc-500">Đã xác nhận giữ chỗ</span>
        </div>
      </div>

      <div className="bg-white border border-sc-border rounded-xl p-5 flex items-center gap-4 shadow-xs hover:-translate-y-1 transition-transform">
        <div className="w-12 h-12 rounded-xl bg-sc-primary-soft text-sc-primary flex items-center justify-center shrink-0">
          <Dumbbell size={24} />
        </div>
        <div>
          <label className="text-xs font-semibold text-sc-muted block mb-0.5">Số buổi tập tháng này</label>
          <div className="font-display text-2xl font-extrabold text-sc-ink">{stats.monthlyWorkoutsCount} buổi</div>
          <span className="text-[11px] text-zinc-500">Tăng 15% so với tháng trước</span>
        </div>
      </div>

      <div className="bg-white border border-sc-border rounded-xl p-5 flex items-center gap-4 shadow-xs hover:-translate-y-1 transition-transform">
        <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center shrink-0">
          <Award size={24} />
        </div>
        <div>
          <label className="text-xs font-semibold text-sc-muted block mb-0.5">Điểm thưởng tích lũy</label>
          <div className="font-display text-2xl font-extrabold text-sc-ink">{stats.rewardPoints} pts</div>
          <span className="text-[11px] text-zinc-500">Hạng thẻ VIP Platinum</span>
        </div>
      </div>

      <div className="bg-white border border-sc-border rounded-xl p-5 flex items-center gap-4 shadow-xs hover:-translate-y-1 transition-transform">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <UserCheck size={24} />
        </div>
        <div>
          <label className="text-xs font-semibold text-sc-muted block mb-0.5">HLV Phụ trách</label>
          <div className="font-display text-lg font-bold text-sc-ink truncate">{stats.assignedTrainerName}</div>
          <span className="text-[11px] text-zinc-500">10 buổi PT còn lại</span>
        </div>
      </div>
    </div>
  );
};
