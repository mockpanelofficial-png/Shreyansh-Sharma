import { createFileRoute } from "@tanstack/react-router";
import { getPublicContent } from "@/lib/content";

export const Route = createFileRoute("/api/content")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(getPublicContent(), {
          headers: {
            "Cache-Control": "public, max-age=120",
          },
        }),
    },
  },
});
