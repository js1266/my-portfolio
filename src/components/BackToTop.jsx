import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;

      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      setScrollProgress(progress * 100);
      setVisible(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50
        flex h-14 w-14 items-center justify-center
        overflow-hidden rounded-full border-2 #FBC548
        bg-white shadow-lg transition-all duration-300
        hover:scale-110 focus:outline-none focus:ring-4
        focus:ring-sky-300
        ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"}`}
      style={{
        "--water-level": `${100 - scrollProgress}%`,
      }}
    >
      {/* Water fill */}
      <div
        className="water-fill absolute inset-x-0 bottom-0 #FBC548 bg-[#FBC548]"
        style={{
          height: `${scrollProgress}%`,
        }}
      >
        {/* Animated waves */}
        <svg
          className="wave wave-back absolute left-0 w-[200%]"
          viewBox="0 0 560 20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 10 Q35 0 70 10 T140 10 T210 10 T280 10 T350 10 T420 10 T490 10 T560 10 V20 H0Z"
            fill="#FBC548"
          />
        </svg>

        <svg
          className="wave wave-front absolute left-0 w-[200%]"
          viewBox="0 0 560 20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 10 Q35 20 70 10 T140 10 T210 10 T280 10 T350 10 T420 10 T490 10 T560 10 V20 H0Z"
            fill="#FBC548"
          />
        </svg>
      </div>

      {/* Arrow */}
      <ArrowUp
        size={22}
        strokeWidth={2.5}
        className={`relative z-10 transition-colors duration-300 ${
          scrollProgress > 50 ? "black" : "#FBC548"
        }`}
      />
    </button>
  );
}
