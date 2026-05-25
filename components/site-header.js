"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { usePathname } from "next/navigation";
import { servicePages } from "@/data/source-pages";

const navItems = [
  { href: "/", label: "Úvod" },
  { href: "/sluzby/oplastenia-budov", label: "Služby" },
  { href: "/realizacie/oplastenia-budov", label: "Realizácie" },
  { href: "/certifikaty", label: "Certifikáty" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

import { useState, useEffect } from "react";
import { Menu, X, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Track scroll position on the homepage
  useEffect(() => {
    if (pathname !== "/") return;
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className={`fixed top-0 z-50 w-full max-w-full bg-white/95 border-b border-line backdrop-blur-md shadow-sm transition-all duration-300 ${pathname === "/" ? (scrolled ? "lg:translate-y-0 lg:opacity-100" : "lg:-translate-y-full lg:opacity-0 lg:pointer-events-none") : ""}`}>
        {/* Top Bar */}
        <div className="hidden lg:block bg-[#004a99] text-white/90 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em]">
          <div className="shell flex justify-end items-center gap-8">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5 opacity-60" />
              <span>{siteConfig.email}</span>
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5 opacity-60" />
              <span>{siteConfig.phone}</span>
            </a>
          </div>
        </div>

        <div className="shell flex items-center justify-between gap-8 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Transparent pozadie.png"
              alt="INREST"
              width={200}
              height={56}
              className="h-9 w-auto md:h-11"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-[13px] font-black uppercase tracking-[0.12em] text-foreground lg:flex">
            {navItems.filter(item => item.label !== "Kontakt").map((item) => {
              const isServices = item.label === "Služby";
              const isRealizacie = item.label === "Realizácie";
              const isActive = pathname === item.href || 
                (isServices && pathname.startsWith("/sluzby")) ||
                (isRealizacie && pathname.startsWith("/realizacie"));
              
              return (
                <div key={item.href} className="group relative">
                  <Link 
                    href={item.href} 
                    className={`relative flex items-center gap-1.5 py-6 transition-all duration-300 hover:text-accent ${isActive ? "text-accent" : "text-foreground"}`}
                  >
                    {item.label}
                    {isServices && (
                      <svg className="h-3 w-3 transition-transform group-hover:rotate-180 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <span className={`absolute bottom-5 left-0 h-[2px] bg-accent transition-all duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>

                  {isServices && (
                    <div className="invisible fixed left-0 top-[128px] w-full max-w-[100vw] opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 z-50">
                      <div className="overflow-hidden border-b border-line bg-white/95 shadow-[0_40px_100px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                        <div className="shell py-10 px-8">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                            {servicePages.map((service, sidx) => (
                              <Link
                                key={service.slug}
                                href={`/sluzby/${service.slug}`}
                                className="group/item flex flex-col gap-3 p-2 rounded-2xl transition-all hover:bg-zinc-50 border border-transparent hover:border-line/10"
                              >
                                <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-line/10 bg-zinc-100">
                                  <Image 
                                    src={service.image} 
                                    alt={service.title} 
                                    fill 
                                    className="object-cover transition-transform duration-700 group-hover/item:scale-110" 
                                    sizes="250px"
                                  />
                                  <div className="absolute inset-0 bg-black/5 transition-opacity group-hover/item:opacity-0" />
                                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[8px] font-black uppercase text-zinc-900">
                                    0{sidx + 1}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1.5 px-0.5">
                                  <span className="hover-split-text text-[11px] font-black uppercase text-zinc-900 overflow-hidden">
                                    <span className="hover-split-text-inner" data-text={service.title}>
                                      {service.title}
                                    </span>
                                  </span>
                                  <div className="h-[1.5px] w-0 bg-accent transition-all duration-500 group-hover/item:w-full" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/kontakt" className="button-primary hidden xl:inline-flex !py-2.5 !px-7 !text-[11px] !rounded-full">
              Kontakt
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line/20 bg-zinc-50 lg:hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - OUTSIDE of header to avoid backdrop-filter fixed-position bug */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/20"
            />
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              exit={{ y: "105%" }}
              transition={{ 
                type: "spring", 
                damping: 38, 
                stiffness: 400, 
                mass: 1 
              }}
              className="fixed bottom-0 left-0 right-0 z-[110] h-[70dvh] bg-white rounded-t-2xl shadow-[0_-15px_60px_rgba(0,0,0,0.15)] flex flex-col pt-3 px-8 pb-[env(safe-area-inset-bottom,40px)]"
            >
              <div className="mx-auto mb-6 h-1 w-12 flex-shrink-0 rounded-full bg-zinc-200" />
              
              <div className="flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide pb-10">
                {navItems.map((item, idx) => {
                  const isServices = item.label === "Služby";
                  const isRealizacie = item.label === "Realizácie";
                  const isActive = pathname === item.href || 
                    (isServices && pathname.startsWith("/sluzby")) ||
                    (isRealizacie && pathname.startsWith("/realizacie"));
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.04 }}
                    >
                      <Link 
                        href={item.href}
                        className={`block py-1 text-2xl font-bold tracking-normal ${isActive ? "text-accent" : "text-zinc-900"}`}
                      >
                        {item.label}
                      </Link>

                      {isServices && (
                        <div className="mt-5 grid grid-cols-1 gap-3 border-l-2 border-line/10 pl-8">
                          {servicePages.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/sluzby/${service.slug}`}
                              className="py-1 text-[13px] font-bold uppercase tracking-[0.1em] text-muted hover:text-foreground"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto pt-8 border-t border-line/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.02em] text-muted mb-4 opacity-50">Kontakt</p>
                <div className="space-y-1">
                  <p className="text-xl font-bold tracking-tight text-zinc-900">{siteConfig.phone}</p>
                  <p className="text-base font-medium text-muted">{siteConfig.email}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

