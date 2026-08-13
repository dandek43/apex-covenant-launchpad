import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Mail, Phone, User, Briefcase } from "lucide-react";

export function ContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && result.success) {
        setStatus("success");
        setTimeout(() => {
          navigate({ to: "/" });
        }, 2500);
      } else {
        setErrorMessage(result.error || "Failed to send message.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("An unexpected error occurred.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-card">
        <div className="py-12 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-foreground">
            Thanks — we'll be in touch shortly.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">Returning to the homepage…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-6 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField id="name" label="Name" icon={User}>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            disabled={status === "loading"}
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 disabled:opacity-50"
            required
          />
        </FormField>

        <FormField id="email" label="Company Email" icon={Mail}>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            disabled={status === "loading"}
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 disabled:opacity-50"
            required
          />
        </FormField>

        <FormField id="phone" label="Phone Number" icon={Phone}>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            disabled={status === "loading"}
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 disabled:opacity-50"
          />
        </FormField>

        <FormField id="message" label="Message" icon={Briefcase} align="top">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your goals, market, or opportunity…"
            disabled={status === "loading"}
            rows={4}
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 resize-none disabled:opacity-50"
            required
          />
        </FormField>

        <div className="rounded-lg border border-dashed border-border bg-background/40 px-4 py-4 text-xs text-muted-foreground flex items-center justify-between">
          <span>Cloudflare Turnstile</span>
          <span className="font-mono text-[10px] text-muted-foreground/70">
            bot-protection widget mounts here
          </span>
        </div>

        {status === "error" && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-semibold text-brand-foreground shadow-brand hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : "Send Message"}
          {status !== "loading" && <ArrowRight className="h-4 w-4" />}
        </button>

        <p className="text-[11px] text-muted-foreground text-center">
          Submissions route directly to the executive team for immediate response.
        </p>
      </form>
    </div>
  );
}

function FormField({
  id,
  label,
  icon: Icon,
  align = "center",
  children,
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
      <div
        className={`flex ${
          align === "top" ? "items-start" : "items-center"
        } gap-3 rounded-lg border border-border bg-background/60 px-4 py-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 transition`}
      >
        <Icon
          className={`h-4 w-4 text-muted-foreground shrink-0 ${align === "top" ? "mt-1" : ""}`}
        />
        {children}
      </div>
    </label>
  );
}
