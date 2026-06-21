"use client"

import React, { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { Language } from "@/translations"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ar-fusha', label: 'العربية الفصحى' },
    { code: 'ar-masry', label: 'عربي مصري' },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="fixed top-6 ltr:right-6 rtl:left-6 z-50 pointer-events-auto" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/50 border border-black/10 dark:bg-white/10 dark:border-white/20 backdrop-blur-lg shadow-lg hover:bg-white/60 dark:hover:bg-white/20 transition-all text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white"
      >
        <Globe size={18} />
        <span className="text-sm font-semibold hidden sm:block">
          {languages.find(l => l.code === language)?.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 ltr:right-0 rtl:left-0 w-40 py-2 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={cn(
                "w-full text-start px-4 py-2.5 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                language === lang.code ? "text-primary dark:text-white bg-black/5 dark:bg-white/5" : "text-black/70 dark:text-white/70"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
