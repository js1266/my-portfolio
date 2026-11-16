/**
 * Contact-form validation rules.
 * Shared by the React form (instant feedback) and the server (the real gate),
 * so both always agree on what is valid.
 */

export const LIMITS = Object.freeze({
  name: { min: 2, max: 80 },
  email: { max: 254 },
  phone: { min: 7, max: 15 }, // digits only (E.164 allows up to 15)
  subject: { max: 120 },
  message: { min: 10, max: 2000 },
});

export const FIELD_NAMES = ["name", "email", "phone", "subject", "message"];

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;
const EMAIL_RE =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const PHONE_RE = /^\+?\d+$/;

const asString = (value) => (typeof value === "string" ? value : "");

/** Single-line text: remove control characters, collapse whitespace, trim. */
export const cleanLine = (value) =>
  asString(value)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Multi-line text: keep line breaks, drop other control characters, trim. */
export const cleanText = (value) =>
  asString(value)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim();

/** Phone: allow spaces, dashes, dots and brackets while typing; store digits (and a leading +). */
export const cleanPhone = (value) => cleanLine(value).replace(/[\s\-().]/g, "");

const normalizers = {
  name: cleanLine,
  email: (value) => cleanLine(value).toLowerCase(),
  phone: cleanPhone,
  subject: cleanLine,
  message: cleanText,
};

const validators = {
  name(value) {
    if (!value) return "Please enter your name.";
    if (value.length < LIMITS.name.min)
      return `Name must be at least ${LIMITS.name.min} characters.`;
    if (value.length > LIMITS.name.max)
      return `Name must be ${LIMITS.name.max} characters or fewer.`;
    if (!NAME_RE.test(value))
      return "Name can only contain letters, spaces, apostrophes, dots and hyphens.";
    return "";
  },
  email(value) {
    if (!value) return "Please enter your email address.";
    if (value.length > LIMITS.email.max) return "That email address is too long.";
    if (!EMAIL_RE.test(value) || value.includes("..") || !/[a-z]{2,}$/i.test(value)) {
      return "Please enter a valid email address, like name@example.com.";
    }
    return "";
  },
  phone(value) {
    if (!value) return ""; // optional
    if (!PHONE_RE.test(value))
      return "Phone can only contain digits, spaces and an optional leading +.";
    const digits = value.replace(/\D/g, "");
    if (digits.length < LIMITS.phone.min || digits.length > LIMITS.phone.max) {
      return `Phone number must have ${LIMITS.phone.min}–${LIMITS.phone.max} digits.`;
    }
    return "";
  },
  subject(value) {
    if (value.length > LIMITS.subject.max)
      return `Subject must be ${LIMITS.subject.max} characters or fewer.`;
    return "";
  },
  message(value) {
    if (!value) return "Please write a message.";
    if (value.length < LIMITS.message.min)
      return `Message must be at least ${LIMITS.message.min} characters.`;
    if (value.length > LIMITS.message.max)
      return `Message must be ${LIMITS.message.max} characters or fewer.`;
    return "";
  },
};

/** Validate one field. Returns an error message, or "" when valid. */
export function validateField(name, rawValue) {
  const normalize = normalizers[name];
  const validate = validators[name];
  if (!normalize || !validate) return "";
  return validate(normalize(rawValue));
}

/**
 * Validate the whole form.
 * @returns {{ valid: boolean, errors: Record<string,string>, values: Record<string,string> }}
 *   `values` are the cleaned values that are safe to use; `errors` only has keys for invalid fields.
 */
export function validateContact(input) {
  const source = input && typeof input === "object" ? input : {};
  const values = {};
  const errors = {};

  for (const field of FIELD_NAMES) {
    values[field] = normalizers[field](source[field]);
    const error = validators[field](values[field]);
    if (error) errors[field] = error;
  }
  values.website = asString(source.website).trim(); // honeypot: must stay empty

  return { valid: Object.keys(errors).length === 0, errors, values };
}
