import { Outlet } from '@tanstack/react-router';
import { Bell, Menu, QrCode, Search } from 'lucide-react';
import React, { useState } from 'react';
import { MemberSidebar } from '../../features/member-dashboard/components/MemberSidebar';

export const MemberLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-sc-paper text-sc-ink font-body">
      <MemberSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-sc-border-soft px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-sc-ink p-1 cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Sidebar"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-display text-xl font-bold text-sc-ink">Khu vực Hội viên</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 bg-sc-primary-soft text-sc-primary px-3.5 py-1.5 rounded-full text-xs font-semibold border border-sc-primary/15 hover:bg-sc-primary hover:text-white transition-all cursor-pointer"
              onClick={() => alert('Mã QR Check-in: SC-VIP-8892')}
            >
              <QrCode size={16} />
              <span>QR Check-in nhanh</span>
            </button>

            <button className="w-9.5 h-9.5 rounded-full bg-[#f4f2ec] border border-sc-line flex items-center justify-center text-sc-ink-2 hover:bg-sc-paper-2 hover:text-sc-primary transition-colors cursor-pointer">
              <Search size={18} />
            </button>

            <button className="w-9.5 h-9.5 rounded-full bg-[#f4f2ec] border border-sc-line flex items-center justify-center text-sc-ink-2 hover:bg-sc-paper-2 hover:text-sc-primary transition-colors relative cursor-pointer">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sc-accent rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
