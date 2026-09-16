import { FormEvent, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact";
import { site } from "@/lib/site-data";

export function Contact() {
  const send = useServerFn(submitContact);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const payload = {
      name: String(raw.name ?? ""),
      email: String(raw.email ?? ""),
      message: String(raw.message ?? ""),
    };
    setBusy(true);
    setError("");
    try {
      await send({ data: payload });
      const prev = JSON.parse(localStorage.getItem("ss-inbox") || "[]") as unknown[];
      localStorage.setItem(
        "ss-inbox",
        JSON.stringify([{ ...payload, at: new Date().toISOString() }, ...prev]),
      );
      form.reset();
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send. Try email instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-simple wrap">
        <div className="contact-heading">
          <h2>{site.contactHeading}</h2>
          <p>{site.contactLede}</p>
        </div>
        <form className="contact-form" onSubmit={onSubmit}>
          {sent ? (
            <div className="sent-note" role="status">
              <BadgeCheck size={18} />
              <span>Thank you. I will get back to you soon.</span>
            </div>
          ) : null}
          {error ? (
            <div className="sent-note error-note" role="alert">
              {error}
            </div>
          ) : null}
          <input
            required
            name="name"
            placeholder="Your Name"
            aria-label="Your name"
            suppressHydrationWarning
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Your Email"
            aria-label="Your email"
            suppressHydrationWarning
          />
          <textarea
            required
            name="message"
            minLength={5}
            placeholder="Your Message"
            aria-label="Your message"
            suppressHydrationWarning
          />
          <button type="submit" disabled={busy}>
            {busy ? "Sending…" : sent ? "✓ Sent!" : "Send Message"}
          </button>
        </form>
        <a className="direct-email" href={`mailto:${site.email}`}>
          or email directly at {site.email}
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} {site.name}. {site.footer}
        </span>
        <span>
          <a href={`mailto:${site.email}`}>Email</a>
          {" · "}
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {" · "}
          <a href={site.resumeUrl} download>
            Resume
          </a>
          {" · "}
          {site.location}
        </span>
      </div>
    </footer>
  );
}
