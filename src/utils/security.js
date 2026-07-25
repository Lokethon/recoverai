// Security utilities for XSS prevention, string sanitization, and data protection

export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function limitStringLength(str, maxLength = 500) {
  if (!str) return '';
  return str.length > maxLength ? str.substring(0, maxLength) : str;
}

export function generateEmailVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
