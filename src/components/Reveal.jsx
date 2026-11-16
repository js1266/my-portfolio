import PropTypes from "prop-types";
import { useReveal } from "../hooks";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children = null,
  ...rest
}) {
  const ref = useReveal();
  return (
    <Tag ref={ref} style={{ "--delay": `${delay}ms` }} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

Reveal.propTypes = {
  as: PropTypes.elementType,
  delay: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};
