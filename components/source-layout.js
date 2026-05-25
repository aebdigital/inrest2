import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";

export function SourceCopy({ children, className = "" }) {
  return <div className={`source-copy ${className}`}>{children}</div>;
}

export function SourceHero({ title, image }) {
  return (
    <section className="relative h-[30vh] min-h-[260px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0 transition-transform duration-700 hover:scale-105">
        <Image 
          src={image || "/media/hero.jpg"} 
          alt={title} 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="shell relative z-10 flex h-full items-end pb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}

export function SidebarShell({ kicker, title, description, image, items, activeSlug, basePath, children }) {
  return (
    <main className="relative pb-20 overflow-x-hidden">
      <div className="page-orb page-orb-left pointer-events-none" aria-hidden="true" />
      <div className="page-orb page-orb-right pointer-events-none" aria-hidden="true" />
      <SiteHeader />
      <SourceHero title={title} image={image} />

      <section className="shell py-20">
        <div className="sidebar-grid">
          <aside className="source-sidebar mb-8 lg:mb-0 lg:sticky lg:top-[11rem] z-20 bg-white/95 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none border-b border-line/10 lg:border-none overflow-hidden max-w-full">
            <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide pt-4 lg:pt-12 w-full">
              {items.map((item) => {
                const href = item.slug ? `${basePath}/${item.slug}` : basePath;
                const isActive = activeSlug === item.slug;

                return (
                  <Link 
                    key={item.slug} 
                    href={href} 
                    className={`filter-tab group ${isActive ? "is-active" : ""}`}
                  >
                    <span>{item.title}</span>
                    <span className={`hidden lg:inline-flex items-center justify-center transition-all duration-300 font-bold ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                      &rarr;
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="grid gap-6 min-h-[60vh]">{children}</div>
        </div>
      </section>
    </main>
  );
}
