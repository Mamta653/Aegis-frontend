import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden z-50">
          <div className="bg-[#2F5233] p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Aegis AI Assistant</h3>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-[#FDFDFB]">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#2F5233] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[#E9EFEC] rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                <p className="text-black">
                  Hello! I'm your Aegis AI healthcare assistant. How can I help you today?
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#2F5233] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-[#E9EFEC] rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                <p className="text-black">
                  I can assist with symptoms analysis, appointment scheduling, medication reminders, and health monitoring.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-black/5 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-[#E9EFEC] rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-black/10 transition-all text-black placeholder:text-black/40"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-[#2F5233] text-white rounded-xl hover:bg-[#1F3823] transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#2F5233] text-white rounded-full shadow-2xl hover:bg-[#1F3823] transition-all hover:scale-110 z-50 group"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white" />

        {isOpen ? (
          <X className="w-7 h-7 mx-auto" />
        ) : (
          <MessageCircle className="w-7 h-7 mx-auto group-hover:scale-110 transition-transform" />
        )}
      </button>
    </>
  );
}
