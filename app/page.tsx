"use client";

import { useChat } from "ai/react";
import { useState } from "react";

const DOMAINS = [
  { id: "immigration", label: "Immigration & Visas", desc: "Stamp 1G, Critical Skills, Schengen, student visas" },
  { id: "benefits", label: "Government Benefits", desc: "Applications, renewals, eligibility" },
  { id: "taxes", label: "Taxes", desc: "Filings, deductions, cross-border" },
  { id: "insurance", label: "Insurance Claims", desc: "Health, claims, appeals" },
];

export default function Home() {
  const [domain, setDomain] = useState("immigration");
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { domain },
  });

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Expert AI</h1>
            <p className="text-sm text-neutral-500">The $15-an-Hour Expert — AI that turns ordinary workers into specialists</p>
          </div>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">YC RFS W27</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">Choose your domain</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDomain(d.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  domain === d.id ? "border-orange-500 bg-orange-50" : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                <div className="font-medium">{d.label}</div>
                <div className="mt-1 text-xs text-neutral-500">{d.desc}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h3 className="font-semibold">Chat with your Expert Copilot</h3>
            <p className="text-sm text-neutral-500">
              Currently helping with: {DOMAINS.find((d) => d.id === domain)?.label}
            </p>
          </div>

          <div className="h-[480px] space-y-4 overflow-y-auto p-6">
            {messages.length === 0 && (
              <div className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600">
                Ask anything about {DOMAINS.find((d) => d.id === domain)?.label.toLowerCase()}.
                <br />
                Example: “What documents do I need for a Critical Skills Employment Permit in Ireland?”
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === "user"
                      ? "bg-orange-500 text-white"
                      : "bg-neutral-100 text-neutral-900"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-sm text-neutral-400">Thinking…</div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask your expert question…"
                className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </section>

        <footer className="mt-12 text-center text-xs text-neutral-400">
          Built for Y Combinator Winter 2027 RFS · The $15-an-Hour Expert<br />
          Not legal advice. Always verify with official sources.
        </footer>
      </main>
    </div>
  );
}
