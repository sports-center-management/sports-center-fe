import { Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Page } from '../components/Page';
import { DAY_NAMES, fmtMoney, useMember } from '../store/MemberProvider';

interface Msg {
  role: 'user' | 'ai';
  text: string;
  at: string;
}

const SUGGESTIONS: { topic: string; q: string }[] = [
  { topic: 'Lịch tập', q: 'Lịch tập tuần này của tôi?' },
  { topic: 'Gói thành viên', q: 'Gói của tôi còn bao lâu?' },
  { topic: 'Lớp học', q: 'Có lớp Yoga nào còn chỗ không?' },
  { topic: 'Bài tập', q: 'Bài tập về nhà của tôi là gì?' },
  { topic: 'Trung tâm', q: 'Trung tâm có những gói nào?' },
  { topic: 'Giờ mở cửa', q: 'Trung tâm mở cửa mấy giờ?' },
];

const EYEBROW = 'block font-display text-xs font-bold uppercase tracking-[.12em] text-sc-muted';
const CARD_SHADOW = 'shadow-[0_1px_2px_rgba(20,19,15,.03),0_2px_10px_rgba(20,19,15,.04)]';

function AnswerBody({ text }: { text: string }) {
  const lines = text.split('\n');
  const items = lines.filter((l) => l.startsWith('• ')).map((l) => l.slice(2));
  const rest = lines.filter((l) => !l.startsWith('• ')).join('\n');
  return (
    <>
      {rest && <p className="mb-2 whitespace-pre-line last:mb-0">{rest}</p>}
      {items.length > 0 && (
        <ul className="mt-1 list-none border-l-2 border-sc-border p-0">
          {items.map((it, i) => (
            <li key={i} className="border-b border-sc-border-soft py-[7px] pl-3.5 text-[14.5px] last:border-b-0">
              {it}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function AiMark() {
  return (
    <i className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sc-ink font-display text-[13px] font-extrabold tracking-[.04em] text-sc-lime not-italic">
      SC
    </i>
  );
}

export function AiChat() {
  const { data, currentUser: me, activeSubscription, nameOf } = useMember();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const ta = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs, typing]);

  useEffect(() => {
    const el = ta.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 5 * 24 + 12) + 'px';
  }, [input]);

  const myClassIds = data.enrollments
    .filter((e) => e.memberId === me.id && e.status === 'ACTIVE')
    .map((e) => e.classId);
  const sub = activeSubscription(me.id);
  const plan = sub ? data.plans.find((p) => p.id === sub.planId) : undefined;
  const hwCount = data.homeworks.filter((h) => myClassIds.includes(h.classId)).length;
  const next = (() => {
    const now = dayjs();
    const dow = now.day() === 0 ? 7 : now.day();
    const cands = data.schedules
      .filter((x) => myClassIds.includes(x.classId))
      .map((x) => {
        let delta = (x.dayOfWeek - dow + 7) % 7;
        if (delta === 0 && x.startTime <= now.format('HH:mm')) delta = 7;
        return { x, delta };
      })
      .sort((a, b) => a.delta - b.delta || a.x.startTime.localeCompare(b.x.startTime));
    if (!cands.length) return null;
    const { x, delta } = cands[0];
    const c = data.classes.find((y) => y.id === x.classId)!;
    return {
      label: delta === 0 ? 'Hôm nay' : delta === 1 ? 'Ngày mai' : DAY_NAMES[x.dayOfWeek],
      time: x.startTime,
      name: c.name,
    };
  })();

  const answer = (q: string): string => {
    const s = q.toLowerCase();
    if (s.includes('lịch')) {
      const sc = data.schedules.filter((x) => myClassIds.includes(x.classId)).sort((a, b) => a.dayOfWeek - b.dayOfWeek);
      if (!sc.length) return 'Bạn chưa đăng ký lớp nào. Vào mục "Lớp học" để xem các lớp đang mở nhé.';
      return (
        'Lịch tập tuần này của bạn:\n' +
        sc
          .map((x) => {
            const c = data.classes.find((y) => y.id === x.classId)!;
            return `• ${DAY_NAMES[x.dayOfWeek]} ${x.startTime}–${x.endTime} · ${c.name} — ${data.rooms.find((r) => r.id === c.roomId)?.name}, HLV ${nameOf(c.coachId)}`;
          })
          .join('\n')
      );
    }
    if (s.includes('gói') && (s.includes('tôi') || s.includes('còn') || s.includes('hạn'))) {
      if (!sub || !plan) return 'Bạn chưa có gói thành viên còn hiệu lực. Bạn có thể đăng ký tại mục "Gói thành viên".';
      return `Bạn đang dùng ${plan.name}, hết hạn ngày ${dayjs(sub.endDate).format('DD/MM/YYYY')} (còn ${dayjs(sub.endDate).diff(dayjs(), 'day')} ngày).\nQuyền lợi: ${plan.benefits}.`;
    }
    if (s.includes('gói'))
      return (
        'Các gói hiện có:\n' +
        data.plans
          .filter((p) => p.active)
          .map((p) => `• ${p.name} — ${fmtMoney(p.price)} / ${p.durationDays} ngày. ${p.benefits}`)
          .join('\n')
      );
    if (s.includes('bài tập')) {
      const hw = data.homeworks.filter((h) => myClassIds.includes(h.classId));
      return hw.length
        ? 'Bài tập về nhà của bạn:\n' + hw.map((h) => `• ${h.title} — ${h.content}`).join('\n')
        : 'Hiện chưa có bài tập về nhà nào.';
    }
    if (s.includes('lớp')) {
      const sport = data.sports.find((sp) => s.includes(sp.name.toLowerCase()));
      const list = data.classes
        .filter((c) => c.status === 'OPEN' && (!sport || c.sportId === sport.id))
        .map((c) => ({
          c,
          left: c.capacity - data.enrollments.filter((e) => e.classId === c.id && e.status === 'ACTIVE').length,
        }));
      if (!list.length) return `Hiện chưa có lớp${sport ? ' ' + sport.name : ''} nào đang mở.`;
      return (
        `Các lớp${sport ? ' ' + sport.name : ''} đang mở:\n` +
        list
          .map(({ c, left }) => `• ${c.name} — HLV ${nameOf(c.coachId)} · còn ${left} chỗ · ${fmtMoney(c.price)}`)
          .join('\n')
      );
    }
    if (s.includes('giờ') || s.includes('mở cửa'))
      return 'Trung tâm mở cửa 06:00 – 22:00, 7 ngày trong tuần. Lễ Tết mở 08:00 – 20:00.';
    return 'Tôi có thể trả lời về lịch tập, gói thành viên, lớp còn chỗ, bài tập về nhà và giờ mở cửa. Bạn muốn hỏi gì?';
  };

  const send = (q: string) => {
    const t = q.trim();
    if (!t || typing) return;
    const at = dayjs().format('HH:mm');
    setMsgs((m) => [...m, { role: 'user', text: t, at }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'ai', text: answer(t), at: dayjs().format('HH:mm') }]);
      setTyping(false);
    }, 700);
  };

  const empty = msgs.length === 0;
  const firstName = me.fullName.split(' ').slice(-1)[0];
  const chip =
    'shrink-0 cursor-pointer rounded-full border border-sc-border bg-transparent px-3 py-[5px] text-[12.5px] font-medium text-sc-ink transition-colors hover:border-sc-ink hover:bg-sc-paper';

  return (
    <Page title="Trợ lý AI" subtitle="Hỏi về lịch tập, bài tập, gói thành viên hoặc dịch vụ của trung tâm" noCard>
      <div className="grid h-[calc(100vh-210px)] min-h-[520px] grid-cols-[minmax(0,1fr)_280px] gap-[18px] max-xl:h-auto max-xl:grid-cols-1">
        <div
          className={`flex min-w-0 flex-col overflow-hidden rounded-xl border border-sc-border-soft bg-white max-xl:h-[calc(100vh-210px)] max-xl:min-h-[520px] ${CARD_SHADOW}`}
        >
          <div className="sc-thin-scroll flex-1 overflow-y-auto px-6 pt-7 pb-2 max-md:px-3.5">
            <div className="mx-auto max-w-[720px]">
              {empty ? (
                <div className="sc-fade pt-[2vh]">
                  <small className={EYEBROW}>Trợ lý · Sports Center</small>
                  <h2 className="mt-2.5 mb-3 font-display text-[clamp(40px,5vw,58px)] font-extrabold uppercase leading-[.96] tracking-[-.005em] text-sc-ink">
                    Chào {firstName}.
                    <br />
                    Hôm nay tập gì?
                  </h2>
                  <p className="mb-7 max-w-[480px] text-base leading-normal text-sc-muted">
                    Tôi biết lịch, lớp, gói và bài tập của bạn — hỏi thẳng, không cần mở từng trang.
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 max-md:grid-cols-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.q}
                        type="button"
                        onClick={() => send(s.q)}
                        className={`flex cursor-pointer flex-col gap-2 rounded-[10px] border border-sc-border bg-white px-4 py-3.5 text-left text-sc-ink transition-all duration-150 hover:-translate-y-px hover:border-sc-ink hover:shadow-[0_8px_20px_rgba(20,19,15,.08)]`}
                      >
                        <small className={EYEBROW}>{s.topic}</small>
                        <span className="text-[14.5px] leading-[1.3] font-semibold">{s.q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-[22px] pb-2">
                  {msgs.map((m, i) =>
                    m.role === 'user' ? (
                      <div key={i} className="sc-fade flex flex-col items-end gap-1">
                        <div className="max-w-[70%] rounded-[14px_14px_4px_14px] bg-sc-ink px-3.5 py-2.5 text-[14.5px] leading-normal whitespace-pre-wrap text-white max-md:max-w-[88%]">
                          {m.text}
                        </div>
                        <time className="pr-0.5 text-[11px] tabular-nums text-sc-muted">{m.at}</time>
                      </div>
                    ) : (
                      <div key={i} className="sc-fade grid grid-cols-[32px_1fr] gap-3.5">
                        <AiMark />
                        <div className="min-w-0 pt-1 text-[15px] leading-[1.6] text-sc-ink">
                          <div className="mb-1 flex items-baseline gap-2.5">
                            <span className="font-display text-[13px] font-bold uppercase tracking-[.1em] text-sc-primary">
                              Trợ lý
                            </span>
                            <time className="text-[11px] tabular-nums text-sc-muted">{m.at}</time>
                          </div>
                          <AnswerBody text={m.text} />
                        </div>
                      </div>
                    ),
                  )}
                  {typing && (
                    <div className="grid grid-cols-[32px_1fr] gap-3.5">
                      <AiMark />
                      <div className="min-w-0 pt-1">
                        <div className="mb-1 flex items-baseline gap-2.5">
                          <span className="font-display text-[13px] font-bold uppercase tracking-[.1em] text-sc-primary">
                            Trợ lý
                          </span>
                        </div>
                        <div className="inline-flex gap-[5px] py-2">
                          <span className="sc-dot h-1.5 w-1.5 rounded-full bg-sc-ink opacity-35" />
                          <span className="sc-dot h-1.5 w-1.5 rounded-full bg-sc-ink opacity-35 [animation-delay:.15s]" />
                          <span className="sc-dot h-1.5 w-1.5 rounded-full bg-sc-ink opacity-35 [animation-delay:.3s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottom} />
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-sc-border-soft bg-white px-6 pt-3 pb-4 max-md:px-3.5">
            <div className="mx-auto max-w-[720px]">
              {!empty && (
                <div className="sc-no-scrollbar mb-2.5 flex gap-1.5 overflow-x-auto">
                  {SUGGESTIONS.map((s) => (
                    <button key={s.q} type="button" className={chip} onClick={() => send(s.q)}>
                      {s.q}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-end gap-2 rounded-xl border-[1.5px] border-sc-border bg-white py-1.5 pr-1.5 pl-2.5 transition-all duration-150 focus-within:border-sc-ink focus-within:shadow-[0_0_0_3px_rgba(20,19,15,.06)]">
                <textarea
                  ref={ta}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Hỏi về lịch tập, gói, lớp hoặc bài tập của bạn…"
                  className="max-h-[132px] min-h-[36px] flex-1 resize-none bg-transparent px-1 py-1.5 text-[15px] leading-6 text-sc-ink outline-none placeholder:text-[#9a968c]"
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  aria-label="Gửi"
                  className="inline-flex h-[38px] w-[38px] shrink-0 cursor-pointer items-center justify-center rounded-[9px] bg-sc-ink text-sc-lime transition-all duration-150 hover:-translate-y-px disabled:cursor-default disabled:bg-sc-border disabled:text-white disabled:hover:translate-y-0"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
              <div className="mt-2 text-center text-[11.5px] text-sc-muted">
                Enter để gửi · Shift + Enter xuống dòng. Câu trả lời dựa trên dữ liệu tài khoản của bạn và không được
                chia sẻ ra ngoài.
              </div>
            </div>
          </div>
        </div>

        <aside
          className={`overflow-y-auto rounded-xl border border-sc-border-soft bg-white px-5 pt-5 pb-4 max-xl:hidden ${CARD_SHADOW}`}
        >
          <small className={`${EYEBROW} mb-1.5`}>Trợ lý đang dùng</small>
          {[
            {
              k: 'Gói thành viên',
              v: plan && sub ? plan.name : 'Chưa có gói',
              sub:
                plan && sub ? (
                  `còn ${dayjs(sub.endDate).diff(dayjs(), 'day')} ngày · hết hạn ${dayjs(sub.endDate).format('DD/MM')}`
                ) : (
                  <Link to="/member/membership-plans" className="font-semibold text-sc-primary">
                    Xem các gói →
                  </Link>
                ),
            },
            {
              k: 'Lớp đang học',
              v: `${myClassIds.length} lớp`,
              sub: myClassIds.length
                ? data.classes
                    .filter((c) => myClassIds.includes(c.id))
                    .map((c) => c.name)
                    .join(' · ')
                : 'Chưa đăng ký lớp nào',
            },
            {
              k: 'Buổi kế tiếp',
              v: next ? `${next.label} · ${next.time}` : '—',
              sub: next ? next.name : 'Không có buổi nào sắp tới',
            },
            {
              k: 'Bài tập về nhà',
              v: `${hwCount} bài`,
              sub: (
                <Link to="/member/workout-plans" className="font-semibold text-sc-primary">
                  Xem bài tập →
                </Link>
              ),
            },
          ].map((f) => (
            <div
              key={f.k}
              className="flex flex-col gap-[3px] border-b border-sc-border-soft py-3.5 last-of-type:border-b-0"
            >
              <span className="text-[12.5px] text-sc-muted">{f.k}</span>
              <b className="font-display text-[22px] font-extrabold uppercase leading-[1.05] text-sc-ink">{f.v}</b>
              <em className="text-[13px] leading-[1.4] text-sc-muted not-italic">{f.sub}</em>
            </div>
          ))}
          <p className="mt-3.5 border-t border-sc-border pt-3.5 text-[12.5px] leading-normal text-sc-muted">
            Trợ lý chỉ đọc dữ liệu trong tài khoản của bạn để trả lời. Cần người hỗ trợ? Gọi quầy lễ tân{' '}
            <a href="tel:02838123456" className="font-semibold text-sc-ink">
              028 3812 3456
            </a>
            .
          </p>
        </aside>
      </div>
    </Page>
  );
}
