import { createServerFn } from "@tanstack/react-start";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export function parseContactInput(data: unknown): ContactPayload {
  const source = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  const name = String(source.name ?? "").trim();
  const email = String(source.email ?? "").trim();
  const message = String(source.message ?? "").trim();
  if (name.length < 2) throw new Error("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email.");
  }
  if (message.length < 5) throw new Error("Please write a longer message.");
  return { name, email, message };
}

/**
 * Validates contact messages on the server. Personal details are not stored
 * in a shared database (Vercel serverless has no durable local disk).
 */
export const submitContact = createServerFn({ method: "POST" })
  .validator(parseContactInput)
  .handler(async ({ data }) => {
    return { ok: true as const, name: data.name };
  });
