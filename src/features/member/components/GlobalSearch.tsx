import { useNavigate } from '@tanstack/react-router';
import { BookOpen, FileText, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { flatNav } from '../nav';
import { useMember } from '../store/MemberProvider';
import { Empty, Kbd } from './ui/Misc';
import { Modal } from './ui/Modal';
import { Tag } from './ui/Tag';

interface Hit {
  key: string;
  kind: 'class' | 'page' | 'invoice';
  title: string;
  sub?: string;
  to: string;
}

const ICON = { class: <BookOpen size={15} />, page: <Search size={15} />, invoice: <FileText size={15} /> };
const LABEL = { class: 'Lớp học', page: 'Trang', invoice: 'Hóa đơn' };

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onCancel={onClose} footer={null} closable={false} width={640} top={80} bodyClassName="p-0!">
      <SearchBody onClose={onClose} />
    </Modal>
  );
}

function SearchBody({ onClose }: { onClose: () => void }) {
  const { data, currentUser, nameOf } = useMember();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  const hits = useMemo<Hit[]>(() => {
    const s = q.trim().toLowerCase();
    const out: Hit[] = [];
    for (const it of flatNav)
      if (!s || it.label.toLowerCase().includes(s))
        out.push({ key: it.key, kind: 'page', title: it.label, sub: it.section ?? 'Trang', to: it.key });
    if (!s) return out.slice(0, 8);
    for (const c of data.classes.filter((c) => c.name.toLowerCase().includes(s))) {
      out.push({
        key: c.id,
        kind: 'class',
        title: c.name,
        sub: `HLV ${nameOf(c.coachId)} · ${data.rooms.find((r) => r.id === c.roomId)?.name}`,
        to: '/member/classes',
      });
    }
    for (const p of data.payments
      .filter((p) => p.invoiceNo.toLowerCase().includes(s) && p.memberId === currentUser.id)
      .slice(0, 5)) {
      out.push({
        key: p.id,
        kind: 'invoice',
        title: p.invoiceNo,
        sub: `${nameOf(p.memberId)} · ${p.refName}`,
        to: '/member/payments',
      });
    }
    return out.slice(0, 12);
  }, [q, data, currentUser, nameOf]);

  const go = (h: Hit) => {
    onClose();
    navigate({ to: h.to });
  };

  return (
    <>
      <div className="flex items-center gap-2.5 border-b border-sc-border-soft px-[18px] py-3.5">
        <Search size={16} className="shrink-0 text-[#9a968c]" />
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, hits.length - 1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            }
            if (e.key === 'Enter' && hits[active]) go(hits[active]);
            if (e.key === 'Escape') onClose();
          }}
          placeholder="Tìm thành viên, lớp học, hóa đơn, trang..."
          className="w-full bg-transparent text-base text-sc-ink outline-none placeholder:text-[#9a968c]"
        />
      </div>
      <div className="max-h-[420px] overflow-y-auto p-2">
        {hits.length === 0 && <Empty description="Không có kết quả" className="py-6" />}
        {hits.map((h, i) => (
          <div
            key={h.kind + h.key}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(h)}
            className={`flex cursor-pointer items-center gap-3 rounded-[10px] px-3 py-2.5 ${i === active ? 'bg-[#f5f8ff]' : ''}`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f3f1ec] text-[#3d3b35]">
              {ICON[h.kind]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-sc-ink">{h.title}</div>
              {h.sub && <div className="text-xs text-sc-muted">{h.sub}</div>}
            </div>
            <Tag>{LABEL[h.kind]}</Tag>
          </div>
        ))}
      </div>
      <div className="flex gap-4 border-t border-sc-border-soft px-4 py-2 text-xs text-[#9a968c]">
        <span>
          <Kbd>↑↓</Kbd> di chuyển
        </span>
        <span>
          <Kbd>Enter</Kbd> mở
        </span>
        <span>
          <Kbd>Esc</Kbd> đóng
        </span>
      </div>
    </>
  );
}
