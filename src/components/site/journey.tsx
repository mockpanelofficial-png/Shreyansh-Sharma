import { useEffect, useState } from "react";
import {
  Activity,
  Bone,
  ChevronDown,
  ChevronUp,
  Dna,
  FlaskConical,
  GraduationCap,
  Layers,
  Microscope,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { clinicalFocus, education, site } from "@/lib/site-data";

const clinicalIcons = {
  bone: Bone,
  pulse: Activity,
  flask: FlaskConical,
  scope: Microscope,
  dna: Dna,
  users: Users,
  layers: Layers,
  shield: ShieldCheck,
};

export function Education() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? clinicalFocus : clinicalFocus.slice(0, 4);

  useEffect(() => {
    document.querySelectorAll("#education .snap-card").forEach((el) => el.classList.add("in"));
  }, [showAll]);

  return (
    <section id="education" className="section wrap">
      <div className="section-head">
        <div>
          <span className="eyebrow">Education</span>
          <h2>Training for the clinic and the system</h2>
        </div>
        <p>
          A decade in Varanasi classrooms, then the NEET years, then pre-clinical
          MBBS — anatomy, physiology, pathology and the health system around them.
        </p>
      </div>

      <div className="edu-grid">
        {education.map((ed) => (
          <article className="edu-card snap-card" key={ed.title}>
            <i className="snap-shine" aria-hidden="true" />
            <div className="card-face">
              <GraduationCap size={18} color="var(--color-primary)" />
              <small>{ed.when}</small>
              <h3>{ed.title}</h3>
              <p className="place">{ed.place}</p>
              <p>{ed.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="clinical-head">
        <Stethoscope size={16} />
        Pre-clinical focus
      </div>
      <div className="clinical">
        {visible.map((c, i) => {
          const Icon = clinicalIcons[c.icon];
          return (
            <article className="snap-card" key={c.id}>
              <i className="snap-shine" aria-hidden="true" />
              <div className="card-face">
                <div className="snap-top">
                  <span className="snap-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="snap-icon">
                    <Icon size={20} />
                  </span>
                </div>
                <div className="snap-body">
                  <span className="snap-label">{c.title}</span>
                  <p>{c.text}</p>
                </div>
                <span className="card-chip">{c.tag}</span>
              </div>
            </article>
          );
        })}
      </div>
      {clinicalFocus.length > 4 ? (
        <div className="show-more-wrap">
          <button type="button" className="show-more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <>
                Show less <ChevronUp size={18} />
              </>
            ) : (
              <>
                Show more <span>{clinicalFocus.length - 4} more</span>
                <ChevronDown size={18} />
              </>
            )}
          </button>
        </div>
      ) : null}
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="section wrap" style={{ paddingTop: 20 }}>
      <div className="manifesto">
        <b>“</b>
        <div>
          <h2>{site.quote}</h2>
          <p>{site.quoteAttr}</p>
        </div>
      </div>
    </section>
  );
}
