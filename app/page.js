"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import {
  clients,
  services,
  featuredProjects,
} from "@/data/site-content";
import { realizationPages } from "@/data/source-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";

function SectionHeading({ kicker, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{description}</p>
    </div>
  );
}

// Helper to resolve links from featured projects to the detailed category / project indices
function findProjectLink(projectTitle) {
  for (let catIdx = 0; catIdx < realizationPages.length; catIdx++) {
    const category = realizationPages[catIdx];
    if (category.projects) {
      const projIdx = category.projects.findIndex(p => 
        p.title.toLowerCase().includes(projectTitle.split(",")[0].trim().toLowerCase()) ||
        projectTitle.toLowerCase().includes(p.title.split(",")[0].trim().toLowerCase())
      );
      if (projIdx !== -1) {
        return `/realizacie/${category.slug}/${projIdx}`;
      }
    }
  }
  return "/realizacie";
}

const slides = [
  {
    id: "oplastenia-budov",
    title: "Opláštenia budov",
    eyebrow: "Sendvičové panely a fasády",
    description: "Zabezpečujeme profesionálnu montáž obvodových a strešných plášťov vrátane moderných esteticko-energetických fasádnych systémov.",
    image: "/media/services-oplastenia.jpg",
    link: "/sluzby/oplastenia-budov"
  },
  {
    id: "hydroizolacie",
    title: "Hydroizolácie",
    eyebrow: "Ploché strechy a spodné stavby",
    description: "Realizujeme komplexné hydroizolácie plochých striech a izolácie spodných stavieb s využitím moderných PVC a asfaltových systémov.",
    image: "/media/services-hydro.jpg",
    link: "/sluzby/hydroizolacie"
  },
  {
    id: "stresne-svetliky",
    title: "Strešné svetlíky",
    eyebrow: "Presvetlenie a odvetranie RWA",
    description: "Dodávame a montujeme bodové, pásové a shedové svetlíky pre prirodzené svetlo a bezpečný odvod dymu pri požiaroch.",
    image: "/media/services-svetliky.jpg",
    link: "/sluzby/stresne-svetliky"
  },
  {
    id: "vyroba-klampiarskych-prvkov",
    title: "Klampiarska výroba",
    eyebrow: "Ohýbanie na CNC strojoch",
    description: "Spracovávame a ohýbame plechy na mieru pomocou pokročilých CNC strojov s dĺžkou ohybu až do 6100 mm a širokým spektrom materiálov.",
    image: "/media/services-klampiarske.jpg",
    link: "/sluzby/vyroba-klampiarskych-prvkov"
  }
];

