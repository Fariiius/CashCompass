"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import {
  Menu,
  ChevronLeft,
  Building2,
  TrendingUp,
  CreditCard,
  Coins,
  Search,
  MessageSquare,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data ---

const MOCK_STOCKS = [
  { symbol: "COMI.CA", name: "Commercial International Bank", price: "79.50", change: "+1.2%", signal: "Buy" },
  { symbol: "HRHO.CA", name: "EFG Hermes", price: "20.15", change: "+0.5%", signal: "Hold" },
  { symbol: "ESRS.CA", name: "Ezz Steel", price: "88.30", change: "-2.1%", signal: "Buy" },
  { symbol: "TMGH.CA", name: "Talaat Moustafa Group", price: "64.00", change: "+3.4%", signal: "Buy" },
  { symbol: "SWDY.CA", name: "Elsewedy Electric", price: "45.20", change: "-0.8%", signal: "Hold" },
];

const MOCK_BANKS = [
  { id: "nbe", name: "National Bank of Egypt", url: "https://www.nbe.com.eg" },
  { id: "banque-misr", name: "Banque Misr", url: "https://www.banquemisr.com" },
  { id: "cib", name: "Commercial International Bank (CIB)", url: "https://www.cibeg.com" },
  { id: "qnb", name: "QNB Egypt", url: "https://www.qnb.com.eg" },
];

const MOCK_METALS = [
  { id: "gold-24", name: "Gold 24k", price: "4,050 EGP/g" },
  { id: "gold-21", name: "Gold 21k", price: "3,540 EGP/g" },
  { id: "gold-18", name: "Gold 18k", price: "3,035 EGP/g" },
  { id: "silver", name: "Silver", price: "45 EGP/g" },
];

// --- Types ---

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

// --- Main Component ---

export default function BotPage() {
  const { t, language } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: language === "ar-fusha" || language === "ar-masry" 
        ? "أهلاً بك في المساعد الذكي لـ Cash Compass. كيف يمكنني مساعدتك اليوم في قراراتك المالية؟"
        : "Welcome to Cash Compass AI. How can I help you with your financial decisions today?",
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const handleSendMessage = (text: string, files?: File[]) => {
    if (!text.trim() && (!files || files.length === 0)) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotTyping(true);

    // Simulate Bot Response
    setTimeout(() => {
      let botResponse = "I am currently analyzing your request...";
      
      if (text.includes("[Simulate Analysis]")) {
        botResponse = `Based on real-time data analysis of the Egyptian Market:\n\nThe current signals suggest strong bullish momentum due to recent central bank policy adjustments. I recommend evaluating your risk tolerance before committing capital.`;
      } else if (text.toLowerCase().includes("loan")) {
        botResponse = "Currently, the National Bank of Egypt (NBE) and Banque Misr offer some of the most competitive personal loan rates, hovering around 22-24% decreasing annually. Would you like me to calculate your potential monthly installment?";
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "bot", content: botResponse },
      ]);
      setIsBotTyping(false);
    }, 1500);
  };

  const injectStockPrompt = (stock: typeof MOCK_STOCKS[0]) => {
    const prompt = `[Simulate Analysis] Please analyze stock ${stock.symbol} (${stock.name}). The current price is ${stock.price} EGP. Predict tomorrow's closing price, explain the reasoning behind this prediction, and outline a strategy for a '${stock.signal}' position.`;
    handleSendMessage(prompt);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#121212] text-gray-100 font-sans">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 h-full border-r border-[#333] bg-[#1a1a1a] overflow-y-auto overflow-x-hidden flex flex-col"
          >
            {/* Logo Area */}
            <div className="p-4 flex items-center justify-between sticky top-0 bg-[#1a1a1a] z-10 border-b border-[#333]">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  {/* Simplified Logo */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <span className="font-bold text-lg tracking-tight">Cash Compass</span>
              </Link>
            </div>

            {/* Navigation Lists */}
            <div className="flex-1 p-3 space-y-6">
              
              {/* Markets Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> EGX Markets
                </h3>
                <div className="space-y-1">
                  {MOCK_STOCKS.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => injectStockPrompt(stock)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors group flex flex-col"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-medium text-sm text-gray-200">{stock.symbol}</span>
                        <span className="text-xs font-mono">{stock.price}</span>
                      </div>
                      <div className="flex justify-between items-center w-full mt-1">
                        <span className="text-xs text-gray-500 truncate pr-2">{stock.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-xs font-medium", stock.change.startsWith("+") ? "text-green-500" : "text-red-500")}>
                            {stock.change}
                          </span>
                          <span className={cn(
                            "text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold",
                            stock.signal === "Buy" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                          )}>
                            {stock.signal}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Banking Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5" /> Banking Options
                </h3>
                <div className="space-y-1">
                  <button onClick={() => handleSendMessage("Compare personal loans across top Egyptian banks.")} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors text-sm text-gray-300">
                    <CreditCard className="w-4 h-4 inline-block mr-2 text-gray-400" /> Compare Loans
                  </button>
                  <button onClick={() => handleSendMessage("What are the highest yield certificates of deposit (CDs) available right now?")} className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors text-sm text-gray-300">
                    <Building2 className="w-4 h-4 inline-block mr-2 text-gray-400" /> Certificates of Deposit
                  </button>
                </div>
              </div>

              {/* Metals Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                  <Coins className="w-3.5 h-3.5" /> Precious Metals
                </h3>
                <div className="space-y-1">
                  {MOCK_METALS.map((metal) => (
                    <button
                      key={metal.id}
                      onClick={() => handleSendMessage(`What is the current trend for ${metal.name}? Current price is ${metal.price}.`)}
                      className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors"
                    >
                      <span className="text-sm text-gray-300">{metal.name}</span>
                      <span className="text-xs font-mono text-gray-400">{metal.price}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="h-14 flex items-center px-4 border-b border-[#333] bg-[#121212] z-10 sticky top-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-[#2a2a2a] transition-colors text-gray-400 hover:text-white"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="ml-4 font-semibold text-gray-200">Cash Compass AI</div>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-32">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-5 py-3.5 whitespace-pre-wrap leading-relaxed",
                    msg.role === "user" 
                      ? "bg-[#2a2a2a] text-white rounded-br-sm" 
                      : "bg-transparent text-gray-200 border border-[#333] rounded-bl-sm"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex w-full justify-start">
                <div className="max-w-[85%] rounded-2xl px-5 py-4 bg-transparent border border-[#333] rounded-bl-sm flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent pt-10 pb-6 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <PromptInputBox 
              onSend={handleSendMessage} 
              isLoading={isBotTyping} 
              placeholder="Ask Cash Compass about stocks, loans, or financial strategies..."
            />
            <div className="text-center mt-3 text-xs text-gray-500">
              Cash Compass AI can make mistakes. Consider verifying critical financial information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
