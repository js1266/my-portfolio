import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import LazySection from "./LazySection";

describe("<LazySection />", () => {
  afterEach(() => {
    window.location.hash = "";
  });

  it("renders children right away when IntersectionObserver is unavailable", () => {
    render(
      <LazySection id="about">
        <p>About content</p>
      </LazySection>
    );
    expect(screen.getByText("About content")).toBeInTheDocument();
  });

  it("waits until the section is near the viewport before rendering children", () => {
    let trigger;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback) {
          trigger = callback;
        }
        observe() {}
        disconnect() {}
      }
    );

    const { container } = render(
      <LazySection id="skills">
        <p>Skills content</p>
      </LazySection>
    );

    expect(screen.queryByText("Skills content")).not.toBeInTheDocument();
    expect(container.querySelector("#skills")).toBeInTheDocument(); // anchor exists for nav links

    act(() => trigger([{ isIntersecting: true }]));
    expect(screen.getByText("Skills content")).toBeInTheDocument();
  });

  it("renders immediately when the URL hash targets the section", () => {
    window.location.hash = "#contact";
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
      }
    );
    render(
      <LazySection id="contact">
        <p>Contact content</p>
      </LazySection>
    );
    expect(screen.getByText("Contact content")).toBeInTheDocument();
  });
});
