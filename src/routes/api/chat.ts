import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-2.5-flash");

        const result = streamText({
          model,
          messages: await convertToModelMessages(messages as UIMessage[]),
          system: `You are the friendly, professional AI assistant for Apex Covenant Consulting, a high-tech B2B business development and marketing consultancy.

Company facts:
- 20+ years of high-tech business development and marketing excellence.
- Scaled consumer brands in major retail channels (Amazon, Walmart, Newegg, eBay) through SEO/SEM.
- Led a $20M branch of a global tech manufacturer.
- Serves telcos, wireless ISPs, security VARs, integrators, and distributors.
- 800+ B2B customers served.
- 7+ distributors with 200+ sales reps.
- 40+ trade shows annually.
- National business development initiatives across North America and LATAM.
- Telecom & mobility enablement: point person for Comtrend's LaunchMyMVNO service with OXIO, acting as an MVNE to help rural telecoms launch MVNO services.

When the user asks about pricing, wants a quote, needs to contact the team, or has a question too specific for public info, encourage them to use the contact form at the bottom of the page. Say something like: "For pricing and tailored next steps, please use the contact form at the bottom of the page — the executive team typically replies within one business day."

Keep answers concise, helpful, and on-brand. Do not make up facts not listed above.`,
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
