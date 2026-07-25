import { describe, it, expect } from 'vitest';
import {
  sanitizeInput,
  limitStringLength,
  generateEmailVerificationCode,
  isValidEmail,
} from './security';

describe('sanitizeInput', () => {
  it('escapes HTML-significant characters', () => {
    expect(sanitizeInput('<script>alert(1)</script>')).toBe(
      '&lt;script&gt;alert(1)&lt;&#x2F;script&gt;'
    );
  });

  it('escapes quotes and ampersands', () => {
    expect(sanitizeInput(`Tom & "Jerry's"`)).toBe(
      'Tom &amp; &quot;Jerry&#x27;s&quot;'
    );
  });

  it('returns an empty string for non-string input', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
    expect(sanitizeInput(42)).toBe('');
    expect(sanitizeInput({})).toBe('');
  });

  it('leaves safe text untouched', () => {
    expect(sanitizeInput('Day 42 sober')).toBe('Day 42 sober');
  });
});

describe('limitStringLength', () => {
  it('truncates strings longer than the limit', () => {
    expect(limitStringLength('a'.repeat(600))).toHaveLength(500);
    expect(limitStringLength('abcdef', 3)).toBe('abc');
  });

  it('leaves shorter strings intact', () => {
    expect(limitStringLength('short', 100)).toBe('short');
  });

  it('returns an empty string for falsy input', () => {
    expect(limitStringLength('')).toBe('');
    expect(limitStringLength(null)).toBe('');
    expect(limitStringLength(undefined)).toBe('');
  });
});

describe('generateEmailVerificationCode', () => {
  it('always returns a six-digit numeric string', () => {
    for (let i = 0; i < 250; i += 1) {
      const code = generateEmailVerificationCode();
      expect(code).toMatch(/^\d{6}$/);
      expect(Number(code)).toBeGreaterThanOrEqual(100000);
      expect(Number(code)).toBeLessThanOrEqual(999999);
    }
  });
});

describe('isValidEmail', () => {
  it.each([
    'user@example.com',
    'first.last@sub.domain.co.in',
    'USER@EXAMPLE.COM',
  ])('accepts %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each(['', 'no-at-sign', 'user@', '@example.com', 'user @example.com', 'user@example'])(
    'rejects %s',
    (email) => {
      expect(isValidEmail(email)).toBe(false);
    }
  );
});