export default function HomePage() {
  const [activeHero, setActiveHero] = useState(0);
  const autoplayTimerRef = useRef(null);

  const resetAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  const handleSelectSlide = (idx) => {
    setActiveHero(idx);
    resetAutoplay();
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.legalName,
        url: siteConfig.url,
        logo: absoluteUrl("/Transparent pozadie.png"),
        email: siteConfig.email,
        telephone: siteConfig.phone,
      },
      {
        "@type": "LocalBusiness",
        "@id": absoluteUrl("/#localbusiness"),
        name: siteConfig.legalName,
        image: absoluteUrl("/media/hero.jpg"),
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        priceRange: "$$",
        foundingDate: "2009",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Lánska 64/961",
          addressLocality: "Považská Bystrica",
          postalCode: "017 01",
          addressCountry: "SK",
        },
        areaServed: ["Slovakia", "Czech Republic"],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "sk-SK",
      },
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/#webpage"),
        url: absoluteUrl("/"),
        name: "INREST | Opláštenia budov, hydroizolácie a klampiarska výroba",
        isPartOf: {
          "@id": absoluteUrl("/#website"),
        },
        about: {
          "@id": absoluteUrl("/#organization"),
        },
        description: siteConfig.description,
        inLanguage: "sk-SK",
      },
    ],
  };

  return (
    <main className="relative overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      {/* Global Header (shown on mobile, and slides down on desktop scroll) */}
      <SiteHeader />

      {/* Hero Split Section */}
      <section id="top" className="relative flex flex-col lg:flex-row h-[85vh] lg:h-screen w-full overflow-hidden bg-black">
        
        {/* Desktop Navigation Sidebar (Left Column - ONLY inside Hero, 25% width on lg) */}
        <aside className="hidden lg:flex lg:w-[25%] xl:w-[20%] bg-white border-r border-line flex-col justify-between py-12 px-8 z-10 h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div>
            {/* Logo Area */}
            <Link href="/" className="inline-block">
              <Image
                src="/Transparent pozadie.png"
                alt="INREST"
                width={220}
                height={62}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Sidebar Nav (selecting the active slide) */}
          <div className="flex flex-col gap-6 pl-5 border-l-2 border-line/10 relative py-4 my-auto">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleSelectSlide(idx)}
                className={`home-sidebar-link text-left outline-none ${activeHero === idx ? "is-active" : ""}`}
              >
                {slide.title}
              </button>
            ))}
          </div>

          {/* Sidebar Bottom Footer Info */}
          <div className="text-[11px] font-bold text-muted/60 uppercase tracking-widest leading-relaxed">
            <p>© {new Date().getFullYear()} INREST s.r.o.</p>
            <p className="mt-1 font-medium lowercase tracking-normal text-muted/80">{siteConfig.email}</p>
          </div>
        </aside>

        {/* Right Slider Panel */}
        <div className="relative flex-grow h-full flex items-center justify-between px-6 sm:px-12 lg:px-20">
          
          {/* Header overlay for the top of the hero slide */}
          <header className="absolute top-0 left-0 right-0 z-20 hidden lg:flex justify-end items-center gap-12 py-8 px-12 text-white">
            <nav className="flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.16em]">
              <Link href="/" className="group relative py-2 transition-colors">
                Úvod
                <span className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ease-out w-full" />
              </Link>
              <Link href="/sluzby/oplastenia-budov" className="group relative py-2 transition-colors">
                Služby
                <span className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full" />
              </Link>
              <Link href="/realizacie/oplastenia-budov" className="group relative py-2 transition-colors">
                Realizácie
                <span className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full" />
              </Link>
              <Link href="/certifikaty" className="group relative py-2 transition-colors">
                Certifikáty
                <span className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full" />
              </Link>
              <Link href="/o-nas" className="group relative py-2 transition-colors">
                O nás
                <span className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-300 ease-out w-0 group-hover:w-full" />
              </Link>
            </nav>
            <Link href="/kontakt" className="button-primary !py-2.5 !px-8 !text-[11px] !rounded-full">
              Kontakt
            </Link>
          </header>

          {/* Background Images Crossfade Animation */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeHero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/45 lg:from-black/75 lg:via-black/45 lg:to-black/35" />
                <Image
                  src={slides[activeHero].image}
                  alt={slides[activeHero].title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Content Overlay */}
          <div className="relative z-10 max-w-4xl space-y-6 pt-16 lg:pt-0 pb-20 lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHero}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  {slides[activeHero].eyebrow}
                </p>
                <h1 className="hero-title text-white uppercase text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.92] max-w-2xl">
                  {slides[activeHero].title}
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-zinc-300 max-w-xl">
                  {slides[activeHero].description}
                </p>
                <div className="pt-4">
                  <Link href={slides[activeHero].link} className="button-primary text-[11px] font-bold tracking-widest py-3 px-8 rounded-full uppercase shadow-lg shadow-accent/20">
                    Prejsť na detaily
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side Vertical Indicators */}
          <div className="relative z-10 flex flex-col gap-6 items-end hidden sm:flex">
            {slides.map((slide, idx) => (
              <button
                key={`indicator-${slide.id}`}
                onClick={() => handleSelectSlide(idx)}
                className={`hero-line-indicator outline-none ${activeHero === idx ? "is-active" : ""}`}
              >
                <span>0{idx + 1}</span>
                <div className="hero-line-indicator-line" />
              </button>
            ))}
          </div>

          {/* Mobile Bottom Indicators (Grid of 4 boxes at the bottom, mobile only) */}
          <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-4 border-t border-white/10 lg:hidden bg-black/40 backdrop-blur-sm">
            {slides.map((slide, idx) => (
              <button
                key={`mob-ind-${slide.id}`}
                onClick={() => handleSelectSlide(idx)}
                className={`py-4 text-center text-xs font-bold font-heading border-r last:border-r-0 border-white/10 transition-colors uppercase ${activeHero === idx ? "bg-white/10 text-white" : "text-white/40"}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Naše Služby (Our Services) Section - Spans Full Width */}
      <section className="shell py-24 border-b border-line/10">
        <Reveal>
          <SectionHeading
            kicker="Služby"
            title="Naša ponuka prác"
            description="Zabezpečujeme komplexné a spoľahlivé realizácie pre priemysel a občiansku výstavbu od návrhu až po odovzdanie."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="css-stagger-item flex flex-col bg-white border border-line/30 rounded-3xl overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300 group"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Image Wrap */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50 border-b border-line/20">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-0.5 rounded-lg text-[9px] font-black uppercase text-zinc-900 tracking-wider">
                  0{index + 1}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{service.eyebrow}</p>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted line-clamp-3">{service.description}</p>
                  
                  {/* Bullets List */}
                  <ul className="space-y-2 pt-4 border-t border-line/50">
                    {service.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-[13px] text-muted">
                        <span className="h-1.5 w-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link href={`/sluzby/${service.id}`} className="button-secondary w-full text-[10px] font-bold tracking-widest uppercase">
                    Zobraziť viac
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Naše Referencie (Our Realizations) Section - Spans Full Width */}
      <section className="shell py-24">
        <Reveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              kicker="Referencie"
              title="Naše realizácie"
              description="Prezrite si výber z našich najvýznamnejších referenčných stavieb za obdobie nášho pôsobenia."
            />
            <Link
              href="/realizacie"
              className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors shrink-0"
            >
              Všetky realizácie
              <div className="h-[1.5px] w-6 bg-line group-hover:w-10 group-hover:bg-accent transition-all duration-300" />
            </Link>
          </div>
        </Reveal>

        {/* Cards Grid: Matching Category Project card style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredProjects.map((project, index) => {
            const projectLink = findProjectLink(project.title);
            const originalSrc = project.image;
            const previewSrc = originalSrc && originalSrc.startsWith("/projects/realizacie/")
              ? originalSrc.replace("/projects/realizacie/", "/projects/previews/realizacie/")
              : originalSrc;

            return (
              <div
                key={project.title}
                className="css-stagger-item"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Link 
                  href={projectLink}
                  className="group flex flex-col border border-line/10 bg-white transition-all hover:border-accent/40 rounded-none overflow-hidden shadow-sm"
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    <Image 
                      src={previewSrc} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-all duration-700 group-hover:scale-110" 
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
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
            );
          })}
        </div>
      </section>

      {/* Partners Section (Clients) - Spans Full Width */}
      <section className="shell py-20 border-t border-line/10">
        <Reveal>
          <SectionHeading
            kicker="Partneri"
            title="Naši spokojní klienti"
            description="Budujeme dlhodobé vzťahy s poprednými firmami v stavebnom a strojárskom odvetví."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">
          {clients.map((client, index) => {
            let heightClass = "h-10";
            if (index < 11 && index !== 2) {
              const extraBig = [0, 4, 5, 6, 7].includes(index);
              heightClass = extraBig ? "h-[104px]" : "h-20";
            }
            
            return (
              <Reveal key={client.name} delay={index * 30} className="logo-card">
                <Image 
                  src={client.image} 
                  alt={client.name} 
                  width={320} 
                  height={144} 
                  className={`${heightClass} w-auto object-contain opacity-80 transition duration-500 hover:opacity-100`} 
                />
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
