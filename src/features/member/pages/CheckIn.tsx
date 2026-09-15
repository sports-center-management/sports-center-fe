import dayjs from 'dayjs';
import { QRCodeSVG } from 'qrcode.react';
import { Page } from '../components/Page';
import { Card } from '../components/ui/Card';
import { Empty } from '../components/ui/Misc';
import { StatusTag } from '../components/ui/Tag';
import { useMember } from '../store/MemberProvider';

export function CheckIn() {
  const { data, currentUser: me } = useMember();
  const checkIns = data.checkIns.filter((c) => c.memberId === me.id).sort((a, b) => b.time.localeCompare(a.time));
  const att = data.attendances.filter((a) => a.memberId === me.id).sort((a, b) => b.date.localeCompare(a.date));
  const rate = att.length ? Math.round((att.filter((a) => a.status !== 'ABSENT').length / att.length) * 100) : 0;
  const th =
    'bg-[#f7f5f0] px-4 py-3 text-left font-display text-[13px] font-bold uppercase tracking-[.06em] text-sc-muted';
  const td = 'border-b border-sc-border-soft px-4 py-3 text-sm';

  return (
    <Page title="Điểm danh" subtitle={`Chuyên cần ${rate}% · ${att.length} buổi đã điểm danh`} noCard>
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
        <Card bodyClassName="text-center">
          <h3 className="m-0 font-display text-[22px] font-extrabold uppercase leading-none text-sc-ink">
            Mã check-in
          </h3>
          <p className="mt-2 mb-4 text-[13.5px] text-sc-muted">
            Đưa mã QR vào thiết bị quét tại cổng vào để hoàn tất điểm danh.
          </p>
          {/* Nội dung QR = mã thành viên; máy quét ở quầy đọc ra mã này */}
          <div className="inline-flex flex-col items-center rounded-xl border-2 border-dashed border-sc-primary bg-white p-4">
            <QRCodeSVG value={me.memberCode ?? me.id} size={168} level="M" fgColor="#14130f" />
            <div className="mt-3 font-display text-[22px] font-extrabold tracking-[.15em] text-sc-primary">
              {me.memberCode}
            </div>
          </div>
          <div className="mt-3 text-xs text-[#9a968c]">Mã gắn với tài khoản {me.email}</div>
        </Card>

        <div className="flex flex-col gap-4 md:col-span-2">
          <Card title="Điểm danh lớp học" bodyClassName="p-0!">
            {att.length === 0 ? (
              <Empty description="Chưa có buổi nào" />
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={th}>Ngày</th>
                    <th className={th}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {att.slice(0, 8).map((a) => (
                    <tr key={a.id} className="hover:bg-[#f6f8f5]">
                      <td className={td}>{dayjs(a.date).format('DD/MM/YYYY')}</td>
                      <td className={td}>
                        <StatusTag value={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
          <Card title="Check-in trung tâm" bodyClassName="p-0!">
            {checkIns.length === 0 ? (
              <Empty description="Chưa có lượt check-in" />
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={th}>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {checkIns.map((c) => (
                    <tr key={c.id} className="hover:bg-[#f6f8f5]">
                      <td className={td}>{c.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      </div>
    </Page>
  );
}
