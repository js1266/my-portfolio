import { useMemo, useState } from "react";
import { projectFilters, projects } from "../data";
import Reveal from "./Reveal";

const covers = [
  "from-brand to-amber-200",
  "from-rose-300 to-brand-soft",
  "from-sky-300 to-brand-soft",
  "from-emerald-300 to-brand-soft",
  "from-violet-300 to-brand-soft",
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(
    () => projects.filter((project) => filter === "All" || project.category === filter),
    [filter]
  );

  return (
    <section aria-labelledby="projects-title" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="text-center">
        <span className="section-tag">Latest portfolio</span>
        <h2 id="projects-title" className="section-title">
          Interfaces I&apos;ve Designed, Built and Optimised
        </h2>
      </Reveal>

      <Reveal delay={100} className="mt-8 flex flex-wrap justify-center gap-2">
        <div
          role="group"
          aria-label="Filter projects"
          className="flex flex-wrap justify-center gap-2"
        >
          {projectFilters.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                filter === name
                  ? "bg-brand text-ink shadow-md shadow-brand/40"
                  : "bg-gray-100 hover:bg-brand-soft"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </Reveal>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <li
            key={project.title}
            style={{ animationDelay: `${index * 80}ms` }}
            className="group animate-fadeUp overflow-hidden rounded-2xl bg-surface transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/25"
          >
            <div
              aria-hidden="true"
              className={`relative grid aspect-[16/9] place-items-center overflow-hidden bg-gradient-to-br ${
                covers[projects.indexOf(project) % covers.length]
              }`}
            >
              <span className="font-display text-7xl font-bold text-white/80 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6">
                {project.title[0]}
              </span>
              <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium">
                {project.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-gray-300 px-3 py-0.5 text-[11px] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
