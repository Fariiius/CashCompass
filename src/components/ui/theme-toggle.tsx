"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("w-14 h-7 sm:w-16 sm:h-8 p-1 rounded-full bg-black/10 dark:bg-black/40 border border-transparent", className)}></div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "flex w-14 h-7 sm:w-16 sm:h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-black/40 border border-transparent" 
          : "bg-black/5 border border-transparent",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "transform translate-x-0 bg-white/20" 
              : "transform translate-x-7 sm:translate-x-8 bg-black/20"
          )}
        >
          {isDark ? (
            <Moon 
              className="w-3 h-3 sm:w-4 sm:h-4 text-white" 
              strokeWidth={2}
            />
          ) : (
            <Sun 
              className="w-3 h-3 sm:w-4 sm:h-4 text-black" 
              strokeWidth={2}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "bg-transparent" 
              : "transform -translate-x-7 sm:-translate-x-8"
          )}
        >
          {isDark ? (
            <Sun 
              className="w-3 h-3 sm:w-4 sm:h-4 text-white/50" 
              strokeWidth={2}
            />
          ) : (
            <Moon 
              className="w-3 h-3 sm:w-4 sm:h-4 text-black/50" 
              strokeWidth={2}
            />
          )}
        </div>
      </div>
    </div>
  )
}
