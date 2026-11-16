import PropTypes from "prop-types";
import { Suspense, useEffect, useRef, useState } from "react";

/**
 * Mounts its children (typically a React.lazy component) only when the section
 * is about to scroll into view, so below-the-fold JS is downloaded on demand.
 * The wrapper owns the anchor `id` and reserves height, so nav links and layout stay stable.
 */
export default function LazySection({ id, minHeight = "32rem", children }) {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(
    () =>
      typeof IntersectionObserver === "undefined" ||
      (typeof window !== "undefined" && window.location.hash === `#${id}`)
  );

  useEffect(() => {
    if (shouldRender) return undefined;

    const show = () => setShouldRender(true);
    const onHashChange = () => window.location.hash === `#${id}` && show();
    window.addEventListener("hashchange", onHashChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(ref.current);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      observer.disconnect();
    };
  }, [id, shouldRender]);

  const placeholder = <div style={{ minHeight }} aria-hidden="true" />;

  return (
    <div id={id} ref={ref} className="scroll-mt-16">
      {shouldRender ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
    </div>
  );
}

LazySection.propTypes = {
  id: PropTypes.string.isRequired,
  minHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
};
