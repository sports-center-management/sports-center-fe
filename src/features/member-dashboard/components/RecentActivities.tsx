import { Link } from '@tanstack/react-router';
import { Activity, CheckCircle, ChevronRight, CreditCard, Dumbbell } from 'lucide-react';
import React from 'react';
import { MOCK_RECENT_ACTIVITIES } from '../data/mockData';

export const RecentActivities: React.FC = () => {
  const activities = MOCK_RECENT_ACTIVITIES;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'checkin':
        return <CheckCircle size={18} className="text-sc-primary" />;
      case 'workout':
        return <Dumbbell size={18} className="text-sc-primary" />;
      case 'payment':
        return <CreditCard size={18} className="text-sc-accent" />;
      default:
        return <Activity size={18} className="text-sc-primary" />;
    }
  };

  return (
    <div className="bg-white border border-sc-border rounded-2xl p-6 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-sc-border-soft">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-sc-primary" />
          <h3 className="font-display font-bold text-lg text-sc-ink">Hoạt Động Gần Đây</h3>
        </div>
        <Link
          to="/member/payments"
          className="text-sc-primary font-semibold text-sm flex items-center gap-1 hover:text-sc-accent transition-colors"
        >
          <span>Xem tất cả</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="divide-y divide-zinc-100">
        {activities.map((item) => (
          <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === 'payment' ? 'bg-amber-50' : 'bg-sc-primary-soft'
                }`}
              >
                {getActivityIcon(item.type)}
              </div>
              <div>
                <h5 className="text-sm font-semibold text-sc-ink mb-0.5">{item.title}</h5>
                <p className="text-xs text-zinc-500">{item.description}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-zinc-400 block">{item.timestamp}</span>
              {item.amount && <span className="text-xs font-bold text-sc-accent">{item.amount}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
