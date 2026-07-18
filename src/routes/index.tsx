import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Building2, Users, Radio, Rocket, Globe2, Signal, Menu, X, CheckCircle2, Mail, Phone, User, Briefcase } from "lucide-react";
import logoUrl from "@/assets/apex-covenant-logo.png";
import heroBgUrl from "@/assets/hero-bg.jpg";
import contactBgUrl from "@/assets/contact-bg.png";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-6 h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-2">
            <img
              src={logoUrl}
              alt="Apex Covenant Consulting"
              className="h-6 md:h-7 w-auto"
              style={{ filter: "invert(1) brightness(2)" }}
            />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition">About</a>
            <a href="#capabilities" className="hover:text-foreground transition">Capabilities</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-brand-foreground shadow-brand hover:opacity-95 transition">
              Get in touch <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95">
            <div className="px-6 py-4 flex flex-col gap-3 text-sm">
              <a href="#about" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground">About</a>
              <a href="#capabilities" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Capabilities</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Contact</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-4 py-2 font-semibold text-brand-foreground">
                Get in touch <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgUrl}
            alt="Business professionals meeting in a modern conference room"
            className="h-full w-full object-cover"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-background/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              High-Tech Business Development & Marketing
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
              20+ Years of High-Tech <span className="text-gradient-brand">Business Development</span> & Marketing Excellence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              From scaling consumer brands in major retail to empowering rural telecoms with MVNO mobility solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-semibold text-brand-foreground shadow-brand hover:opacity-95 transition"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3.5 font-semibold text-foreground hover:bg-surface transition"
              >
                Explore Capabilities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">About / Experience</p>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
                A career built at the intersection of academia, enterprise, and the frontier of tech.
              </h2>
            </div>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                A diverse career navigating graduate academia, a Fortune 100 company, the dot-com era, and leadership of a <span className="text-foreground font-medium">$20M branch</span> of a global tech manufacturer.
              </p>
              <p>
                A reputation for forging lasting relationships across highly diverse segments — telcos, wireless ISPs, security VARs, integrators, and distributors — turning technical capability into commercial momentum.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Users, value: "800+", label: "B2B Customers Served" },
              { icon: Building2, value: "7+", label: "Distributors with 200+ sales reps" },
              { icon: Globe2, value: "40+", label: "Trade Shows Annually" },
            ].map((s) => (
              <div key={s.label} className="group relative rounded-2xl border border-border bg-surface p-8 shadow-card overflow-hidden">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <s.icon className="h-6 w-6 text-brand" />
                <div className="mt-6 text-5xl font-semibold tracking-tight text-foreground">{s.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="py-24 md:py-32 border-t border-border/60 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">Core Milestones & Capabilities</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              Proven results across brand, national strategy, and telecom enablement.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Rocket,
                year: "2018",
                title: "Brand Scaling",
                body: "Launched NexusLink, successfully penetrating major retail channels — Amazon, Walmart, Newegg, and eBay — with powerful SEO/SEM strategies.",
                tags: ["Amazon", "Walmart", "Newegg", "eBay"],
              },
              {
                icon: Globe2,
                year: "2024",
                title: "National Initiatives",
                body: "Appointed to lead a national business development initiative, creating fresh revenue streams and expanding communication verticals across North America and LATAM.",
                tags: ["North America", "LATAM"],
              },
              {
                icon: Signal,
                year: "2025",
                title: "Telecom & Mobility Enablement",
                body: "Point person for Comtrend's LaunchMyMVNO service with OXIO, acting as an MVNE to help rural telecoms launch MVNO services and bring mobile capabilities to their subscribers.",
                tags: ["MVNE", "MVNO", "Rural Telecom"],
              },
            ].map((c) => (
              <article key={c.title} className="relative rounded-2xl border border-border bg-surface p-8 shadow-card flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{c.year}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Apex Covenant" className="h-5 w-auto" style={{ filter: "invert(1) brightness(2)" }} />
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Apex Covenant Consulting. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // Placeholder submission — wire up backend / email routing later.
    setTimeout(() => setStatus("success"), 700);
  }

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={contactBgUrl}
          alt="Modern Apex Covenant Consulting office building at dusk"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">Contact Us</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              Let's build your next revenue channel.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Whether you're scaling a consumer brand into national retail or launching MVNO service to your subscriber base — we'd like to hear from you.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Submissions route directly to the executive team",
                "Immediate response — typically within one business day",
                "Confidential — used only to reply to your inquiry",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-card">
            {status === "success" ? (
              <div className="py-16 text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">Message received.</h3>
                <p className="mt-2 text-sm text-muted-foreground">Our executive team will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field id="name" label="Name" icon={User}>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field id="email" label="Company Email" icon={Mail}>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
                    placeholder="jane@company.com"
                  />
                </Field>
                <Field id="phone" label="Phone Number" icon={Phone}>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
                    placeholder="+1 (555) 000-0000"
                  />
                </Field>
                <Field id="message" label="Message" icon={Briefcase} align="top">
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 resize-none"
                    placeholder="Tell us about your goals, market, or opportunity…"
                  />
                </Field>

                {/* Cloudflare Turnstile placeholder */}
                <div
                  className="rounded-lg border border-dashed border-border bg-background/40 px-4 py-4 text-xs text-muted-foreground flex items-center justify-between"
                  data-cf-turnstile-placeholder
                >
                  <span>Cloudflare Turnstile</span>
                  <span className="font-mono text-[10px] text-muted-foreground/70">bot-protection widget mounts here</span>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-semibold text-brand-foreground shadow-brand hover:opacity-95 transition disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Submissions route directly to the executive team for immediate response.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id, label, icon: Icon, align = "center", children,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  align?: "center" | "top";
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-2">{label}</span>
      <div className={`flex ${align === "top" ? "items-start" : "items-center"} gap-3 rounded-lg border border-border bg-background/60 px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition`}>
        <Icon className={`h-4 w-4 text-muted-foreground shrink-0 ${align === "top" ? "mt-1" : ""}`} />
        {children}
      </div>
    </label>
  );
}
