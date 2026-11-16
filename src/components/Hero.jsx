import { profile } from "../data";
import { Arrow, Download } from "./Icons";
import Socials from "./Socials";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-surface pt-28 lg:pt-0">
      {/* decorative shapes */}


      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-[1.1fr_1fr_.5fr] lg:pb-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 hidden h-[80%] w-[25%] bg-brand-soft [clip-path:polygon(0_0,100%_0,100%_70%,0_100%)] lg:block"
        />
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[34%] top-[24%] hidden h-64 w-40 animate-float bg-pink-200/80 [clip-path:polygon(0_20%,100%_0,100%_100%,0_100%)] lg:block"
        /> */}
        <div className="animate-fadeUp">
          <span className="font-display text-xl font-semibold text-brand-dark">{profile.role}</span>
          <h1 className="mt-2 text-6xl leading-[1.02] sm:text-7xl">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View Portfolio <Arrow width={16} height={16} aria-hidden="true" />
            </a>
            <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-outline">
              Download Resume <Download width={16} height={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative flex items-end justify-center self-end animate-fadeUp [animation-delay:200ms]">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              width="480"
              height="640"
              fetchPriority="high"
              className="relative z-10 max-h-[78vh] w-auto object-contain"
            />
          ) : (
            <div
              aria-hidden="true"
              className="relative z-10 mb-10 grid h-72 w-72 animate-float place-items-center rounded-full bg-brand font-display text-8xl font-bold text-white shadow-2xl shadow-brand/40 sm:h-80 sm:w-80"
            >
              {profile.firstName[0]}
              {profile.lastName[0]}
            </div>
          )}
        </div>

        <div className="animate-fadeUp [animation-delay:350ms] lg:pl-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-6xl font-bold">{profile.yearsExperience}</span>
            <span className="text-sm leading-tight text-muted">
              Years of
              <br />
              experience
            </span>
          </div>
          <p className="mb-3 mt-8 text-sm text-muted">Find me on</p>
          <Socials />
        </div>
      </div>
    </section>
  );
}
