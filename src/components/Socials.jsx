import PropTypes from "prop-types";
import { profile } from "../data";
import { Github, Instagram, Linkedin, Twitter } from "./Icons";

const items = [
  { key: "github", Icon: Github, label: "GitHub" },
  { key: "linkedin", Icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", Icon: Twitter, label: "Twitter" },
  { key: "instagram", Icon: Instagram, label: "Instagram" },
];

export default function Socials({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items
        .filter(({ key }) => profile.socials[key])
        .map(({ key, Icon, label }) => (
          <a
            key={key}
            href={profile.socials[key]}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            className="grid h-9 w-9 place-items-center rounded-full bg-gray-200/80 transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-white"
          >
            <Icon width={15} height={15} aria-hidden="true" />
          </a>
        ))}
    </div>
  );
}

Socials.propTypes = { className: PropTypes.string };
