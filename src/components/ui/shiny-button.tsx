"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps: any = {
  initial: { "--x": "100%", scale: 0.8 } as any,
  animate: { "--x": "-100%", scale: 1 } as any,
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      {...animationProps}
      {...props}
      className={cn(
        "relative rounded-full px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow",
        "bg-black/5 dark:bg-white/5",
        "dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)]",
        "dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
        className
      )}
    >
      <span
        className="relative block size-full uppercase tracking-wide text-black dark:text-white"
        style={{
          maskImage:
            "linear-gradient(-75deg,black calc(var(--x) + 20%),transparent calc(var(--x) + 30%),black calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(black, black) content-box,linear-gradient(black, black)",
          maskComposite: "exclude",
        }}
        className={cn(
          "absolute inset-0 z-10 block rounded-[inherit] p-px",
          "bg-[linear-gradient(-75deg,rgba(0,0,0,0.1)_calc(var(--x)+20%),rgba(0,0,0,0.5)_calc(var(--x)+25%),rgba(0,0,0,0.1)_calc(var(--x)+100%))]",
          "dark:bg-[linear-gradient(-75deg,rgba(255,255,255,0.1)_calc(var(--x)+20%),rgba(255,255,255,0.5)_calc(var(--x)+25%),rgba(255,255,255,0.1)_calc(var(--x)+100%))]"
        )}
      ></span>
    </motion.button>
  );
};

export default { ShinyButton };
