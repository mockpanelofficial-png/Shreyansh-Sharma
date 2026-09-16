import { createFileRoute } from "@tanstack/react-router";
import { parseContactInput } from "@/lib/contact";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = parseContactInput(body);
          return Response.json({ ok: true, name: parsed.name });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Invalid message";
          return Response.json({ ok: false, error: message }, { status: 400 });
        }
      },
    },
  },
});
