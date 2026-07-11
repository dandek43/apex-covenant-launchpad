"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "apex-covenant-chat-messages";
const CHAT_ID = "apex-covenant-assistant";

function loadMessages() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: unknown[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // ignore storage errors
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [storedMessages] = useState(() => loadMessages());
  const transport = useRef(new DefaultChatTransport({ api: "/api/chat" })).current;

  const {
    messages,
    status,
    error,
    sendMessage,
    stop,
  } = useChat({
    id: CHAT_ID,
    messages: storedMessages,
    transport,
    onError: (err) => {
      console.error("Chat error:", err);
    },
  });

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[90vw] max-w-[380px] sm:w-[380px] rounded-2xl border border-border bg-surface shadow-card overflow-hidden flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-elevated">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand" />
              </span>
              <span className="font-semibold text-sm">Apex Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <Conversation className="flex-1 min-h-[320px]">
            <ConversationContent>
              {messages.length === 0 ? (
                <ConversationEmptyState
                  title="How can we help?"
                  description="Ask about Apex Covenant, our services, or how to get in touch."
                />
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent>
                      {message.parts.map((part, i) =>
                        part.type === "text" ? (
                          <MessageResponse key={i}>{part.text}</MessageResponse>
                        ) : null
                      )}
                    </MessageContent>
                  </Message>
                ))
              )}
              {isLoading && messages.at(-1)?.role !== "assistant" && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer as="span">Thinking…</Shimmer>
                  </MessageContent>
                </Message>
              )}
              {error && (
                <div className="px-4 py-2 text-xs text-destructive bg-destructive/10 rounded-lg">
                  Something went wrong. Please try again.
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* Input */}
          <div className="border-t border-border p-3 bg-surface-elevated">
            <PromptInput
              onSubmit={async ({ text }) => {
                if (!text.trim() || isLoading) return;
                await sendMessage({ text: text.trim() });
              }}
            >
              <PromptInputTextarea
                placeholder="Ask a question…"
                className="min-h-12 bg-background/60"
              />
              <PromptInputFooter className="justify-end pt-2">
                <PromptInputSubmit
                  status={status}
                  onStop={stop}
                  disabled={isLoading}
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      )}

      <Button
        onClick={() => setOpen((o) => !o)}
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-brand transition-transform hover:scale-105",
          open ? "bg-muted text-foreground" : "bg-brand text-brand-foreground"
        )}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </Button>
    </div>
  );
}
