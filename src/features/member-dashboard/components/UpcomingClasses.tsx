import { Link } from '@tanstack/react-router';
import { Calendar, ChevronRight, Clock, MapPin, User } from 'lucide-react';
import React from 'react';
import { MOCK_UPCOMING_SESSIONS } from '../data/mockData';

export const UpcomingClasses: React.FC = () => {
  const sessions = MOCK_UPCOMING_SESSIONS;

  return (
    <div className="bg-white border border-sc-border rounded-2xl p-6 mb-6 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-sc-border-soft">
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-sc-primary" />
          <h3 className="font-display font-bold text-lg text-sc-ink">Lịch Đặt & Lớp Học Sắp Đến</h3>
        </div>
        <Link
          to="/member/schedule"
          className="text-sc-primary font-semibold text-sm flex items-center gap-1 hover:text-sc-accent transition-colors"
        >
          <span>Xem tất cả</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-[#fcfbf8] border border-sc-border rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                    session.category === 'Lớp học'
                      ? 'bg-sc-primary-soft text-sc-primary'
                      : 'bg-amber-100 text-sc-accent'
                  }`}
                >
                  {session.category}
                </span>
                <span className="text-xs font-semibold text-zinc-500">{session.sport}</span>
              </div>

              <h4 className="font-bold text-base text-sc-ink mb-2">{session.title}</h4>

              <div className="flex flex-wrap gap-4 text-xs text-zinc-600">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-sc-primary" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-sc-primary" />
                  <span>{session.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={14} className="text-sc-primary" />
                  <span>{session.instructorOrCourt}</span>
                </div>
              </div>
            </div>

            <button
              className="px-3.5 py-1.5 border border-sc-line rounded-lg text-xs font-semibold text-sc-ink-2 hover:bg-sc-paper-2 transition-colors cursor-pointer"
              onClick={() => alert(`Chi tiết: ${session.title}`)}
            >
              Chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
