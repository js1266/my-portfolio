import { useEffect, useState } from "react";
import { navLinks, profile } from "../data";
import { useActiveSection } from "../hooks";
import { Menu, Close, Download } from "./Icons";

const ids = navLinks.map((l) => l.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/85 py-3 shadow-md backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#home" className="flex items-center gap-2 font-display text-2xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-lg text-white">
            {profile.firstName[0]}
          </span>
          {profile.name}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative text-sm font-medium transition-colors duration-300 hover:text-brand-dark ${
                    isActive ? "text-brand-dark" : ""
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-brand transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="btn-primary hidden !py-2.5 sm:inline-flex"
          >
            Resume <Download width={16} height={16} />
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white transition-transform duration-300 hover:scale-110 lg:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden bg-white shadow-lg transition-all duration-500 lg:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-brand-soft"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="btn-primary w-full justify-center"
            >
              Download Resume <Download width={16} height={16} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
