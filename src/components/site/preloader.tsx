import { useEffect, useState } from "react";
import { site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Preloader({ exiting }: { exiting?: boolean }) {
  const [prog, setProg] = useState(0);
  const name = site.name.toUpperCase();

  useEffect(() => {
    const t0 = performance.now();
    const dur = 1300;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(100, Math.round(((t - t0) / dur) * 100));
      setProg(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={cn("preloader", exiting && "exiting")} aria-hidden={exiting}>
      <div className="preloader-grid" />
      <div className="preloader-core">
        <div className="preloader-ring">
          <img
            src={site.photo}
            alt=""
            className="preloader-photo"
            width={112}
            height={112}
          />
        </div>
        <p className="preloader-name">
          {name.split("").map((c, i) => (
            <span key={i} style={{ animationDelay: `${0.16 + i * 0.04}s` }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </p>
        <p className="preloader-sub">Pre-clinical MBBS · Research enthusiast</p>
        <div className="preloader-bar">
          <span style={{ width: `${prog}%` }} />
        </div>
        <div className="preloader-meta">
          <span className="preloader-pct">{prog}%</span>
          <span>Preparing experience</span>
        </div>
      </div>
    </div>
  );
}
