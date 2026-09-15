import { Link } from '@tanstack/react-router';
import { CalendarPlus, Dumbbell, Sparkles } from 'lucide-react';
import React from 'react';
import { CURRENT_MEMBER_USER } from '../data/mockData';
import { CurrentMembershipCard } from './CurrentMembershipCard';
import { MemberSummaryCards } from './MemberSummaryCards';
import { RecentActivities } from './RecentActivities';
import { UpcomingClasses } from './UpcomingClasses';

export const MemberDashboard: React.FC = () => {
  const user = CURRENT_MEMBER_USER;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sc-primary-dark via-sc-primary to-emerald-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div>
          <h2 className="font-display text-3xl font-extrabold tracking-wide mb-1">
            Chào mừng trở lại, {user.fullName}! 👋
          </h2>
          <p className="text-emerald-100 text-sm">
            Hôm nay là một ngày tuyệt vời để rèn luyện sức khỏe tại Sports Center!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/member/court-booking"
            className="bg-sc-lime text-sc-primary-dark font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-lime-300 transition-all shadow-md text-sm"
          >
            <CalendarPlus size={18} />
            <span>Đặt sân ngay</span>
          </Link>
          <Link
            to="/member/classes"
            className="bg-white/10 text-white font-semibold px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all border border-white/20 text-sm backdrop-blur-md"
          >
            <Dumbbell size={18} />
            <span>Lớp học</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <MemberSummaryCards />

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <UpcomingClasses />
          <RecentActivities />
        </div>

        <div className="lg:col-span-4">
          <CurrentMembershipCard />

          {/* AI Shortcut Card */}
          <div className="bg-gradient-to-br from-sc-primary-soft to-sc-lime p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-sc-primary-dark" />
              <h4 className="font-bold text-sc-primary-dark text-base">Trợ Lý AI Thể Thao</h4>
            </div>
            <p className="text-xs text-emerald-900 mb-4 leading-relaxed">
              Bạn cần gợi ý thực đơn dinh dưỡng hay bài tập phù hợp hôm nay? Hãy hỏi Trợ Lý AI của bạn ngay!
            </p>
            <Link
              to="/member/ai-assistant"
              className="w-full bg-sc-primary-dark text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-900 transition-colors text-sm"
            >
              <Sparkles size={16} className="text-sc-lime" />
              <span>Hỏi Trợ Lý AI</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
