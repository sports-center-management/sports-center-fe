import dayjs from 'dayjs';
import { Bell, Calendar, Check, CircleDollarSign, FileText, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Empty, Segmented } from '../components/ui/Misc';
import { useMember } from '../store/MemberProvider';

const kindOf = (title: string) => {
  const t = title.toLowerCase();
  if (/hết hạn|khóa/.test(t)) return { icon: <TriangleAlert size={17} />, color: '#f59e0b' };
  if (/lịch|lớp|phân công/.test(t)) return { icon: <Calendar size={17} />, color: '#0f4d34' };
  if (/thanh toán|gia hạn|kích hoạt|hóa đơn/.test(t)) return { icon: <CircleDollarSign size={17} />, color: '#16a34a' };
  if (/bài tập|kế hoạch|kết quả|nhận xét/.test(t)) return { icon: <FileText size={17} />, color: '#9333ea' };
  return { icon: <Bell size={17} />, color: '#7a776f' };
};

export function Notifications() {
  const { myNotifications, update } = useMember();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const all = myNotifications().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const list = filter === 'unread' ? all.filter((n) => !n.read) : all;
  const unread = all.filter((n) => !n.read).length;

  return (
    <Page
      title="Thông báo"
      subtitle={unread ? `${unread} thông báo chưa đọc` : 'Bạn đã đọc hết thông báo'}
      extra={
        <div className="flex gap-2">
          <Segmented
            value={filter}
            onChange={setFilter}
            options={[
              { value: 'all', label: `Tất cả (${all.length})` },
              { value: 'unread', label: `Chưa đọc (${unread})` },
            ]}
          />
          <Button
            icon={<Check />}
            disabled={!unread}
            onClick={() => all.forEach((n) => !n.read && update('notifications', n.id, { read: true }))}
          >
            Đọc tất cả
          </Button>
        </div>
      }
    >
      {list.length === 0 ? (
        <Empty description="Không có thông báo" />
      ) : (
        <div className="flex flex-col gap-2">
          {list.map((n) => {
            const k = kindOf(n.title);
            return (
              <div
                key={n.id}
                onClick={() => !n.read && update('notifications', n.id, { read: true })}
                className={`flex gap-3.5 rounded-xl border p-3.5 transition-colors ${n.read ? 'cursor-default border-[#f1f4f9] bg-white' : 'cursor-pointer border-[#dbe6ff] bg-[#f5f8ff]'}`}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${k.color}1a`, color: k.color }}
                >
                  {k.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3">
                    <div className={`text-sm ${n.read ? 'font-medium' : 'font-bold'}`}>{n.title}</div>
                    <span className="whitespace-nowrap text-xs text-[#9a968c]" title={n.createdAt}>
                      {dayjs(n.createdAt).fromNow()}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[13.5px] text-sc-ink-2">{n.content}</div>
                </div>
                {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sc-primary" />}
              </div>
            );
          })}
        </div>
      )}
    </Page>
  );
}
