import { FileDown, Menu, Moon, Sun, X } from "lucide-react";
import { site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const navLinks = [
  { href: "#journey", label: "About" },
  { href: "#profile", label: "Profile" },
  { href: "#education", label: "Education" },
  { href: "#highlights", label: "Highlights" },
  { href: "#work", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav({
  open,
  setOpen,
  theme,
  setTheme,
  active,
  scrolled,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  theme: "light" | "dark";
  setTheme: (v: "light" | "dark") => void;
  active: string;
  scrolled: boolean;
}) {
  return (
    <>
      <header className={cn("site-header", scrolled && "scrolled")}>
        <nav className="wrap premium-nav">
          <a className="brand" href="#journey" aria-label="Home">
            <i>{site.initials}</i>
            <span className="brand-name">{site.name}</span>
          </a>

          <div className="navlinks">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href.slice(1) ? "active" : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="icon-btn menu-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="nav-overlay-top">
            <span className="brand">
              <i>{site.initials}</i>
              <span>{site.name}</span>
            </span>
            <button
              type="button"
              className="icon-btn"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          <div className="nav-overlay-links">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href.slice(1) ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-overlay-foot">
            <p className="nav-overlay-label">Background</p>
            <div className="theme-switch" role="group" aria-label="Colour theme">
              <button
                type="button"
                className={theme === "dark" ? "on" : undefined}
                aria-pressed={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                <Moon size={16} />
                Dark
              </button>
              <button
                type="button"
                className={theme === "light" ? "on" : undefined}
                aria-pressed={theme === "light"}
                onClick={() => setTheme("light")}
              >
                <Sun size={16} />
                Light
              </button>
            </div>
            <a
              href={site.resumeUrl}
              className="button overlay-resume"
              download
              onClick={() => setOpen(false)}
            >
              <FileDown size={16} />
              Download resume
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
