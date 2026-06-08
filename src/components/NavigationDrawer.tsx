import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  History, 
  Zap, 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  Check, 
  Copy 
} from 'lucide-react';
import { ViewTab } from '../types';
import ProfileAvatar from './ProfileAvatar';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
}

export default function NavigationDrawer({
  isOpen,
  onClose,
  activeTab,
  onTabChange
}: NavigationDrawerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rishabhkharbanda08@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuItems = [
    { id: 'portfolio' as ViewTab, label: 'Portfolio', icon: Briefcase },
    { id: 'experience' as ViewTab, label: 'Experience', icon: History },
    { id: 'skills' as ViewTab, label: 'Skills', icon: Zap },
    { id: 'contact' as ViewTab, label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        id="drawer-overlay"
        className={`fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <aside 
        id="nav-drawer"
        className={`fixed left-0 top-0 h-full w-80 z-[70] bg-surface/95 backdrop-blur-lg border-r border-outline-variant/60 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Profile Header Block */}
          <div className="p-8 border-b border-outline-variant/60 relative">
            {/* Close Button for mobile */}
            <button 
              id="drawer-close"
              className="absolute top-4 right-4 text-on-surface hover:text-primary transition-colors focus:outline-none"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-4 mt-2">
              <ProfileAvatar className="w-20 h-20 rounded-xl" />
              <div>
                <h2 className="font-headline text-2xl font-bold text-primary tracking-tight">Rishabh Kharbanda</h2>
                <p className="font-sans text-sm text-on-surface font-semibold leading-tight mt-1">Senior Marketing Analyst</p>
                <div className="inline-block mt-2.5 px-3 py-1 rounded-full bg-primary-container border border-primary/20 text-[9px] font-mono text-primary uppercase tracking-wide font-extrabold">
                  Data-Driven Growth
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tab Links */}
          <nav className="flex flex-col gap-2.5 p-4 flex-grow">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id || (item.id === 'contact' && activeTab === 'sent-success');
              return (
                <button
                  key={item.id}
                  className={`w-full text-left rounded-xl px-4 py-3.5 flex items-center gap-4 transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-primary-container border border-primary/30 text-primary font-bold scale-[1.01] shadow-sm' 
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface border border-transparent'
                  }`}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                >
                  <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] text-primary' : 'stroke-1.5'}`} />
                  <span className="font-sans text-sm tracking-wide font-semibold">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer Socials */}
          <div className="p-6 bg-surface-container-lowest/80 border-t border-outline-variant/60">
            <div className="flex gap-4 justify-center mb-5">
              <a 
                href="https://www.linkedin.com/in/rishabh-kharbanda-7a3659209" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl border border-outline-variant hover:border-primary/50 hover:text-primary flex items-center justify-center transition-all bg-surface shadow-xs active:scale-95"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/rishikh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl border border-outline-variant hover:border-primary/50 hover:text-primary flex items-center justify-center transition-all bg-surface shadow-xs active:scale-95"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/rishikh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl border border-outline-variant hover:border-primary/50 hover:text-primary flex items-center justify-center transition-all bg-surface shadow-xs active:scale-95"
                title="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <button 
                onClick={handleCopyEmail}
                className="w-10 h-10 rounded-xl border border-outline-variant hover:border-primary/50 hover:text-primary flex items-center justify-center transition-all bg-surface shadow-xs cursor-pointer active:scale-95 relative group"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-5 h-5 text-data-growth" /> : <Copy className="w-4 h-4" />}
                {copied && (
                  <span className="absolute -top-8 px-2 py-0.5 rounded bg-primary text-on-primary text-[8px] font-mono whitespace-nowrap uppercase tracking-widest font-bold">
                    COPIED
                  </span>
                )}
              </button>
            </div>
            <p className="font-mono text-[9px] text-on-surface-variant/80 text-center leading-normal font-medium">
              © 2026 Rishabh Kharbanda.<br/>Built for Strategic Growth.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
