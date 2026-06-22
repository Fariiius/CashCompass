"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { ShinyButton } from "@/components/ui/shiny-button";
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
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

// --- Mock Data ---

const MOCK_BANKS = [
  { id: "nbe", name: "National Bank of Egypt (NBE)", url: "https://www.nbe.com.eg" },
  { id: "banque-misr", name: "Banque Misr", url: "https://www.banquemisr.com" },
  { id: "bdc", name: "Banque du Caire", url: "https://www.bdc.com.eg" },
  { id: "cib", name: "Commercial International Bank (CIB)", url: "https://www.cibeg.com" },
  { id: "qnb", name: "QNB Egypt", url: "https://www.qnb.com.eg" },
  { id: "aaib", name: "Arab African International Bank", url: "https://www.aaib.com" },
  { id: "alexbank", name: "AlexBank", url: "https://www.alexbank.com" },
  { id: "fabmisr", name: "FABMISR", url: "https://www.fabmisr.com.eg" },
  { id: "adib", name: "Abu Dhabi Islamic Bank (ADIB)", url: "https://www.adib.eg" },
  { id: "suez", name: "Suez Canal Bank", url: "https://www.scbank.com.eg" },
  { id: "hsbc", name: "HSBC Egypt", url: "https://www.hsbc.com.eg" },
  { id: "faisal", name: "Faisal Islamic Bank", url: "https://www.faisalbank.com.eg" },
  { id: "hdb", name: "Housing & Development Bank", url: "https://www.hdb-egy.com" },
  { id: "enbd", name: "Emirates NBD Egypt", url: "https://www.emiratesnbd.com.eg" },
  { id: "arab", name: "Arab Bank Egypt", url: "https://www.arabbank.com.eg" },
  { id: "aib", name: "Arab International Bank", url: "https://www.aib.com.eg" },
  { id: "ebank", name: "Export Development Bank", url: "https://www.ebank.com.eg" },
  { id: "cae", name: "Credit Agricole Egypt", url: "https://www.ca-egypt.com" },
];

const MOCK_METALS = [
  { id: "gold-24", name: "Gold 24k", price: "4,050 EGP/g" },
  { id: "gold-21", name: "Gold 21k", price: "3,540 EGP/g" },
  { id: "gold-18", name: "Gold 18k", price: "3,035 EGP/g" },
  { id: "silver", name: "Silver", price: "45 EGP/g" },
];

// --- Types ---

type Stock = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  signal: string;
};

// --- Main Component ---

