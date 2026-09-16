import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { Hero, Marquee } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Work, DetailModal } from "@/components/site/work";
import { Education, Manifesto } from "@/components/site/journey";
import { Contact, SiteFooter } from "@/components/site/contact";
import { Preloader } from "@/components/site/preloader";
import type { WorkItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function applyTheme(next: "light" | "dark") {
  document.documentElement.dataset.theme = next;
  document.documentElement.style.colorScheme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "light" ? "#f7fafc" : "#0d1729");
}

function Home() {
  const [boot, setBoot] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [active, setActive] = useState("journey");
  const [scrolled, setScrolled] = useState(false);
  const [detail, setDetail] = useState<WorkItem | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setBoot(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("ss-theme");
    const next = stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(next);
    applyTheme(next);
  }, []);

  function handleTheme(next: "light" | "dark") {
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("ss-theme", next);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["journey", "profile", "education", "highlights", "work", "contact"];
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [boot]);

  useEffect(() => {
    if (!boot) return;
    const els = document.querySelectorAll(".card, .feature, .snap-card");
    const reveal = (el: Element) => el.classList.add("in");
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -24px 0px" },
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.98 && r.bottom > 0) reveal(el);
      else obs.observe(el);
    });
    const fallback = setTimeout(() => {
      document.querySelectorAll(".card:not(.in), .feature:not(.in), .snap-card:not(.in)").forEach(reveal);
    }, 2600);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, [boot, detail]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || detail ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setDetail(null);
      }
    };
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [menuOpen, detail]);

  return (
    <>
      {!boot ? <Preloader /> : <Preloader exiting />}
      <div className={cn("app-shell", boot && "ready")}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteNav
          open={menuOpen}
          setOpen={setMenuOpen}
          theme={theme}
          setTheme={handleTheme}
          active={active}
          scrolled={scrolled}
        />
        <main id="main-content">
          <Hero />
          <Marquee />
          <About />
          <Education />
          <Work detail={detail} setDetail={setDetail} />
          <Manifesto />
          <Contact />
        </main>
        <SiteFooter />
      </div>
      {detail ? <DetailModal item={detail} close={() => setDetail(null)} /> : null}
    </>
  );
}
