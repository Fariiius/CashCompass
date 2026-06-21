"use client";

import React from 'react';
import { Home, User, Users, Mail } from 'lucide-react';

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import { SparklesCore } from '@/components/ui/sparkles';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { AnimatedLayerButton } from '@/components/ui/animated-layer-button';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSelector } from '@/components/ui/language-selector';

export const HeroSection = () => {
  const { t, language } = useLanguage();

  const navItems = [
    { name: t.navbar.home, url: '#home', icon: Home },
    { name: t.navbar.about, url: '#about', icon: User },
    { name: t.navbar.founders, url: '#founders', icon: Users },
  ];

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white relative font-sans antialiased transition-colors duration-300">
      <LanguageSelector />
      {/* Global Canvas Background */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Background Logo */}
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] opacity-[0.15] z-0">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="w-full h-full object-contain"
          />
        </div>

        <SparklesCore
          id="tsparticlescolorful"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full absolute inset-0 z-10 pointer-events-none opacity-50 dark:opacity-100"
          particleColor="#888888"
          speed={0.5}
        />
      </div>
      {/* Tubelight Navbar */}
      <NavBar items={navItems} />

      {/* Hero */}
      <section id="home" className="relative w-full h-screen overflow-hidden">


        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center gap-4 relative z-20 h-full">
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-400 dark:from-neutral-50 dark:to-neutral-400">
            {t.hero.title}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 cursor-default text-center text-xl sm:text-2xl mt-4">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 relative z-[9999] pointer-events-auto">
            <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-lg hover:scale-105 transition-all duration-300"
            >
              {t.hero.cta}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative pt-24 pb-48 px-6 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-400 dark:from-neutral-50 dark:to-neutral-400">
              {t.about.title}
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neutral-300 to-neutral-600 mx-auto rounded-full mb-12" />

          <div className="flex flex-col gap-8 text-center items-center">
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-100 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p1.replace('Cash Compass', '<strong class="text-black dark:text-white">Cash Compass</strong>').replace('financial advisor', '<strong class="text-black dark:text-white">financial advisor</strong>') }} />
              <p className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-100 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p2.replace('all major Egyptian banks', '<strong class="text-black dark:text-white">all major Egyptian banks</strong>').replace('EGX 30 and EGX 70', '<strong class="text-black dark:text-white">EGX 30 and EGX 70</strong>') }} />
              <p className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-100 leading-relaxed">
                {t.about.p3}
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center relative z-[9999] pointer-events-auto">
              <AnimatedLayerButton
                onClick={(e) => {
                  e.preventDefault();
                  const target = e.currentTarget;
                  // Remove focus to prevent Safari sticky-hover bug when returning to tab
                  setTimeout(() => target.blur(), 100);
                  window.open("https://ieeexplore.ieee.org/document/11442061", "_blank", "noopener,noreferrer");
                }}
              >
                {t.about.btn}
              </AnimatedLayerButton>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="relative py-24 px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-400 dark:from-neutral-50 dark:to-neutral-400">
              {t.founders.title}
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neutral-300 to-neutral-600 mx-auto rounded-full mb-6" />
          <p className="text-center text-zinc-600 dark:text-zinc-400 text-lg mb-16 max-w-2xl mx-auto">
            {t.founders.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              { 
                name: language.startsWith('ar') ? "فارس السيد علي" : "Fares El-Sayed Aly", 
                role: t.founders.roles.founder, 
                desc: t.founders.fares_desc,
                linkedin: "https://www.linkedin.com/in/fares-el-sayed-aly-b44048274/",
                email: "mailto:fares.elsayed.mahmoud927@gmail.com",
                image: "/fares.jpeg"
              },
              { 
                name: language.startsWith('ar') ? "يارا إبراهيم" : "Yara Ibrahim", 
                role: t.founders.roles.founder, 
                desc: t.founders.yara_desc,
                linkedin: "https://www.linkedin.com/in/yara-ibrahim-250bb933/",
                email: "mailto:dr.yara.magdy.90@gmail.com",
                image: "/yara.jpg"
              },
              { 
                name: language.startsWith('ar') ? "مروان البيالي" : "Marwan El-Bialy", 
                role: t.founders.roles.founder, 
                desc: t.founders.marwan_desc,
                linkedin: "https://www.linkedin.com/in/marwan-el-bialy/",
                email: "mailto:marwan.bialy02@gmail.com"
              },
            ].map((founder) => (
              <div
                key={founder.name}
                className="group bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-3xl p-8 text-center hover:bg-black/10 dark:hover:bg-white/10 hover:border-neutral-600/30 dark:hover:border-neutral-400/30 transition-all duration-300 w-full max-w-sm flex flex-col items-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 dark:from-neutral-300 dark:to-neutral-600 flex items-center justify-center text-3xl font-bold text-black dark:text-white shadow-lg shadow-neutral-500/20 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  {founder.image ? (
                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                  ) : (
                    founder.name.split(' ').map(n => n[0]).slice(0, 2).join('')
                  )}
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{founder.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm font-semibold tracking-wide uppercase mb-4">{founder.role}</p>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm leading-relaxed flex-grow mb-6 text-center">{founder.desc}</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <a 
                    href={founder.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/20 transition-colors text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                  >
                    <LinkedinIcon size={20} />
                  </a>
                  <a 
                    href={founder.email} 
                    className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/20 transition-colors text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
