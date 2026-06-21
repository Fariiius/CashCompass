"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function BotPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4">Cash Compass Bot</h1>
      <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
        (Coming soon)
      </p>
      <Link href="/">
        <button className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold hover:scale-105 transition-all">
          {t.navbar.home}
        </button>
      </Link>
    </div>
  );
}
