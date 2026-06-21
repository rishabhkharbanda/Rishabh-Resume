import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, BarChart3, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';
import { portfolioProjects } from '../data';

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {portfolioProjects.map((project) => (
          <article
            key={project.id}
            className="bg-surface-container border border-outline-variant/50 rounded-3xl overflow-hidden hover:border-primary/45 hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer shadow-sm hover:shadow-lg hover:shadow-primary/5"
            onClick={() => setSelectedProject(project)}
          >
            <div className={`h-40 relative bg-gradient-to-br ${project.accentClass} overflow-hidden`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_55%)]" />
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.15)_50%,transparent_75%)]" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-white text-[9px] font-mono uppercase tracking-wider font-bold border border-white/15">
                  <BarChart3 className="w-3 h-3" />
                  {project.category}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-grow flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-primary-container/35 border border-outline-variant/40 rounded-full text-[9px] font-mono font-bold tracking-wide uppercase text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-headline text-lg sm:text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                {project.title}
              </h3>

              <p className="text-on-surface-variant text-sm mb-5 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="pt-5 border-t border-outline-variant/40 mt-auto flex items-end justify-between gap-4">
                <div>
                  <div className="text-primary font-headline text-2xl font-extrabold tracking-tight">
                    {project.metricValue}
                  </div>
                  <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mt-0.5">
                    {project.metricLabel}
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Details
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/75 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="bg-surface border border-outline-variant max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-48 sm:h-56 relative bg-gradient-to-br ${selectedProject.accentClass}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

              <button
                type="button"
                className="absolute top-4 right-4 w-9 h-9 bg-surface/90 border border-outline-variant hover:bg-surface-container text-on-surface rounded-full flex items-center justify-center transition-colors cursor-pointer"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-surface/90 text-primary text-[9px] font-mono uppercase tracking-wider font-bold border border-outline-variant">
                  {selectedProject.category}
                </span>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface/90 text-primary text-[9px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold border border-outline-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  id="project-modal-title"
                  className="font-headline text-xl sm:text-2xl font-bold text-on-surface tracking-tight leading-snug"
                >
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 bg-surface">
              <div>
                <h4 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold">
                  Project Overview
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold">
                  Approach &amp; Scope
                </h4>
                <p className="text-on-surface text-sm leading-relaxed bg-surface-container p-5 border border-outline-variant/50 rounded-2xl">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-3 font-bold">
                  Key Achievements
                </h4>
                <ul className="space-y-3">
                  {selectedProject.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-3 text-sm text-on-surface leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-container p-5 border border-outline-variant/50 rounded-2xl">
                <div>
                  <div className="text-primary font-headline text-2xl font-extrabold">
                    {selectedProject.metricValue}
                  </div>
                  <div className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider font-bold mt-1">
                    {selectedProject.metricLabel}
                  </div>
                </div>

                <button
                  type="button"
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-mono text-[10px] uppercase font-extrabold tracking-widest hover:brightness-110 active:scale-95 transition-all cursor-pointer border-none w-full sm:w-auto"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
