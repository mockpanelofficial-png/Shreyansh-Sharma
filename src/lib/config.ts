/**
 * Public site config. No secrets. Vercel deploys with zero required env vars.
 * Optional VITE_* overrides can be set in the Vercel dashboard if the public
 * email or LinkedIn URL ever change.
 */
function readPublic(value: string | undefined, fallback: string): string {
  return value && value.trim() ? value.trim() : fallback;
}

const env = import.meta.env as Record<string, string | undefined>;

export const config = {
  name: "Shreyansh Sharma",
  email: readPublic(env.VITE_CONTACT_EMAIL, "hello@shreyansh.sharma"),
  linkedin: readPublic(
    env.VITE_LINKEDIN_URL,
    "https://www.linkedin.com/in/shreyansh-sharma",
  ),
  resumePath: "/resume.pdf",
  siteUrl: readPublic(env.VITE_SITE_URL, ""),
};
