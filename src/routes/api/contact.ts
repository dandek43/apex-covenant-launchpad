import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            name?: string;
            email?: string;
            phone?: string;
            message?: string;
          };

          const name = (body.name ?? "").trim();
          const email = (body.email ?? "").trim();
          const phone = (body.phone ?? "").trim();
          const message = (body.message ?? "").trim();

          if (!name || !email || !message) {
            return json(
              { success: false, error: "Please fill in all required fields." },
              { status: 400 },
            );
          }

          const apiKey = process.env.RESEND_API_KEY;

          if (!apiKey) {
            console.error("RESEND_API_KEY is not set");
            return json(
              { success: false, error: "Email service is not configured." },
              { status: 500 },
            );
          }

          const escape = (s: string) =>
            s
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Apex Covenant <noreply@send.apexcovenant.com>",
              to: ["dan@apexcovenant.com"],
              reply_to: email,
              subject: `New contact form submission from ${name}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>New Contact Form Submission</h2>
                  <p><strong>Name:</strong> ${escape(name)}</p>
                  <p><strong>Email:</strong> ${escape(email)}</p>
                  <p><strong>Phone:</strong> ${escape(phone) || "—"}</p>
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap;">${escape(message)}</p>
                  <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
                  <p style="font-size: 12px; color: #666;">
                    Sent from the apexcovenant.com contact form.
                  </p>
                </div>
              `,
            }),
          });

          if (!res.ok) {
            const detail = await res.text();
            console.error("Resend API error:", res.status, detail);
            return json(
              { success: false, error: "Failed to send message." },
              { status: 502 },
            );
          }

          return json({ success: true });
        } catch (err) {
          console.error("Contact form error:", err);
          return json(
            { success: false, error: "An unexpected error occurred." },
            { status: 500 },
          );
        }
      },
    },
  },
});
