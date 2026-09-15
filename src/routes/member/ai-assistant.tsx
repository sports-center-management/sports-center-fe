import { createFileRoute } from '@tanstack/react-router';
import { Send, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

export const Route = createFileRoute('/member/ai-assistant')({
  component: AIAssistantPage,
});

function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Xin chào Hoàng Thị Dung! Tôi là Trợ Lý AI Sports Center. Bạn cần tư vấn về lịch tập, chế độ ăn hay tư vấn chọn lớp học nào hôm nay?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Với mục tiêu rèn luyện thể lực của bạn (Gói VIP), buổi chiều hôm nay lúc 17:30 có Lớp Yoga Hatha Phục Hồi rất thích hợp để thư giãn cơ bắp sau khi tập luyện nặng!`,
        },
      ]);
    }, 600);
  };

  return (
    <div className="bg-white border border-sc-border rounded-2xl p-6 max-w-4xl mx-auto shadow-xs">
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-sc-border-soft">
        <Sparkles size={20} className="text-sc-primary" />
        <h3 className="font-display font-bold text-lg text-sc-ink">Trợ Lý AI Thể Thao & Dinh Dưỡng</h3>
      </div>

      <div className="h-96 overflow-y-auto bg-[#fcfbf8] border border-sc-border-soft rounded-xl p-4 mb-4 flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-xs ${
              msg.sender === 'user'
                ? 'self-end bg-sc-primary text-white rounded-br-none'
                : 'self-start bg-white text-sc-ink border border-zinc-200 rounded-bl-none'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Nhập thắc mắc của bạn với AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-sc-line outline-none text-sm focus:border-sc-primary transition-colors"
        />
        <button
          type="submit"
          className="bg-sc-primary text-white font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-sc-primary-dark transition-colors cursor-pointer text-sm"
        >
          <Send size={16} />
          <span>Gửi</span>
        </button>
      </form>
    </div>
  );
}
