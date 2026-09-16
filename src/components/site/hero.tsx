import { useEffect, useRef, useState } from "react";
import { site, timeline } from "@/lib/site-data";

function TypingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = roles[index] ?? "";
    let delay = deleting ? 38 : 72;
    if (!deleting && text === word) delay = 1500;
    if (deleting && text === "") delay = 280;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < word.length) setText(word.slice(0, text.length + 1));
        else setDeleting(true);
      } else if (text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        setDeleting(false);
        setIndex((index + 1) % roles.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, roles]);

  return (
    <h2 className="hero-role">
      <span className="flame" aria-hidden="true">
        <i className="tongue t1" />
        <i className="tongue t2" />
        <i className="tongue t3" />
        <i className="tongue t4" />
        <i className="smoke s1" />
        <i className="smoke s2" />
        <i className="smoke s3" />
        <i className="smoke s4" />
        <b />
        <b />
        <b />
        <b />
      </span>
      <span className="typed-text">
        {text}
        <span className="typed-caret" />
      </span>
    </h2>
  );
}

function CountUp({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const m = String(value).match(/^([\s\S]*?)(\d+(?:\.\d+)?)([\s\S]*)$/);
    if (!m) {
      setDisplay(value);
      return;
    }
    const [, pre, num, suf] = m;
    const target = parseFloat(num);
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const dur = 1400;
            const t0 = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              const n = num.includes(".")
                ? (target * eased).toFixed(1)
                : String(Math.round(target * eased));
              setDisplay(pre + n + suf);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <b ref={ref}>{display}</b>;
}

export function Hero() {
  return (
    <section className="hero wrap" id="journey">
      <div className="hero-journey">
        <h1 className="intro-title">
          Hi, I'm <em>{site.name}</em>
        </h1>
        <TypingRole roles={site.roles} />
        <p className="journey-intro">{site.lede}</p>
        <div className="actions">
          <a className="button" href="#work">
            Explore Portfolio ↓
          </a>
          <a className="button ghost" href="#contact">
            Get In Touch
          </a>
        </div>
        <div className="hero-timeline">
          {timeline.map((x) => (
            <article key={x.title}>
              <div className="hero-year">{x.date}</div>
              <div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="profile">
        <div className="avatar">
          <img src={site.photo} alt={`${site.name} profile photo`} />
        </div>
        <div className="profile-copy">
          <h2>{site.name}</h2>
          <p>{site.tagline}</p>
          <div className="stats">
            {site.stats.map((s) => (
              <div key={s.label}>
                <CountUp value={`${s.prefix}${s.value}${s.suffix}`} />
                <small>{s.label}</small>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

export function Marquee() {
  const items = [...site.ticker, ...site.ticker];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((item, idx) => (
          <span key={`${item}-${idx}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
