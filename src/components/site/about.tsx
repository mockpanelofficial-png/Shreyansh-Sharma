import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  PenLine,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { profileCards, site, skills } from "@/lib/site-data";

const icons = {
  book: BookOpen,
  sparkles: Sparkles,
  heart: HeartHandshake,
  shield: ShieldCheck,
  users: Users,
  pen: PenLine,
};

export function About() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? profileCards : profileCards.slice(0, 4);

  useEffect(() => {
    document.querySelectorAll("#profile .snap-card").forEach((el) => el.classList.add("in"));
  }, [showAll]);

  return (
    <section id="profile" className="student-snapshot wrap">
      <div className="snapshot-intro">
        <div className="snap-head-left">
          <span className="eyebrow">Student profile</span>
          <h2>{site.profileHeading}</h2>
        </div>
        <div className="snap-head-right">
          <p className="snapshot-lede">{site.profileLede}</p>
          <div className="snapshot-chips">
            {site.interests.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="snapshot-cards">
        {visible.map((card, i) => {
          const Icon = icons[card.icon];
          return (
            <article
              className="snap-card"
              key={card.id}
              style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
            >
              <i className="snap-shine" aria-hidden="true" />
              <div className="card-face">
                <div className="snap-top">
                  <span className="snap-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="snap-icon">
                    <Icon size={20} />
                  </span>
                </div>
                <div className="snap-body">
                  <span className="snap-label">{card.title}</span>
                  <p>{card.text}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {profileCards.length > 4 ? (
        <div className="show-more-wrap">
          <button type="button" className="show-more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <>
                Show less <ChevronUp size={18} />
              </>
            ) : (
              <>
                Show more <span>{profileCards.length - 4} more</span>
                <ChevronDown size={18} />
              </>
            )}
          </button>
        </div>
      ) : null}

      <div className="skills-block">
        <div className="skills-title">
          <span>{site.skillsSub}</span>
          <h3>{site.skillsTitle}</h3>
        </div>
        <div className="skills-grid">
          {skills.map((sk) => (
            <SkillBar key={sk.label} label={sk.label} pct={sk.pct} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ label, pct }: { label: string; pct: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("on");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="skill">
      <div className="skill-top">
        <span>{label}</span>
        <b>{pct}%</b>
      </div>
      <div className="skill-bar">
        <i ref={ref} style={{ ["--p" as string]: `${pct}%` }} />
      </div>
    </div>
  );
}
