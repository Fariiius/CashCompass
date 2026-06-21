"use client";

import React from 'react';
import { Home, User, Users } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { SlideButton } from '@/components/ui/slide-button';

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
                <strong className="text-white">Cash Compass</strong> is a Gen-AI powered banking chatbot designed to advance ethical financial inclusion in Egyptian retail banking. Serving as your personal <strong className="text-white">financial advisor</strong>, the system provides real-time, context-aware bilingual (Arabic & English) guidance.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                We aggregate data from <strong className="text-white">all major Egyptian banks</strong>, allowing you to effortlessly compare accounts, loans, cards, and investment products in one place. Beyond banking, Cash Compass monitors the Egyptian stock market, including <strong className="text-white">EGX 30 and EGX 70</strong>, and predicts closing prices to empower your investment decisions.
              </p>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Built on ethical design principles and advanced retrieval-augmented generation (RAG) architecture, Cash Compass guarantees privacy, fairness, transparency, and accessibility—ensuring trustworthy and scalable digital financial advisory for everyone.
              </p>
            </div>
            <div className="flex justify-center items-center">
               <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 flex flex-col items-center gap-6 max-w-sm w-full">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Read Our Publication</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Discover the academic research, architecture, and ethical design principles behind Cash Compass on IEEE Xplore.</p>
                  <SlideButton 
                    text="Slide to Read" 
                    onComplete={() => window.open('https://ieeexplore.ieee.org/document/11442061', '_blank')} 
                  />
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
