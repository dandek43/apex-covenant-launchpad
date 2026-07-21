## Goal

1. Make the contact form actually deliver submissions to **dan@apexcovenant.com** once published.
2. Confirm the whole project (images, AI chat, contact form) works when deployed from GitHub → Cloudflare Workers.

## Part 1 — Contact form email

We'll use Lovable's built-in email sender (no third-party API key needed). It requires a sender domain you own.

Steps:
1. Prompt you to set up an email sender domain via the built-in email setup dialog (e.g. `notify.apexcovenant.com`). Real domain required — no free/shared sender exists.
2. Scaffold the app-email template system (React Email template registry + server-only send helper).
3. Create a `contact-notification` template (styled to match the dark navy brand) that includes name, company, email, phone, and message.
4. Convert the contact form to POST to a new TanStack server route (`src/routes/api/contact.ts`) that:
   - Validates input with Zod
   - Verifies Cloudflare Turnstile (once you provide a Turnstile secret — optional)
   - Calls `sendTemplateEmail('contact-notification', 'dan@apexcovenant.com', {...})`
   - Returns success/error to the form
5. Keep the existing success UI; surface real errors if the send fails.

Emails activate once your sender domain's DNS is verified. Until then the rest of the site works normally.

## Part 2 — Cloudflare Workers portability audit

Confirm everything currently in the project translates cleanly to Cloudflare Workers via GitHub:

- **Images**: already migrated to local `src/assets/*` imports (logo, hero-bg, contact-bg). Vite bundles these at build — ✅ portable.
- **AI chat widget** (`src/routes/api/chat.ts`): uses `LOVABLE_API_KEY` + `fetch` to Lovable AI Gateway. Works on Workers only if `LOVABLE_API_KEY` is set as a Worker secret in Cloudflare. I'll document that in the plan output.
- **Contact email route**: same requirement — needs `LOVABLE_API_KEY` on the Worker.
- **TanStack Start config**: verify `vite.config.ts` / server target is Workers-compatible (nodejs_compat, no `ssr.external`). Adjust if needed.
- **Env vars**: `VITE_SUPABASE_*` are baked into the client build; `LOVABLE_API_KEY` must be added as a Cloudflare Worker secret (`wrangler secret put LOVABLE_API_KEY`).

Deliverable: a short README section (`DEPLOY.md`) with the exact Cloudflare Worker env vars/secrets required so nothing silently breaks after deploy.

## What I need from you before building

- Approve this plan.
- After approval, complete the **email domain setup dialog** I'll open (you'll need a domain you own — `apexcovenant.com` looks like the natural choice; we'll delegate a subdomain like `notify.apexcovenant.com`).

## Not included (ask if you want)

- Custom domain connection for the site itself (separate from email sender).
- Storing submissions in a database in addition to email.
- Auto-reply confirmation email to the person who submitted the form.
