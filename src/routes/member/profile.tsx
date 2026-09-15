/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { Home, KeyRound, Pencil, Upload } from 'lucide-react';
import { CURRENT_MEMBER_USER } from '../../features/member-dashboard/data/mockData';

export const Route = createFileRoute('/member/profile')({
  component: MemberProfilePage,
});

function MemberProfilePage() {
  const user = CURRENT_MEMBER_USER;

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <Home size={14} />
            <span>/</span>
            <span className="font-medium text-zinc-700">Hồ sơ cá nhân</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-sc-ink uppercase tracking-wide">HỒ SƠ CÁ NHÂN</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            className="bg-white border border-sc-line px-4 py-2 rounded-xl text-sm font-semibold text-sc-ink hover:bg-sc-paper-2 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            onClick={() => alert('Đổi mật khẩu')}
          >
            <KeyRound size={16} />
            <span>Đổi mật khẩu</span>
          </button>
          <button
            className="bg-sc-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-sc-primary-dark transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            onClick={() => alert('Chỉnh sửa thông tin')}
          >
            <Pencil size={16} />
            <span>Chỉnh sửa</span>
          </button>
        </div>
      </div>

      {/* Profile Layout (Grid 2 cột) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cột trái: Card Avatar & Thông tin cơ bản */}
        <div className="lg:col-span-4 bg-white border border-sc-border rounded-2xl overflow-hidden shadow-xs text-center pb-6">
          {/* Cover Header Banner */}
          <div className="h-32 bg-gradient-to-r from-sc-primary-dark to-sc-primary"></div>

          {/* Avatar Circle */}
          <div className="relative -mt-16 mb-4 flex justify-center">
            <div className="w-28 h-28 rounded-full bg-sc-lime text-sc-primary-dark border-4 border-white flex items-center justify-center font-display font-extrabold text-3xl shadow-lg overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
              ) : (
                'TD'
              )}
            </div>
          </div>

          <h3 className="font-bold text-xl text-sc-ink mb-1">{user.fullName}</h3>
          <span className="inline-block bg-lime-100 text-lime-800 text-xs font-bold px-3 py-1 rounded-full mb-6">
            Thành viên
          </span>

          <div className="px-6">
            <button
              className="w-full border border-sc-line bg-sc-paper hover:bg-sc-paper-2 text-sc-ink-2 text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              onClick={() => alert('Tải ảnh đại diện mới')}
            >
              <Upload size={14} />
              <span>Đổi ảnh đại diện</span>
            </button>
          </div>
        </div>

        {/* Cột phải: Bảng chi tiết hồ sơ cá nhân */}
        <div className="lg:col-span-8 bg-white border border-sc-border rounded-2xl p-6 shadow-xs">
          <div className="border border-sc-border-soft rounded-xl overflow-hidden divide-y divide-sc-border-soft">
            {/* Email */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Email</div>
              <div className="col-span-8 p-3.5 font-medium text-zinc-900">member.dung@gmail.com</div>
            </div>

            {/* Số điện thoại */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Số điện thoại</div>
              <div className="col-span-8 p-3.5 font-medium text-zinc-900">0912000001</div>
            </div>

            {/* Trạng thái */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Trạng thái</div>
              <div className="col-span-8 p-3.5">
                <span className="bg-lime-100 text-lime-800 text-xs font-bold px-2.5 py-1 rounded-md">
                  Đang hoạt động
                </span>
              </div>
            </div>

            {/* Ngày tham gia */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Ngày tham gia</div>
              <div className="col-span-8 p-3.5 font-medium text-zinc-900">2026-06-17</div>
            </div>

            {/* Ngày sinh */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Ngày sinh</div>
              <div className="col-span-8 p-3.5 font-medium text-zinc-900">1998-05-12</div>
            </div>

            {/* Giới tính */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Giới tính</div>
              <div className="col-span-8 p-3.5 font-bold text-pink-600">Nữ</div>
            </div>

            {/* Mục tiêu tập luyện */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Mục tiêu tập luyện</div>
              <div className="col-span-8 p-3.5 font-medium text-zinc-900">Giảm 5kg trong 3 tháng</div>
            </div>

            {/* Trình độ */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Trình độ</div>
              <div className="col-span-8 p-3.5">
                <span className="bg-zinc-100 text-zinc-700 text-xs font-bold px-2.5 py-1 rounded-md">Mới bắt đầu</span>
              </div>
            </div>

            {/* Ghi chú sức khỏe */}
            <div className="grid grid-cols-12 text-sm">
              <div className="col-span-4 bg-[#f8f5ee] p-3.5 font-medium text-zinc-600">Ghi chú sức khỏe</div>
              <div className="col-span-8 p-3.5 font-medium text-zinc-900">Không</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
