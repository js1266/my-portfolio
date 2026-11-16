import { certifications, experience, profile } from "../data";
import { Download } from "./Icons";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section aria-labelledby="experience-title" className="mx-auto max-w-4xl px-5 py-20">
      <Reveal className="text-center">
        <span className="section-tag">Experience &amp; education</span>
        <h2 id="experience-title" className="section-title">
          My Journey So Far
        </h2>
      </Reveal>

      <ol className="relative mt-12 space-y-8 before:absolute before:left-3 before:top-2 before:h-full before:w-px before:bg-brand/50 md:before:left-1/2">
        {experience.map((item, index) => (
          <Reveal
            as="li"
            key={`${item.role}-${item.period}`}
            delay={index * 100}
            className={`relative pl-10 md:w-1/2 md:pl-0 ${
              index % 2 ? "md:ml-auto md:pl-10" : "md:pr-10"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-[7px] top-2 h-3 w-3 rounded-full bg-brand ring-4 ring-brand/25 md:left-auto ${
                index % 2 ? "md:-left-[6px]" : "md:-right-[6px]"
              }`}
            />
            <div className="card p-5">
              <span className="text-sm font-medium text-brand-dark">{item.period}</span>
              <h3 className="mt-1 text-xl">{item.role}</h3>
              <p className="text-sm font-medium">{item.company}</p>
              {item.points.length > 0 && (
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted marker:text-brand">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-14 text-center">
        <h3 className="text-xl">Certifications</h3>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {certifications.map((cert) => (
            <li
              key={cert}
              className="rounded-full border border-brand bg-brand-soft/60 px-4 py-1.5 text-sm font-medium"
            >
              {cert}
            </li>
          ))}
        </ul>
        <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-primary mt-10">
          Download Full Resume <Download width={16} height={16} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  );
}
