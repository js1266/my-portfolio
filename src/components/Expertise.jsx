import { expertise } from "../data";
import Reveal from "./Reveal";

export default function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className="px-5 py-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-surface px-5 py-16 sm:px-10">
        <Reveal className="grid items-end gap-4 md:grid-cols-[1fr_20rem]">
          <div>
            <span className="section-tag">My expertise</span>
            <h2 id="expertise-title" className="section-title">
              Elevated Engineering
              <br />
              for the Best Experiences
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Practical, production-tested skills focused on performance, maintainability and user
            experience.
          </p>
        </Reveal>

        <ul className="mt-10 space-y-4">
          {expertise.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 120}
              className="group grid items-center gap-5 rounded-2xl border border-gray-200 bg-white/60 p-5 transition-all duration-300 hover:border-brand hover:bg-brand-soft/70 hover:shadow-lg md:grid-cols-[1fr_auto_1.2fr]"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand font-display text-lg font-bold text-white transition-transform duration-500 group-hover:rotate-[360deg]"
                >
                  {index + 1}
                </span>
                <h3 className="text-xl">{item.title}</h3>
              </div>
              <span className="w-fit rounded-full bg-ink px-4 py-1.5 font-display text-sm font-semibold text-white">
                {item.badge}
              </span>
              <p className="text-sm leading-relaxed text-muted">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
