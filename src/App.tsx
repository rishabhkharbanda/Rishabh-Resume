/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  ArrowDown, 
  Workflow, 
  TrendingDown, 
  TrendingUp, 
  ChevronRight, 
  Terminal, 
  MapPin, 
  Mail, 
  Phone,
  Compass,
  ArrowUpRight,
  ExternalLink,
  Linkedin,
  Github,
  Twitter,
  Sparkles,
  Award,
  Sun,
  Moon
} from 'lucide-react';
import { profileSummary, resumePdfUrl } from './data';
import { ViewTab } from './types';
import NavigationDrawer from './components/NavigationDrawer';
import KPIBento from './components/KPIBento';
import MarketingSimulator from './components/MarketingSimulator';
import ExperienceChronology from './components/ExperienceChronology';
import SkillsArsenal from './components/SkillsArsenal';
import FeaturedProjects from './components/FeaturedProjects';
import ContactForm from './components/ContactForm';
import SuccessScreen from './components/SuccessScreen';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('portfolio');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return 'dark';
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  const [formPayload, setFormPayload] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  // Smooth scroll helper or direct tab changer depending on state
  const handleNavClick = (tab: ViewTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback on successful contact submission
  const handleContactSuccess = (payload: { name: string; email: string; subject: string; message: string }) => {
    setFormPayload(payload);
    setActiveTab('sent-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary selection:text-on-primary relative">
      
      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Decorative background liquid bubbles */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none liquid-blob -z-10" />
      <div className="absolute top-[60%] left-[-15%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none liquid-blob-alt -z-10" />

      {/* Drawer navigation */}
      <NavigationDrawer 
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={handleNavClick}
      />

      {/* Main Top Header Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface/30 backdrop-blur-xl border-b border-outline-variant/30 shadow-xs">
        <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto w-full">
          
          {/* Logo and Menu Trigger */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDrawerOpen(true)}
              className="text-primary hover:text-primary transition-colors cursor-pointer active:scale-95 pr-2 focus:outline-none flex items-center justify-center font-bold"
              title="Open Navigation"
            >
              <Menu className="w-6 h-6 stroke-[2.5px]" />
            </button>
            <div 
              onClick={() => handleNavClick('portfolio')}
              className="font-headline text-[24px] font-extrabold tracking-tighter text-primary select-none cursor-pointer hover:opacity-85 transition-opacity"
            >
              RK.
            </div>
          </div>

          {/* Desktop Nav menu Links */}
          <nav className="hidden md:flex gap-8 items-center">
            {[
              { id: 'portfolio' as ViewTab, label: 'Portfolio' },
              { id: 'experience' as ViewTab, label: 'Experience' },
              { id: 'skills' as ViewTab, label: 'Skills' },
              { id: 'contact' as ViewTab, label: 'Contact' }
            ].map((link) => {
              const isActive = activeTab === link.id || (link.id === 'contact' && activeTab === 'sent-success');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer py-1 ${
                    isActive 
                      ? 'text-primary border-b-2 border-primary font-bold' 
                      : 'text-on-surface-variant hover:text-primary font-semibold'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

            {/* Right Top Contact CTA Trigger & Theme Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-2.5 rounded-full liquid-glass hover:scale-105 active:scale-95 transition-all text-primary hover:text-primary/8 font-extrabold border border-outline-variant/40 cursor-pointer flex items-center justify-center h-10 w-10 shrink-0"
                title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 stroke-[2.5px] text-primary" />
                ) : (
                  <Sun className="w-5 h-5 stroke-[2.5px] text-primary" />
                )}
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="bg-primary text-on-primary hover:bg-primary/95 px-6 py-2.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer font-extrabold border-none"
              >
                Contact
              </button>
            </div>
        </div>
      </header>

      {/* Main View Port Canvas */}
      <main className="pt-24 min-h-[calc(100vh-140px)]">
        
        {/* VIEW 1: Main Portfolio Home Tab */}
        {activeTab === 'portfolio' && (
          <div>
            {/* HERO SEGMENT */}
            <section className="relative min-h-[720px] flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto overflow-hidden">
              {/* Technical Dot Grids */}
              <div className="absolute inset-0 grid-pattern opacity-40 -z-10" />
              
              <div className="max-w-4xl relative z-10">
                {/* Available for opportunity ping pill */}
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary mb-8 animate-fade-in liquid-glass">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span className="font-mono text-[10px] uppercase font-extrabold tracking-widest select-none text-primary">
                    Available for opportunities
                  </span>
                </div>

                {/* Bold Giant Headlines */}
                <h1 className="font-headline text-[58px] md:text-[94px] font-extrabold tracking-tighter leading-[0.9] mb-8 select-none">
                  Rishabh <br />
                  <span className="text-primary select-text hover:opacity-90 transition-opacity duration-400">Kharbanda</span>
                </h1>

                {/* Premium Introduction Paragraph */}
                <p className="font-sans text-[17px] md:text-xl text-on-surface-variant mb-12 max-w-2xl leading-relaxed font-medium">
                  {profileSummary}
                </p>

                  {/* Main page navigation shortcuts */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <button 
                      onClick={() => handleNavClick('contact')}
                      className="bg-primary text-on-primary px-8 py-4 font-mono text-[11px] font-extrabold tracking-widest rounded-full uppercase hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer"
                    >
                      Start a Conversation
                    </button>
                    <button 
                      onClick={() => {
                        const element = document.getElementById('home-featured');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="border border-outline hover:border-primary px-8 py-4 font-mono text-[11px] font-extrabold tracking-widest rounded-full uppercase text-on-surface hover:text-primary transition-all text-center cursor-pointer"
                    >
                      View Portfolio
                    </button>
                  </div>
              </div>

              {/* Bounce to scroll down */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 select-none hidden md:flex">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-medium scale-90 text-primary">Scroll</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-primary" />
              </div>
            </section>

            {/* KPI BENTO METRIC CARDS GRID */}
            <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-outline-variant/60">
              <KPIBento />
            </section>

            {/* NEW SECTION 02: ADVANCED MARKETING COCKPIT SIMULATOR */}
            <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-outline-variant/60">
              <div className="mb-14">
                <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-[0.25em] mb-4 block">
                  02 / Marketing Growth Simulator
                </span>
                <h2 className="font-headline text-3xl font-extrabold tracking-tight leading-snug">
                  Interactive Campaign sandbox
                </h2>
                <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
                  Interactively model core performance marketing variables (Spend, CAC targets, Churn thresholds) to live forecast key efficiency benchmarks such as retention curves, net ROAS, and cohort valuation.
                </p>
              </div>

              <MarketingSimulator />
            </section>

            {/* PROFILE & ABOUT PHILOSOPHY */}
            <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-outline-variant/60">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                  <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-[0.25em] mb-4 block">
                    03 / About
                  </span>
                  <h2 className="font-headline text-3xl font-extrabold tracking-tight leading-snug">
                    Profile &amp; <br />Philosophy
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="font-sans text-[17px] md:text-lg text-on-surface-variant leading-relaxed mb-10">
                    As a Senior Marketing Analyst with 5+ years of experience across gaming, e-commerce, and B2C growth, I focus on driving results through performance marketing, funnel optimization, and lifecycle analytics — from international campaign dashboards to geo-segmented acquisition strategies.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                    <div className="space-y-3 liquid-glass p-6 rounded-3xl border border-outline-variant/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <h4 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
                        <Compass className="w-5 h-5 opacity-90" />
                        <span>Data Vision</span>
                      </h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                        Passionate about translating complex raw numbers into clean visual models that empower teams to take bolder, smarter budget reallocations.
                      </p>
                    </div>
                    <div className="space-y-3 liquid-glass p-6 rounded-3xl border border-outline-variant/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <h4 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
                        <Sparkles className="w-5 h-5 opacity-90" />
                        <span>Strategic Impact</span>
                      </h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed font-sans">
                        Skilled in Tableau, Power BI, Python, SQL, AppsFlyer, Clevertap, and WebEngage — with hands-on experience across Malaysia, Australia, and Papua New Guinea markets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK EXPERIENCE BRIEF STATS OVERVIEW */}
            <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-surface-variant/10 border-t border-b border-outline-variant/30 backdrop-blur-md">
              <div className="px-6 md:px-12 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-[0.25em] mb-4 block">
                      04 / Experience Overview
                    </span>
                    <h2 className="font-headline text-3xl font-extrabold tracking-tight leading-snug">
                      Tested Career Background
                    </h2>
                  </div>
                  <button 
                    onClick={() => handleNavClick('experience')}
                    className="font-mono text-[11px] font-bold text-primary hover:underline flex items-center gap-1 underline-offset-4 focus:outline-none cursor-pointer"
                  >
                    <span>Inspect complete chronology</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Brief Yong Yung Casino */}
                  <div className="liquid-glass border border-outline-variant/40 p-8 rounded-3xl relative group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">2025 - 2026</span>
                        <span className="text-[10px] font-mono font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded border border-primary/25 uppercase">Freelance</span>
                      </div>
                      <h3 className="font-headline text-xl font-bold text-on-surface">Freelance Marketing Analyst</h3>
                      <p className="text-primary font-mono text-sm font-semibold mb-6">Yong Yung Casino · Malaysia, Australia &amp; PNG</p>
                      
                      <div className="space-y-4 text-on-surface-variant text-sm font-sans">
                        <div className="flex gap-3">
                          <span className="text-primary mt-1">•</span>
                          <p>Built 8+ Tableau dashboards tracking CAC, ROI, and ROAS across three international markets — cutting reporting turnaround by 40%.</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-primary mt-1">•</span>
                          <p>Optimized landing pages and paid media to increase conversion rates by 18% and campaign sign-ups by 25%.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brief HDW */}
                  <div className="liquid-glass border border-outline-variant/40 p-8 rounded-3xl relative group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">2024 - 2025</span>
                        <span className="text-[10px] font-mono font-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded border border-primary/25 uppercase">Senior Role</span>
                      </div>
                      <h3 className="font-headline text-xl font-bold text-on-surface">Senior Marketing Analyst</h3>
                      <p className="text-primary font-mono text-sm font-semibold mb-6">Head Digital Works · Gaming &amp; Fantasy Sports</p>
                      
                      <div className="space-y-4 text-on-surface-variant text-sm font-sans">
                        <div className="flex gap-3">
                          <span className="text-primary mt-1">•</span>
                          <p>Lowered CAC by 17% through geo-segmentation and player value tier optimization (HVP, MVP).</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-primary mt-1">•</span>
                          <p>Reduced monthly ad spend from ₹4 Cr to ₹1.8 Cr while maintaining acquisition outcomes and cutting churn by 15%.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DETAILED PROJECT PORTFOLIO SECTION */}
            <section id="home-featured" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
              <div className="mb-16">
                <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-[0.25em] mb-4 block">
                  05 / Projects
                </span>
                <h2 className="font-headline text-3xl font-extrabold tracking-tight">
                  Featured Impact Highlights
                </h2>
                <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-lg">
                  Explore selected project parameters demonstrating metrics-backed performance optimization models.
                </p>
              </div>

              <FeaturedProjects />
            </section>
          </div>
        )}

        {/* VIEW 2: Dedicated Experience Timeline View */}
        {activeTab === 'experience' && (
          <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto relative">
            <div className="absolute inset-0 grid-accent opacity-[0.03] pointer-events-none" />
            
            {/* Header intro segment */}
            <div className="mb-20">
              <span className="font-mono text-[10px] text-primary tracking-[0.2em] mb-4 block uppercase font-bold">
                CAREER TRAJECTORY
              </span>
              <h1 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                Professional Journey
              </h1>
              <p className="font-sans text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                A chronology of driving measurable growth through analytical rigor and strategic marketing optimization across diverse industries.
              </p>
            </div>

            {/* Experience Chronology Alternating Line blocks */}
            <ExperienceChronology />
          </section>
        )}

        {/* VIEW 3: Technical Skills Arsenal Detailed Page */}
        {activeTab === 'skills' && (
          <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto relative">
            <div className="mb-20">
              <span className="font-mono text-[10px] text-primary tracking-[0.2em] mb-4 block uppercase font-bold">
                04 / Skills &amp; Credentials
              </span>
              <h1 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                Technical Arsenal
              </h1>
              <p className="font-sans text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                A tested overview of data modeling suites, analytics stack competencies, and verified professional marketing credentials.
              </p>
            </div>

            <SkillsArsenal />
          </section>
        )}

        {/* VIEW 4: Dedicated Contact Page */}
        {activeTab === 'contact' && (
          <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto relative">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 grid-background opacity-10 pointer-events-none mask-fade" />
            
            <div className="mb-16">
              <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4 font-bold">
                06 / CONTACT
              </p>
              <h1 className="font-headline text-4xl md:text-5xl font-bold mb-6">
                Let's Work Together
              </h1>
              <p className="font-sans text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Ready to discuss data-driven marketing strategies that deliver measurable results. Let's explore how we can optimize your growth trajectory.
              </p>
            </div>

            {/* Validated Contact Form alignment */}
            <ContactForm onSuccess={handleContactSuccess} />

            {/* Inner bottom CTA block as seen in Screen 3 */}
            <div className="mt-28 text-center max-w-3xl mx-auto py-16 border-t border-outline-variant/30">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-pulse-slow">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-headline text-3xl font-bold mb-6">Let's Drive Real Growth</h2>
              <p className="font-sans text-base text-on-surface-variant mb-10 leading-relaxed">
                I'm currently open to consulting roles, full-time strategic positions, or speaking engagements regarding performance marketing and data visualization. Let's turn your raw data into a competitive advantage.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  className="font-mono text-xs text-primary hover:underline decoration-2 underline-offset-8 uppercase font-bold" 
                  href="https://www.linkedin.com/in/rishabh-kharbanda-7a3659209"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIEW MY LINKEDIN
                </a>
                <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-outline-variant" />
                <a 
                  className="font-mono text-xs text-primary hover:underline decoration-2 underline-offset-8 uppercase font-bold" 
                  href={resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  DOWNLOAD RESUME
                </a>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 5: Contact success screen Tab */}
        {activeTab === 'sent-success' && (
          <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto flex items-center justify-center">
            <SuccessScreen 
              formPayload={formPayload} 
              onBack={() => {
                setFormPayload(null);
                handleNavClick('portfolio');
              }} 
            />
          </section>
        )}

      </main>

      {/* FOOTER WRAPPER BLOCK MATCHING BOTH FOOTER STYLES */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/30 w-full py-16 mt-20 block">
        <div className="flex flex-col items-center justify-center gap-6 px-6 text-center max-w-6xl mx-auto">
          <div 
            onClick={() => handleNavClick('portfolio')}
            className="font-headline text-2xl text-primary font-bold tracking-tighter hover:opacity-85 transition-opacity cursor-pointer select-none"
          >
            Rishabh Kharbanda
          </div>
          
          <p className="font-sans text-sm text-on-surface-variant max-w-md leading-relaxed">
            Senior Marketing Analyst · 5+ Years across Gaming, E-commerce &amp; B2C Growth
          </p>
          
          <div className="flex flex-wrap gap-8 justify-center my-2">
            <a 
              className="text-on-surface-variant hover:text-primary hover:-translate-y-0.5 transition-all font-mono text-[11px] font-bold uppercase tracking-wider"
              href="https://www.linkedin.com/in/rishabh-kharbanda-7a3659209"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary hover:-translate-y-0.5 transition-all font-mono text-[11px] font-bold uppercase tracking-wider"
              href="https://github.com/rishikh"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary hover:-translate-y-0.5 transition-all font-mono text-[11px] font-bold uppercase tracking-wider"
              href="https://twitter.com/rishikh"
              target="_blank"
              rel="noopener"
            >
              Twitter
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary hover:-translate-y-0.5 transition-all font-mono text-[11px] font-bold uppercase tracking-wider"
              href="mailto:rishabhkharbanda08@gmail.com"
            >
              Email
            </a>
          </div>

          <div className="font-mono text-[11px] text-on-surface-variant mt-6 opacity-60">
            © 2026 Rishabh Kharbanda. Built for Impact &amp; Strategic Value.
          </div>
        </div>
      </footer>
    </div>
  );
}
