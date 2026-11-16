import PropTypes from "prop-types";
import { about } from "../data";
import { useCountUp } from "../hooks";
import { Arrow } from "./Icons";
import Reveal from "./Reveal";

function Stat({ value, decimals, suffix, label }) {
  const [ref, current] = useCountUp(value, { decimals });
  return (
    <div
      ref={ref}
      className="rounded-2xl bg-white p-6 text-center shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="font-display text-5xl font-bold">
        {current.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-1 font-display text-xl font-semibold">{label}</div>
    </div>
  );
}

Stat.propTypes = {
  value: PropTypes.number.isRequired,
  decimals: PropTypes.number.isRequired,
  suffix: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default function About() {
  return (
    <section aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-6 top-1/3 h-52 w-52 rounded-full bg-gradient-to-br from-brand to-transparent opacity-70 blur-sm"
          />
          <div className="relative grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {about.stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="section-tag">{about.tag}</span>
          <h2 id="about-title" className="section-title">
            {about.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{about.text}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {about.highlights.map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-primary mt-8">
            Let&apos;s Talk <Arrow width={16} height={16} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
