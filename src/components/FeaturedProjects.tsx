import React, { useState } from 'react';
import { X, ExternalLink, Activity, Sparkles, TrendingUp } from 'lucide-react';
import { ProjectItem } from '../types';
import { portfolioProjects } from '../data';

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="relative">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioProjects.map((project) => (
          <div 
            key={project.id}
            className="liquid-glass border border-outline-variant/40 rounded-3xl overflow-hidden hover:border-primary/50 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col cursor-pointer hover:shadow-xl hover:shadow-primary/5"
            onClick={() => setSelectedProject(project)}
          >
            {/* Image Wrap */}
            <div className="h-48 overflow-hidden bg-surface-variant relative">
              <img 
                alt={project.title} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-40" 
                referrerPolicy="no-referrer"
                src={project.imgUrl}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
                <span className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-widest font-extrabold shadow-lg">
                  VIEW DETAILS
                </span>
              </div>
            </div>

            {/* Card Info */}
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-3 py-1 bg-primary-container/20 border border-outline-variant/40 rounded-full text-[9px] font-mono font-extrabold tracking-wide uppercase text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-on-surface-variant text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              {/* Stat Callout block */}
              <div className="pt-6 border-t border-outline-variant/30 mt-auto">
                <div className="text-primary font-headline text-3xl font-extrabold tracking-tight">
                  {project.metricValue}
                </div>
                <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold mt-1">
                  {project.metricLabel}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Long Description Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-lg flex items-center justify-center p-4">
          <div 
            className="liquid-glass-active border border-outline-variant/40 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="h-56 relative bg-surface-variant">
              <img 
                src={selectedProject.imgUrl} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-black/30" />
              
              {/* Close Button top-right */}
              <button 
                className="absolute top-4 right-4 w-9 h-9 bg-black/40 border border-white/10 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-8">
                <div className="flex gap-2 mb-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="bg-primary/20 backdrop-blur-md text-primary text-[9px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold border border-primary/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-headline text-2xl font-bold text-white tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-8 space-y-6">
              <div>
                <h4 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold">
                  Overview &amp; Context
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold select-none">
                  Strategic Methodology
                </h4>
                <p className="text-on-surface text-sm leading-relaxed bg-primary/5 p-5 border border-outline-variant/40 rounded-2xl">
                  {selectedProject.longDescription || "Utilized real-time analytical reporting logs and cluster indices to discover, segment, and targeting optimal user groups for maximum marketing conversion rates."}
                </p>
              </div>

              {/* Bottom Stat row */}
              <div className="flex justify-between items-center bg-surface-variant/40 p-5 border border-outline-variant/40 rounded-2xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-primary font-headline text-2xl font-extrabold">
                      {selectedProject.metricValue}
                    </div>
                    <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider font-bold">
                      {selectedProject.metricLabel}
                    </div>
                  </div>
                </div>

                <button 
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-mono text-[10px] uppercase font-extrabold tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border-none"
                  onClick={() => setSelectedProject(null)}
                >
                  <span>Close Overlay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
