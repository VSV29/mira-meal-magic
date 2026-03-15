import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";
import { toast } from "sonner";
import { navigateBackOrTo } from "@/lib/navigation";

type Message = { from: "mira" | "user"; text: string; time: string };

const initialMessages: Message[] = [
  { from: "mira", text: "Hi Priya! 👋 Your pantry has paneer, spinach & dal.\nPaneer expires in 2 days! Want me to plan this week around it?\nI can fit in 3 paneer-based dishes without it feeling repetitive.", time: "9:01 AM" },
  { from: "user", text: "Yes! But nothing too oily. And add something Japanese for Saturday.", time: "9:02 AM" },
  { from: "mira", text: "✅ Plan updated!\nAdded: Palak Paneer (Tue dinner), Paneer Bhurji wrap (Wed lunch), Paneer Tikka Salad (Fri dinner).\nSaturday dinner: Miso Ramen 🍜\nMissing ingredients: miso paste, ramen noodles, nori. Add these to your shopping list?", time: "9:02 AM" },
  { from: "user", text: "Yes — and can you order from BigBasket?", time: "9:03 AM" },
  { from: "mira", text: "🛒 Done! 3 items added to BigBasket — ₹275 total.\nDelivery: Friday before 10am. I'll auto-update your pantry when it arrives 📦", time: "9:03 AM" },
  { from: "user", text: "Can you swap Sunday lunch? I'll be eating out.", time: "9:04 AM" },
  { from: "mira", text: "Sunday lunch removed from the plan 🍽️\nThose ingredients removed from your shopping list too.\nYour week is locked and ready ✅\n\nQuick summary of changes:\n• 3 paneer dishes added (Tue, Wed, Fri)\n• Miso Ramen added (Sat dinner)\n• Sunday lunch → Dining Out\n• Shopping list updated: 3 items to order from BigBasket", time: "9:04 AM" },
];

const quickChips = [
  "🌶️ Too spicy",
  "💪 More protein",
  "⚡ Quick meals (<15 min)",
  "🎲 Surprise me",
  "🚫 Remove a dish",
];

const autoResponses: Record<string, string> = {
  "🌶️ Too spicy": "Got it! I'll reduce the spice level across your plan. Swapped out Chole Bhature for a milder Aloo Gobi. 🌿",
  "💪 More protein": "Added more protein! Swapped 2 meals for high-protein options: Paneer Tikka (28g protein) and Dal Tadka with extra toor dal. 💪",
  "⚡ Quick meals (<15 min)": "Speed mode! Found 4 meals under 15 minutes: Poha, Upma, Moong Chilla, and Quick Stir-fry. Want me to replace slower meals? ⚡",
  "🎲 Surprise me": "Surprise! I've added Shakshuka (Middle Eastern) for Thursday dinner and Korean Bibimbap for Saturday lunch. You'll love the variety! 🎲🎉",
  "🚫 Remove a dish": "Which meal would you like me to remove? I can suggest a replacement or leave the slot open for dining out. 🍽️",
};

const MiraChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => {
      const bar = document.getElementById('mira-input-bar');
      if (!bar) return;
      const offset = window.innerHeight - vv.height;
      bar.style.transform = `translateY(-${offset}px)`;
    };
    vv.addEventListener('resize', handler);
    return () => vv.removeEventListener('resize', handler);
  }, []);

  const sendMessage = (text: string) => {
    const userMsg: Message = { from: "user", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const response = autoResponses[text] || "I've updated your plan based on your request! Check the home screen for changes. ✅";
      const miraMsg: Message = { from: "mira", text: response, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      setMessages(prev => [...prev, miraMsg]);
      toast.success("✅ Plan updated — meals changed", { action: { label: "View changes →", onClick: () => navigate("/home") } });
    }, 1500);
  };

  return (
    <div className="mobile-container bg-card flex flex-col" style={{ height: '100dvh' }}>
      {/* Header */}
      <div className="bg-mira-purple px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigateBackOrTo(navigate)} className="text-cream text-lg">←</button>
        <div className="flex-1 text-center">
          <p className="text-base font-bold text-cream">✨ Mira™</p>
          <p className="text-[12px] text-[#E9D5FF]">Smart Meal Engine</p>
        </div>
        <span className="text-cream text-sm">ⓘ</span>
      </div>

      <p className="text-center text-[12px] text-mm-gray italic py-2 bg-card">
        Tell Mira™ what you want — it updates your plan instantly
      </p>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 ${
              msg.from === "mira"
                ? "bg-mira-purple-light rounded-bl-sm"
                : "bg-green-light rounded-br-sm"
            }`}>
              <p className={`text-[10px] font-bold mb-1 ${msg.from === "mira" ? "text-mira-purple" : "text-mm-green text-right"}`}>
                {msg.from === "mira" ? "✨ Mira™" : "You"}
              </p>
              <p className="text-sm text-foreground whitespace-pre-line">{msg.text}</p>
              <p className={`text-[10px] text-mm-gray mt-1 ${msg.from === "user" ? "text-left" : "text-right"}`}>{msg.time}</p>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-mira-purple-light rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
              <span className="text-[10px] text-mira-purple font-bold mr-2">Mira™ is thinking</span>
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 bg-mira-purple rounded-full animate-bounce-dot" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick chips */}
      <div className="px-4 py-2 overflow-x-auto no-scrollbar border-t border-light-gray bg-card">
        <div className="flex gap-2">
          {quickChips.map(c => (
            <button key={c} onClick={() => sendMessage(c)}
              className="h-[34px] px-3 rounded-full border border-mira-purple text-mira-purple text-[12px] font-medium whitespace-nowrap active:scale-95 transition-transform">
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div id="mira-input-bar" className="px-4 py-2 bg-card border-t border-light-gray flex items-center gap-2" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && input.trim() && sendMessage(input.trim())}
          placeholder="Ask Mira™ anything about your meals..."
          className="flex-1 h-10 rounded-full bg-light-gray px-4 text-sm outline-none"
        />
        <button onClick={() => input.trim() && sendMessage(input.trim())}
          className="w-9 h-9 rounded-full bg-mira-purple flex items-center justify-center text-cream text-sm font-bold">→</button>
      </div>

      <BottomTabBar />
    </div>
  );
};

export default MiraChat;
