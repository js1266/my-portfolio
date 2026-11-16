import { skillGroups, techMarquee } from "../data";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section aria-labelledby="skills-title" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="max-w-xl">
        <span className="section-tag">My skills</span>
        <h2 id="skills-title" className="section-title">
          Technologies I Work With Every Day
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A modern frontend toolkit, backed by working knowledge of Node.js and databases.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.name} delay={index * 80} className="card p-5">
            <h3 className="text-lg">{group.name}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-white px-3 py-1 text-sm transition-colors duration-300 hover:bg-brand hover:text-black "
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* decorative tech marquee (hidden from assistive tech: the same names are listed above) */}
      <div
        aria-hidden="true"
        className="mt-16 overflow-hidden rounded-full border border-gray-200 bg-surface py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
          {[...techMarquee, ...techMarquee].map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="whitespace-nowrap font-display text-xl font-semibold text-gray-400 transition-colors hover:text-brand"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
