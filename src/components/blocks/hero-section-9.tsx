"use client";

import React from 'react';
import { Home, User, Users } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { NavBar } from '@/components/ui/tubelight-navbar';

const navItems = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Founders', url: '#founders', icon: Users },
];

export const HeroSection = () => {
  return (
    <div className="bg-black text-white relative">
      {/* Global Canvas Background */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <SparklesCore
          id="tsparticlescolorful"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00ff00"
          speed={0.5}
        />
      </div>
      {/* Tubelight Navbar */}
      <NavBar items={navItems} />

      {/* Hero */}
      <section id="home" className="relative w-full h-screen overflow-hidden">

        
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center gap-4 relative z-20 h-full">
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Cash Compass
          </h1>
          <p className="text-neutral-300 cursor-default text-center text-xl sm:text-2xl mt-4">
            is brighter than you think
          </p>
          <div className="mt-8">
            <a href="#about" className="px-8 py-3 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-all duration-300">
              Try Cash Compass
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
              About Cash Compass
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mb-12" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                Cash Compass is your trusted Egyptian financial advisor. We help you navigate the complex world of investments and personal finance with cutting-edge tools and expert insights.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                Our platform provides real-time market analysis, personalized investment recommendations, and comprehensive expense tracking — all designed specifically for the Egyptian market.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Whether you&apos;re a seasoned investor or just starting your financial journey, Cash Compass gives you the confidence to make smarter decisions with your money.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <p className="text-3xl font-extrabold text-cyan-400 mb-2">50K+</p>
                <p className="text-sm text-zinc-400">Active Users</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <p className="text-3xl font-extrabold text-teal-400 mb-2">$2M+</p>
                <p className="text-sm text-zinc-400">Invested</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <p className="text-3xl font-extrabold text-emerald-400 mb-2">99%</p>
                <p className="text-sm text-zinc-400">Satisfaction</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
                <p className="text-3xl font-extrabold text-cyan-400 mb-2">24/7</p>
                <p className="text-sm text-zinc-400">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="relative py-24 px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
              Our Founders
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-center text-zinc-400 text-lg mb-16 max-w-2xl mx-auto">
            Meet the minds behind Cash Compass — passionate about reshaping finance in Egypt.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {[
              { name: "Fares Elsayed", role: "CEO & Co-Founder", desc: "Visionary leader with a passion for financial technology and innovation." },
              { name: "Ahmed Hassan", role: "CTO & Co-Founder", desc: "Technical architect building the future of fintech in the Middle East." },
              { name: "Sara Mohamed", role: "COO & Co-Founder", desc: "Operations expert driving growth and scaling Cash Compass across Egypt." },
            ].map((founder) => (
              <div
                key={founder.name}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/20">
                  {founder.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
                <p className="text-cyan-400 text-sm font-medium mb-4">{founder.role}</p>
                <p className="text-zinc-400 text-sm leading-relaxed">{founder.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
