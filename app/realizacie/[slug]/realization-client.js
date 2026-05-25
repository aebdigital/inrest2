"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SidebarShell } from "@/components/source-layout";

export function RealizationClient({ page, realizationPages }) {
  return (
    <SidebarShell
      kicker="Realizácie"
      title={page.title}
      description="Zákazky realizované našou firmou:"
      image={page.image}
      items={realizationPages}
      activeSlug={page.slug}
      basePath="/realizacie"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {page.projects && page.projects.map((project, pIdx) => {
          const originalSrc = project.gallery[0];
          const previewSrc = originalSrc && originalSrc.startsWith("/projects/") 
            ? originalSrc.replace("/projects/", "/projects/previews/") 
            : originalSrc;

          return (
            <div 
              key={`p2-${pIdx}`} 
              className="css-stagger-item animate-duration-500"
              style={{ animationDelay: `${pIdx * 35}ms` }}
            >
              <Link 
                href={`/realizacie/${page.slug}/${pIdx}`}
                className="group flex flex-col border border-line/10 bg-white transition-all hover:border-accent/40"
              >
                <div className="relative aspect-square overflow-hidden bg-zinc-100">
                  <Image 
                    src={previewSrc} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-all duration-700 group-hover:scale-110" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={pIdx < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-4">
                  <h3 className="line-clamp-2 text-[10px] font-bold uppercase tracking-tight text-white leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        )})}
      </div>

      <Reveal className="source-panel mt-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <p className="section-kicker">Zoznam referencií</p>
        </div>
        <div className="mt-8 grid gap-x-12 gap-y-3 sm:grid-cols-2">
          {page.items.map((item, index) => (
            <div key={`${page.slug}-v2-${index}`} className="flex items-start gap-3 py-1">
              <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 bg-[var(--accent)]" />
              <span className="text-[14px] leading-relaxed text-muted">{item}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </SidebarShell>
  );
}
