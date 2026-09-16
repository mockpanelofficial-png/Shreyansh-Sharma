import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FlaskConical,
  HeartHandshake,
  Medal,
  Newspaper,
  PenLine,
  Search,
  Users,
  X,
} from "lucide-react";
import { categories, work, type WorkItem } from "@/lib/site-data";

const categoryIcon: Record<string, typeof Medal> = {
  Awards: Medal,
  Writing: PenLine,
  Projects: BookOpen,
  Leadership: Users,
  Media: Newspaper,
  Research: FlaskConical,
  Volunteering: HeartHandshake,
};

function CategoryIcon({ category }: { category: string }) {
  const Icon = categoryIcon[category] || BookOpen;
  return (
    <span className="category-icon">
      <Icon size={18} />
    </span>
  );
}

export function Work({
  setDetail,
}: {
  detail: WorkItem | null;
  setDetail: (item: WorkItem | null) => void;
}) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const featured = work.filter((w) => w.featured).slice(0, 6);

  useEffect(() => {
    document.querySelectorAll("#work .card, #highlights .feature").forEach((el) => el.classList.add("in"));
  }, [showAll, filter, query]);

  const items = useMemo(() => {
    const base = filter === "All" ? work : work.filter((w) => w.category === filter);
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((w) =>
      `${w.title} ${w.org} ${w.summary} ${w.category}`.toLowerCase().includes(q),
    );
  }, [filter, query]);

  const visible = showAll ? items : items.slice(0, 6);

  return (
    <>
      <section id="highlights" className="section wrap">
        <div className="section-head">
          <h2>Student highlights</h2>
          <p>Rank, writing, systems ideas and mentorship — open a card for the full story.</p>
        </div>
        <div className="features">
          {featured.map((x, i) => (
            <article
              key={x.id}
              className="feature"
              style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
            >
              <i className="feature-shine" aria-hidden="true" />
              <div className="card-face">
              <strong>0{i + 1}</strong>
              <div>
                <div className="feature-tag">
                  <CategoryIcon category={x.category} />
                  <label>{x.category}</label>
                </div>
                <h3>{x.title}</h3>
                <p>{x.summary}</p>
                <button type="button" onClick={() => setDetail(x)} aria-label={`View ${x.title}`}>
                  <ArrowUpRight />
                </button>
              </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="section wrap">
        <div className="section-head">
          <h2>Academics, writing and systems work</h2>
          <p>Essays, mentorship, ABHA ideas, volunteering and the NEET years — filter or search.</p>
        </div>

        <div className="portfolio-tools">
          <label className="portfolio-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search achievements, organisations or topics…"
              aria-label="Search portfolio"
              suppressHydrationWarning
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={14} />
              </button>
            ) : null}
          </label>
          <span>{items.length} entries</span>
        </div>

        <div className="filters-bar">
          <button
            type="button"
            className="filter-arrow"
            aria-label="Scroll filters left"
            onClick={() => filterRef.current?.scrollBy({ left: -280, behavior: "smooth" })}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="filters" ref={filterRef}>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={filter === c ? "active" : undefined}
                onClick={() => {
                  setFilter(c);
                  setShowAll(false);
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="filter-arrow"
            aria-label="Scroll filters right"
            onClick={() => filterRef.current?.scrollBy({ left: 280, behavior: "smooth" })}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="cards">
          {visible.map((x, ci) => (
            <article
              className="card"
              key={x.id}
              style={{ ["--d" as string]: `${Math.min(ci % 6, 5) * 70}ms` }}
            >
              <i className="card-shine" aria-hidden="true" />
              <div className="card-face">
              <div className="card-top">
                <CategoryIcon category={x.category} />
                <label>{x.category}</label>
              </div>
              <h3>{x.title}</h3>
              <p>{x.summary}</p>
              <div className="card-footer">
                <small>
                  {x.org} · {x.date}
                </small>
                <button type="button" onClick={() => setDetail(x)} aria-label={`View ${x.title}`}>
                  View
                  <span>
                    <ArrowUpRight size={15} />
                  </span>
                </button>
              </div>
              </div>
            </article>
          ))}
        </div>

        {items.length > 6 ? (
          <div className="show-more-wrap">
            <button type="button" className="show-more-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? (
                <>
                  Show less <ChevronUp size={18} />
                </>
              ) : (
                <>
                  Show more <span>{items.length - 6} more</span>
                  <ChevronDown size={18} />
                </>
              )}
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}

export function DetailModal({ item, close }: { item: WorkItem; close: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="presentation"
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={item.title}>
        <div className="modal-head">
          <b>Portfolio detail</b>
          <button type="button" onClick={close} aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">
          <div className="detail-cat" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <CategoryIcon category={item.category} />
            <label className="pill">{item.category}</label>
          </div>
          <h1 className="detail-title">{item.title}</h1>
          <div className="detail-meta">
            <span>{item.org}</span>
            <span>·</span>
            <span>{item.date}</span>
          </div>
          <p className="longcopy">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
