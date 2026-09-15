import { Upload } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../components/Page';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Field, Input, Select, TextArea } from '../components/ui/Form';
import { Descriptions } from '../components/ui/Misc';
import { Modal } from '../components/ui/Modal';
import { StatusTag } from '../components/ui/Tag';
import { initialsOf, useMember } from '../store/MemberProvider';
import type { User } from '../types';

type FormState = Pick<User, 'fullName' | 'phone' | 'dob' | 'gender' | 'goal' | 'level' | 'healthNote'>;

export function Profile() {
  const { currentUser: u, update, toast } = useMember();
  const [editing, setEditing] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => ({ ...u }));
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.fullName?.trim() || !form.phone?.trim()) return;
    update('users', u.id, form);
    toast('Đã cập nhật hồ sơ');
    setEditing(false);
  };

  return (
    <Page
      title="Hồ sơ cá nhân"
      extra={
        <div className="flex gap-2">
          <Button onClick={() => setPwOpen(true)}>Đổi mật khẩu</Button>
          <Button
            variant="primary"
            onClick={() => {
              setForm({ ...u });
              setEditing(true);
            }}
          >
            Chỉnh sửa
          </Button>
        </div>
      }
      noCard
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="overflow-hidden text-center" bodyClassName="p-0!">
          {/* Profile cover */}
          <div className="relative h-[120px] overflow-hidden bg-[linear-gradient(135deg,#14130f_0%,#0f4d34_100%)] after:absolute after:-top-[60px] after:-right-10 after:h-[220px] after:w-[220px] after:rounded-full after:bg-[rgba(214,242,75,.14)] after:content-['']" />
          <div className="relative -mt-12 px-5 pb-5">
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-sc-lime text-[34px] font-bold text-sc-ink shadow-[0_6px_16px_rgba(15,23,42,.15)]">
              {initialsOf(u.fullName)}
            </span>
            <h3 className="mt-2 mb-1 text-base font-semibold">{u.fullName}</h3>
            <StatusTag value={u.role} />
            <div className="mt-3">
              <Button size="small" icon={<Upload />} onClick={() => toast('Đã cập nhật ảnh đại diện (giả lập)')}>
                Đổi ảnh đại diện
              </Button>
            </div>
          </div>
        </Card>
        <div className="md:col-span-2">
          <Card>
            <Descriptions
              items={[
                { label: 'Email', children: u.email },
                { label: 'Số điện thoại', children: u.phone },
                { label: 'Trạng thái', children: <StatusTag value={u.status} /> },
                { label: 'Ngày tham gia', children: u.createdAt },
                { label: 'Ngày sinh', children: u.dob ?? '—' },
                { label: 'Giới tính', children: <StatusTag value={u.gender} /> },
                { label: 'Mục tiêu tập luyện', children: u.goal ?? '—' },
                { label: 'Trình độ', children: <StatusTag value={u.level} /> },
                { label: 'Ghi chú sức khỏe', children: u.healthNote ?? '—' },
              ]}
            />
          </Card>
        </div>
      </div>

      <Modal title="Cập nhật hồ sơ" open={editing} onCancel={() => setEditing(false)} onOk={save} okText="Lưu">
        <Field label="Họ và tên" required>
          <Input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
        </Field>
        <Field label="Số điện thoại" required>
          <Input value={form.phone} onChange={(e) => set('phone', e.target.value)} />
        </Field>
        <Field label="Ngày sinh">
          <Input type="date" value={form.dob ?? ''} onChange={(e) => set('dob', e.target.value || undefined)} />
        </Field>
        <Field label="Giới tính">
          <Select
            value={form.gender ?? ''}
            onChange={(e) => set('gender', (e.target.value || undefined) as FormState['gender'])}
            options={[
              { value: '', label: '' },
              { value: 'MALE', label: 'Nam' },
              { value: 'FEMALE', label: 'Nữ' },
              { value: 'OTHER', label: 'Khác' },
            ]}
          />
        </Field>
        <Field label="Mục tiêu tập luyện">
          <TextArea rows={2} value={form.goal ?? ''} onChange={(e) => set('goal', e.target.value)} />
        </Field>
        <Field label="Trình độ">
          <Select
            value={form.level ?? ''}
            onChange={(e) => set('level', (e.target.value || undefined) as FormState['level'])}
            options={[
              { value: '', label: '' },
              { value: 'BEGINNER', label: 'Mới bắt đầu' },
              { value: 'INTERMEDIATE', label: 'Trung bình' },
              { value: 'ADVANCED', label: 'Nâng cao' },
            ]}
          />
        </Field>
        <Field label="Ghi chú sức khỏe" className="mb-1">
          <TextArea rows={2} value={form.healthNote ?? ''} onChange={(e) => set('healthNote', e.target.value)} />
        </Field>
      </Modal>

      <Modal
        title="Đổi mật khẩu"
        open={pwOpen}
        onCancel={() => setPwOpen(false)}
        onOk={() => {
          toast('Đã đổi mật khẩu');
          setPwOpen(false);
        }}
        okText="Xác nhận"
      >
        <Field label="Mật khẩu hiện tại" required>
          <Input type="password" />
        </Field>
        <Field label="Mật khẩu mới" required>
          <Input type="password" />
        </Field>
        <Field label="Nhập lại mật khẩu mới" required className="mb-1">
          <Input type="password" />
        </Field>
      </Modal>
    </Page>
  );
}
