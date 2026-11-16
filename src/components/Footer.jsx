import { navLinks, profile } from "../data";
import Socials from "./Socials";
import BackToTop from "../components/BackToTop";

export default function Footer() {
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

      <BackToTop />
    </>
  );
}
