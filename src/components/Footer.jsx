import { useEffect, useState } from "react";
import { navLinks, profile } from "../data";
import Socials from "./Socials";
import { Up } from "./Icons";
import BackToTop from "../components/BackToTop"

export default function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
          <div>
            <a href="#home" className="font-display text-2xl font-bold">
              {profile.name}
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{profile.tagline}</p>
            <Socials className="mt-5" />
          </div>
          <div>
            <h4 className="mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-all duration-300 hover:pl-1 hover:text-brand-dark"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>{profile.phone}</li>
              <li>{profile.location}</li>
              <li>
                <a href={`mailto:${profile.email}`} className="hover:text-brand-dark">
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 py-5 text-center text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </footer>

      {/* <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
      >
        <Up />
      </button> */}

      <BackToTop />
    </>
  );
}
