"use client";

import React from 'react';
import { Home, User, Users } from 'lucide-react';
import { AuroraFlowBackground } from '@/components/ui/aurora-background';
import { NavBar } from '@/components/ui/tubelight-navbar';

const navItems = [
  { name: 'Home', url: '#', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Founders', url: '#founders', icon: Users },
];

export const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#000a12] text-white">
      {/* Tubelight Navbar */}
      <NavBar items={navItems} />

      {/* Canvas Background */}
      <div className="absolute inset-0 z-0">
        <AuroraFlowBackground />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-8xl mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 drop-shadow-sm">
              Aurora Flow
            </span>
            <br />
            Digital Experience
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-zinc-300 mb-10 leading-relaxed">
            Experience the mesmerizing beauty of digital aurora with flowing 
            patterns and sparkling particles that dance across your screen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300">
              Explore
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white font-semibold backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