export default function BotPage() {
  const { t, language } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoadingStocks, setIsLoadingStocks] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, append, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: language === "ar-fusha" || language === "ar-masry" 
          ? "أهلاً بك في المساعد الذكي لـ Cash Compass. كيف يمكنني مساعدتك اليوم في قراراتك المالية؟"
          : "Welcome to Cash Compass AI. How can I help you with your financial decisions today?",
      }
    ]
  });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch("/api/stocks");
        if (res.ok) {
          const data = await res.json();
          setStocks(data);
        }
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      } finally {
        setIsLoadingStocks(false);
      }
    };
    fetchStocks();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = (text: string, files?: File[]) => {
    if (!text.trim() && (!files || files.length === 0)) return;
    
    // In a real scenario you can append images/attachments here
    append({ role: "user", content: text });
  };

  const injectStockPrompt = (stock: Stock) => {
    const prompt = `Can you analyze the stock ${stock.symbol} (${stock.name})? The current price is ${stock.price} EGP.`;
    handleSendMessage(prompt);
  };

  return (
    <div className="fixed inset-0 flex w-full bg-zinc-50 dark:bg-[#121212] text-zinc-900 dark:text-gray-100 font-sans overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 h-full border-r border-zinc-200 dark:border-[#333] bg-zinc-100 dark:bg-[#1a1a1a] overflow-y-auto overflow-x-hidden flex flex-col transition-colors duration-300 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-[#333]"
          >
            {/* Logo Area */}
            <div className="p-4 flex items-center justify-between sticky top-0 bg-zinc-100 dark:bg-[#1a1a1a] z-10 border-b border-zinc-200 dark:border-[#333] transition-colors duration-300">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-zinc-200 dark:border-none">
                  <img src="/logo.png" alt="Cash Compass Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">Cash Compass</span>
              </Link>
            </div>

            <div className="flex-1 p-3 space-y-6">
              
              <div className="px-2 pb-2">
                <Link href="/" className="block w-full">
                  <ShinyButton className="w-full text-center py-2 px-4 !rounded-lg text-sm bg-white dark:bg-[#2a2a2a]/50 text-zinc-800 dark:text-gray-200 border-zinc-200 dark:border-[#444] hover:bg-zinc-50 dark:hover:bg-[#333]/70 transition-colors shadow-sm">
                    <span className="flex items-center justify-center gap-2">
                      <ChevronLeft className="w-4 h-4" /> Back to Home
                    </span>
                  </ShinyButton>
                </Link>
              </div>

              {/* Markets Section */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> EGX Markets
                </h3>
                <div className="space-y-1">
                  {isLoadingStocks ? (
                    <div className="px-3 py-4 text-sm text-zinc-400 dark:text-gray-500 text-center animate-pulse">
                      Fetching live market data...
                    </div>
                  ) : (
                    stocks.map((stock) => (
                      <ShinyButton
                        key={stock.symbol}
                        onClick={() => injectStockPrompt(stock)}
                        className="w-full !text-left px-3 py-2 !rounded-lg !bg-white dark:!bg-[#1f1f1f] border-zinc-200 dark:border-[#333] hover:!bg-zinc-50 dark:hover:!bg-[#2a2a2a] group flex flex-col !h-auto transition-colors shadow-sm"
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium text-sm text-zinc-800 dark:text-gray-200">{stock.symbol}</span>
                          <span className="text-xs font-mono text-zinc-600 dark:text-gray-300">{stock.price}</span>
                        </div>
                        <div className="flex justify-between items-center w-full mt-1">
                          <span className="text-xs text-zinc-500 dark:text-gray-500 truncate pr-2 font-normal">{stock.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={cn("text-xs font-medium", stock.change.startsWith("-") ? "text-red-600 dark:text-red-500" : "text-green-600 dark:text-green-500")}>
                              {stock.change}
                            </span>
                            <span className={cn(
                              "text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold",
                              stock.signal === "Buy" ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-500" : stock.signal === "Sell" ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-500" : "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-500"
                            )}>
                              {stock.signal}
                            </span>
                          </div>
                        </div>
                      </ShinyButton>
                    ))
                  )}
                </div>
              </div>

              {/* Banking Section */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5" /> Banking Options
                </h3>
                <div className="space-y-1">
                  {MOCK_BANKS.map((bank) => (
                    <ShinyButton
                      key={bank.id}
                      onClick={() => handleSendMessage(`Analyze ${bank.name} (${bank.url}). What are their current personal loan rates and deposit certificates?`)}
                      className="w-full !text-left px-3 py-2 !rounded-lg !bg-white dark:!bg-[#1f1f1f] border-zinc-200 dark:border-[#333] hover:!bg-zinc-50 dark:hover:!bg-[#2a2a2a] group flex flex-col !h-auto transition-colors shadow-sm"
                    >
                      <div className="flex items-center w-full gap-2">
                        <Building2 className="w-4 h-4 flex-shrink-0 text-zinc-500 dark:text-gray-400" />
                        <span className="font-medium text-[13px] text-zinc-800 dark:text-gray-200 truncate">{bank.name}</span>
                      </div>
                    </ShinyButton>
                  ))}
                </div>
              </div>

              {/* Metals Section */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                  <Coins className="w-3.5 h-3.5" /> Precious Metals
                </h3>
                <div className="space-y-1">
                  {MOCK_METALS.map((metal) => (
                    <ShinyButton
                      key={metal.id}
                      onClick={() => handleSendMessage(`What is the current trend for ${metal.name}? Current price is ${metal.price}.`)}
                      className="w-full flex justify-between items-center px-3 py-2 !rounded-lg !bg-white dark:!bg-[#1f1f1f] border-zinc-200 dark:border-[#333] hover:!bg-zinc-50 dark:hover:!bg-[#2a2a2a] transition-colors shadow-sm"
                    >
                      <span className="text-[13px] text-zinc-800 dark:text-gray-300 font-medium">{metal.name}</span>
                      <span className="text-xs font-mono text-zinc-600 dark:text-gray-400">{metal.price}</span>
                    </ShinyButton>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative transition-colors duration-300">
        {/* Header */}
        <header className="h-14 flex items-center px-4 border-b border-zinc-200 dark:border-[#333] bg-zinc-50 dark:bg-[#121212] z-10 sticky top-0 transition-colors duration-300">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-[#2a2a2a] transition-colors text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="ml-4 font-semibold text-zinc-900 dark:text-gray-200">Cash Compass AI</div>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto pb-48 pt-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-[#333]">
          <div className="max-w-3xl mx-auto flex flex-col gap-8 px-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-zinc-200 dark:border-none">
                      <img src="/logo.png" alt="Bot Avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
                
                <div
                  className={cn(
                    "whitespace-pre-wrap leading-relaxed text-[15px]",
                    msg.role === "user" 
                      ? "max-w-[75%] rounded-3xl px-5 py-3.5 bg-zinc-200 dark:bg-[#2f2f2f] text-zinc-900 dark:text-gray-100 shadow-sm" 
                      : "max-w-full text-zinc-800 dark:text-gray-200 py-1.5"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex w-full justify-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-zinc-200 dark:border-none">
                    <img src="/logo.png" alt="Bot Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="py-2 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-zinc-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-zinc-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-zinc-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-50 via-zinc-50 dark:from-[#121212] dark:via-[#121212] to-transparent pt-12 pb-6 px-4 md:px-8 pointer-events-none transition-colors duration-300">
          <div className="max-w-3xl mx-auto pointer-events-auto">
            <PromptInputBox 
              onSend={handleSendMessage} 
              isLoading={isLoading} 
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
