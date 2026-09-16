import {
  categories,
  clinicalFocus,
  education,
  profileCards,
  site,
  skills,
  timeline,
  work,
} from "@/lib/site-data";

/** Public JSON payload for `/api/content` — same data the homepage renders. */
export function getPublicContent() {
  return {
    site,
    education,
    clinicalFocus,
    profileCards,
    skills,
    timeline,
    work,
    categories,
  };
}
