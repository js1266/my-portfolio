import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FIELD_NAMES, LIMITS, validateContact, validateField } from "../../shared/contactSchema.js";
import { profile } from "../data";
import { Arrow, Check, Mail, Phone, Pin } from "./Icons";
import Reveal from "./Reveal";

const initialValues = { name: "", email: "", phone: "", subject: "", message: "", website: "" };

function Field({
  label,
  name,
  value,
  error = "",
  required = false,
  multiline = false,
  hint = "",
  onChange,
  onBlur,
  ...rest
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const Control = multiline ? "textarea" : "input";
  return (
    <div className={multiline ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-red-500">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      <Control
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-required={required || undefined}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        className={`field ${multiline ? "min-h-[9rem] resize-y" : ""} aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-100`}
        {...rest}
      />
      <div className="mt-1 flex justify-between gap-3 text-[11px]">
        <p id={errorId} role={error ? "alert" : undefined} className="text-red-600">
          {error}
        </p>
        {hint && <span className="ml-auto text-muted">{hint}</span>}
      </div>
    </div>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  hint: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const contactInfo = [
  { Icon: Mail, label: "E-mail", value: profile.email, href: `mailto:${profile.email}` },
  { Icon: Pin, label: "Location", value: profile.location },
  {
    Icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
];

export default function Contact() {
  const formRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" }); // idle | loading | success | error

  const setFieldError = (name, message) =>
    setErrors((current) => {
      const next = { ...current };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Once a field has shown an error, re-check live so the message clears as soon as it is fixed.
    if (errors[name]) setFieldError(name, validateField(name, value));
    if (status.type !== "idle") setStatus({ type: "idle", message: "" });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFieldError(name, validateField(name, value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status.type === "loading") return;

    const result = validateContact(values);
    setErrors(result.errors);
    if (!result.valid) {
      const firstInvalid = FIELD_NAMES.find((field) => result.errors[field]);
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus({ type: "loading", message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.values),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setValues(initialValues);
        setErrors({});
        setStatus({
          type: "success",
          message: "Thanks! Your message has been sent. I'll get back to you soon.",
        });
        return;
      }
      if (response.status === 422 && data.errors) setErrors(data.errors);
      setStatus({
        type: "error",
        message: data.error || "Something went wrong. Please try again.",
      });
    } catch {
      setStatus({
        type: "error",
        message: `Network error. Please check your connection or email me at ${profile.email}.`,
      });
    }
  };

  const loading = status.type === "loading";

  return (
    <section aria-labelledby="contact-title" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="grid gap-10 rounded-3xl border-b-2 border-r border-brand/70 bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col justify-center">
          <span className="section-tag">Contact me</span>
          <h2 id="contact-title" className="text-4xl leading-tight sm:text-5xl">
            Get Ready To
            <br />
            Create Great
          </h2>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Have a project, an opportunity or just want to say hi? Send me a message and I&apos;ll
            reply by email.
          </p>
          <ul className="mt-8 space-y-4">
            {contactInfo.map(({ Icon, label, value, href }) => (
              <li key={label} className="group flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white transition-all duration-300 group-hover:bg-brand group-hover:text-black"
                >
                  <Icon width={16} height={16} />
                </span>
                <span>
                  <span className="block text-[11px] text-muted">{label}</span>
                  {href ? (
                    <a href={href} className="text-sm font-medium hover:text-brand-dark">
                      {value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form">
          <h3 className="mb-4 text-2xl uppercase tracking-wide">Get in touch</h3>

          {/* Honeypot: invisible to people, tempting to bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
            <Field
              label="Your name"
              name="name"
              value={values.name}
              error={errors.name}
              required
              autoComplete="name"
              maxLength={LIMITS.name.max}
              placeholder="Jane Doe"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="Your email"
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              required
              autoComplete="email"
              inputMode="email"
              maxLength={LIMITS.email.max}
              placeholder="jane@example.com"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              value={values.phone}
              error={errors.phone}
              autoComplete="tel"
              inputMode="tel"
              maxLength={24}
              placeholder="+91 98765 43210"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="Subject"
              name="subject"
              value={values.subject}
              error={errors.subject}
              maxLength={LIMITS.subject.max}
              placeholder="Project enquiry"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="Your message"
              name="message"
              multiline
              value={values.message}
              error={errors.message}
              required
              hint={`${values.message.length}/${LIMITS.message.max}`}
              maxLength={LIMITS.message.max}
              placeholder="Tell me a little about what you need…"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-5 w-full justify-center"
          >
            {loading ? (
              "Sending…"
            ) : (
              <>
                Send Message <Arrow width={16} height={16} aria-hidden="true" />
              </>
            )}
          </button>

          <div className="mt-3 min-h-[1.5rem] text-sm" role="status" aria-live="polite">
            {status.type === "success" && (
              <p className="flex items-center gap-2 font-medium text-green-700">
                <Check width={16} height={16} aria-hidden="true" /> {status.message}
              </p>
            )}
            {status.type === "error" && (
              <p className="font-medium text-red-600">{status.message}</p>
            )}
          </div>
        </form>
      </Reveal>
    </section>
  );
}
