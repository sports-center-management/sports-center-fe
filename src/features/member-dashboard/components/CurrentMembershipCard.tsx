import { CheckCircle2, QrCode, RefreshCw } from 'lucide-react';
import React from 'react';
import { CURRENT_MEMBER_USER, MOCK_CURRENT_MEMBERSHIP } from '../data/mockData';

export const CurrentMembershipCard: React.FC = () => {
  const membership = MOCK_CURRENT_MEMBERSHIP;
  const user = CURRENT_MEMBER_USER;
  const usagePercentage = Math.round((membership.usedSessions / membership.totalSessions) * 100);

  return (
    <div className="bg-white border border-sc-border rounded-2xl p-6 mb-6 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-sc-border-soft">
        <div className="flex items-center gap-2">
          <QrCode size={20} className="text-sc-primary" />
          <h3 className="font-display font-bold text-lg text-sc-ink">Thẻ Hội Viên Kỹ Thuật Số</h3>
        </div>
        <span className="bg-sc-lime text-sc-primary-dark font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
          ĐANG HOẠT ĐỘNG
        </span>
      </div>

      {/* Digital VIP Card */}
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl border border-sc-lime/30">
        <div className="flex justify-between items-start mb-6">
          <span className="bg-gradient-to-r from-sc-lime to-lime-400 text-sc-primary-dark font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            {user.membershipTier} MEMBER
          </span>
          <span className="font-mono text-sm tracking-widest text-sc-lime">{user.memberCode}</span>
        </div>

        <div className="mb-6">
          <h4 className="font-display font-bold text-2xl tracking-wide mb-1">{user.fullName}</h4>
          <p className="text-sm text-zinc-400">{membership.planName}</p>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold text-sc-lime mb-1">
              <span>Số buổi đã sử dụng</span>
              <span>
                {membership.usedSessions}/{membership.totalSessions} buổi ({usagePercentage}%)
              </span>
            </div>
            <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
              <div className="bg-sc-lime h-full rounded-full" style={{ width: `${usagePercentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-zinc-400">
          <span>Ngày hết hạn: {membership.endDate}</span>
          <span>Sports Center VIP Club</span>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-5">
        <h4 className="text-xs font-bold text-sc-ink uppercase tracking-wider mb-3">Quyền lợi gói thẻ của bạn:</h4>
        <ul className="space-y-2 text-sm text-zinc-700">
          {membership.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-sc-primary shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="w-full mt-6 bg-sc-lime text-sc-primary-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-lime-300 transition-colors shadow-md cursor-pointer"
        onClick={() => alert('Chuyển hướng đến trang gia hạn!')}
      >
        <RefreshCw size={16} />
        <span>Gia hạn gói tập</span>
      </button>
    </div>
  );
};
