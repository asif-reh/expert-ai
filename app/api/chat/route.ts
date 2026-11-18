import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

const SYSTEM_PROMPTS: Record<string, string> = {
  immigration: `You are an expert immigration and visa advisor. You help ordinary people and frontline workers navigate complex immigration paperwork with high accuracy. Focus on Ireland (Stamp 1G, Critical Skills Employment Permit, Stamp 4), EU/Schengen, US, and general student/work visas. Provide clear checklists, required documents, timelines, common pitfalls, and next steps. Always cite official sources where possible and note that this is not legal advice.`,
  benefits: `You are an expert on government benefits programs. Help users understand eligibility, application processes, required documents, renewals, and appeals. Be precise and practical.`,
  taxes: `You are a practical tax expert for individuals and small businesses. Help with filings, deductions, cross-border issues, and common mistakes. Be clear and structured.`,
  insurance: `You are an expert on insurance claims (health, property, etc.). Guide users through claims processes, required evidence, appeals, and how to avoid denials.`,
};

export async function POST(req: Request) {
  const { messages, domain = "immigration" } = await req.json();

  const system = SYSTEM_PROMPTS[domain] || SYSTEM_PROMPTS.immigration;

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system,
    messages,
  });

  return result.toDataStreamResponse();
}
