import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SourceHero } from "@/components/source-layout";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";


export const metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte INREST s.r.o. v Považskej Bystrici. Kontaktný formulár, prevádzka, klampiarska výroba a priame kontakty na vedenie spoločnosti.",
  alternates: {
    canonical: absoluteUrl("/kontakt"),
  },
  openGraph: {
    title: "Kontakt | INREST",
    description:
      "Kontaktný formulár a priame kontakty na spoločnosť INREST s.r.o. vrátane prevádzky a fakturačných údajov.",
    url: absoluteUrl("/kontakt"),
    images: [
      {
        url: absoluteUrl("/media/hero.jpg"),
        width: 1024,
        height: 768,
        alt: "Kontakt na INREST s.r.o.",
      },
    ],
  },
};

export default function KontaktPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": absoluteUrl("/kontakt#contactpage"),
        url: absoluteUrl("/kontakt"),
        name: "Kontakt | INREST",
        description:
          "Kontaktná stránka spoločnosti INREST s.r.o. s formulárom a firemnými údajmi.",
        inLanguage: "sk-SK",
      },
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.legalName,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
      },
    ],
  };

  return (
    <main className="relative overflow-hidden pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div className="page-orb page-orb-left" aria-hidden="true" />
      <div className="page-orb page-orb-right" aria-hidden="true" />

      <SiteHeader />

      <SourceHero
        title="Kontakt"
        image="/media/hero.jpg"
      />

      <section className="shell py-20">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Info Section */}
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            {/* Left Column: Leadership */}
            <Reveal className="lg:col-span-7 space-y-12">
              <div>
                <p className="section-kicker mb-6">Vedenie spoločnosti</p>
                <div className="grid gap-12 sm:grid-cols-2">
                  <div className="space-y-4">
                    <p className="section-kicker !text-[11px]">konateľ</p>
                    <p className="text-3xl font-black text-zinc-900 tracking-tight">Pavol Fraštík</p>
                    <div className="text-lg text-muted space-y-1 flex flex-col pt-2">
                      <a href="tel:+421948756681" className="hover:text-accent transition-colors">+421 948 756 681</a>
                      <a href="mailto:frastik@inrestsro.sk" className="hover:text-accent transition-colors">frastik@inrestsro.sk</a>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="section-kicker !text-[11px]">konateľ, vedúci výroby</p>
                    <p className="text-3xl font-black text-zinc-900 tracking-tight">Martin Fraštík</p>
                    <div className="text-lg text-muted space-y-1 flex flex-col pt-2">
                      <a href="tel:+421908264970" className="hover:text-accent transition-colors">+421 908 264 970</a>
                      <a href="mailto:m.frastik@inrestsro.sk" className="hover:text-accent transition-colors">m.frastik@inrestsro.sk</a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Billing Info Card */}
            <Reveal delay={200} className="lg:col-span-5 p-10 md:p-12 rounded-[3rem] bg-zinc-50 border border-line shadow-sm">
              <p className="section-kicker mb-8">Fakturačné údaje</p>
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="font-black text-2xl text-zinc-900 uppercase">INREST, s. r. o.</p>
                  <p className="text-lg text-muted">Lánska 64/961, 017 01 Považská Bystrica</p>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-5 rounded-2xl bg-white border border-line">
                    <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-1">IČO</p>
                    <p className="text-lg font-bold text-zinc-900">44 637 896</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-line">
                    <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-1">IČ DPH</p>
                    <p className="text-lg font-bold text-zinc-900">SK2022806148</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-line/50">
                  <p className="text-muted leading-relaxed">
                    <span className="text-zinc-900 font-bold uppercase text-xs tracking-widest block mb-1 opacity-60">Banka</span> 
                    Tatra Banka, a.s. Pov. Bystrica
                  </p>
                  <p className="text-xl font-black text-zinc-900 tracking-tight">IBAN: SK66 1100 0000 0029 4646 1034</p>
                  <p className="text-sm opacity-60">Register: OS Trenčín, 21533/R</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>

          {/* Maps Section */}
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal delay={300} className="space-y-6">
              <div className="space-y-2">
                <p className="section-kicker">Prevádzka</p>
                <p className="text-lg text-muted">Robotnícka 258, 017 01 Považská Bystrica</p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-[2.5rem] border border-line bg-zinc-50 shadow-xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2610.1554562035255!2d18.452636577317785!3d49.1112440713673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47148bf42506b87b%3A0x5959ebd5bc7c8990!2sINREST%20s.r.o.!5e0!3m2!1ssk!2ssk!4v1713568000000!5m2!1ssk!2ssk"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </Reveal>

            <Reveal delay={400} className="space-y-6">
              <div className="space-y-2">
                <p className="section-kicker">Výroba</p>
                <p className="text-lg text-muted">Dolný Lieskov 1262, 018 21 Dolný Lieskov</p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-[2.5rem] border border-line bg-zinc-50 shadow-xl">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.826384218331!2d18.455436377317785!3d49.0742440713673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47148be8727447b9%3A0xe194605963283232!2sDoln%C3%BD+Lieskov+1262%2C+018+21+Doln%C3%BD+Lieskov!5e0!3m2!1ssk!2ssk!4v1713568000001!5m2!1ssk!2ssk"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
