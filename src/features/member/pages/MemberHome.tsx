import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Bell, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { Page } from '../components/Page';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Alert } from '../components/ui/Misc';
import { Progress } from '../components/ui/Progress';
import { StatusTag, Tag } from '../components/ui/Tag';
import { DAY_NAMES, useMember } from '../store/MemberProvider';

export function MemberHome() {
  const { data, currentUser: me, activeSubscription, membershipStatus, nameOf } = useMember();
  const navigate = useNavigate();
  const sub = activeSubscription(me.id);
  const st = membershipStatus(me.id);
  const plan = sub && data.plans.find((p) => p.id === sub.planId);
  const daysLeft = sub ? Math.max(0, dayjs(sub.endDate).diff(dayjs(), 'day')) : 0;
  const pct = sub && plan ? Math.round((daysLeft / plan.durationDays) * 100) : 0;

  const myClasses = data.enrollments
    .filter((e) => e.memberId === me.id && e.status === 'ACTIVE')
    .map((e) => data.classes.find((c) => c.id === e.classId)!)
    .filter(Boolean);
  const upcoming = data.schedules
    .filter((s) => myClasses.some((c) => c.id === s.classId))
    .sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime))
    .slice(0, 5);
  const unread = data.notifications.filter((n) => n.userId === me.id && !n.read);
  const att = data.attendances.filter((a) => a.memberId === me.id);
  const attendanceRate = att.length
    ? Math.round((att.filter((a) => a.status !== 'ABSENT').length / att.length) * 100)
    : 0;

  return (
    <Page
      title={`Xin chào, ${me.fullName.split(' ').pop()} 👋`}
      subtitle={me.goal ? `Mục tiêu: ${me.goal}` : undefined}
      noCard
    >
      {(st === 'EXPIRING' || st === 'EXPIRED' || st === 'NONE') && (
        <Alert
          type={st === 'EXPIRING' ? 'warning' : 'error'}
          title={
            st === 'EXPIRING'
              ? `Gói ${plan?.name} sẽ hết hạn sau ${daysLeft} ngày`
              : 'Bạn chưa có gói thành viên còn hiệu lực'
          }
          action={
            <Button size="small" variant="primary" onClick={() => navigate({ to: '/member/membership-plans' })}>
              {st === 'EXPIRING' ? 'Gia hạn ngay' : 'Xem gói'}
            </Button>
          }
        />
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-[9fr_5fr_5fr_5fr]">
        <div className="col-span-2 md:col-span-1">
          <Card
            className="h-full border-none! text-white"
            style={{ background: 'linear-gradient(135deg,#14130f 0%,#0f4d34 120%)' }}
            bodyClassName="p-[22px]!"
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] opacity-70">Gói thành viên</span>
              <StatusTag value={st} />
            </div>
            {sub && plan ? (
              <>
                <div className="mt-2.5 text-[34px] font-bold tracking-[-1px]">
                  {daysLeft} <span className="text-sm font-medium opacity-80">ngày còn lại</span>
                </div>
                <Progress percent={pct} strokeColor="#e07a4f" railColor="rgba(255,255,255,.15)" className="my-1.5" />
                <div className="text-[13px] opacity-85">
                  {plan.name} · hết hạn {dayjs(sub.endDate).format('DD/MM/YYYY')}
                </div>
              </>
            ) : (
              <Button className="mt-4" onClick={() => navigate({ to: '/member/membership-plans' })}>
                Đăng ký gói ngay
              </Button>
            )}
          </Card>
        </div>
        <StatCard
          title="Lớp đang học"
          value={myClasses.length}
          icon={<BookOpen />}
          color="#9333ea"
          onClick={() => navigate({ to: '/member/classes' })}
        />
        <StatCard
          title="Chuyên cần"
          value={`${attendanceRate}%`}
          icon={<Calendar />}
          color="#16a34a"
          hint={`${att.length} buổi đã điểm danh`}
          onClick={() => navigate({ to: '/member/checkin' })}
        />
        <StatCard
          title="Thông báo mới"
          value={unread.length}
          icon={<Bell />}
          color="#c94a1e"
          onClick={() => navigate({ to: '/member/notifications' })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[14fr_10fr]">
        <Card
          title="Lịch tập tuần này"
          extra={
            <a
              className="inline-flex cursor-pointer items-center gap-1 text-sc-primary hover:underline"
              onClick={() => navigate({ to: '/member/schedule' })}
            >
              Xem lịch đầy đủ <ChevronRight size={12} />
            </a>
          }
          bodyClassName="py-0!"
        >
          {upcoming.length === 0 && (
            <div className="py-8 text-center text-sm text-[#9a968c]">Bạn chưa đăng ký lớp nào</div>
          )}
          {upcoming.map((s) => {
            const c = myClasses.find((x) => x.id === s.classId)!;
            return (
              <div key={s.id} className="flex items-center gap-4 border-b border-sc-border-soft py-3 last:border-b-0">
                <div className="w-[52px] shrink-0 rounded-[10px] bg-sc-primary-soft py-1.5 text-center text-xs leading-[1.3] font-bold text-sc-primary">
                  {DAY_NAMES[s.dayOfWeek].replace('Thứ ', 'T')}
                  <br />
                  <span className="font-medium">{s.startTime}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm">
                    <b>{c.name}</b>
                  </div>
                  <div className="mt-1 text-sm text-sc-muted">
                    {s.startTime} – {s.endTime} · HLV {nameOf(c.coachId)}
                  </div>
                </div>
                <Tag>{data.rooms.find((r) => r.id === c.roomId)?.name}</Tag>
              </div>
            );
          })}
        </Card>
        <Card
          title="Thông báo mới"
          extra={
            <a
              className="cursor-pointer text-sc-primary hover:underline"
              onClick={() => navigate({ to: '/member/notifications' })}
            >
              Tất cả
            </a>
          }
          bodyClassName="py-0!"
        >
          {unread.length === 0 && <div className="py-8 text-center text-sm text-[#9a968c]">Không có thông báo mới</div>}
          {unread.slice(0, 4).map((n) => (
            <div key={n.id} className="border-b border-sc-border-soft py-2.5 last:border-b-0">
              <div className="text-sm font-semibold">{n.title}</div>
              <div className="mt-0.5 text-sm text-sc-muted">{n.content}</div>
            </div>
          ))}
        </Card>
      </div>
    </Page>
  );
}
