/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-secondary': 'var(--color-background-secondary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        'severity-critical': 'var(--color-severity-critical)',
        'severity-high': 'var(--color-severity-high)',
        'severity-medium': 'var(--color-severity-medium)',
        'severity-low': 'var(--color-severity-low)',
        'severity-info': 'var(--color-severity-info)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        // Custom font families for the 8 requested styles
        apex: ['var(--font-apex)', 'system-ui', 'sans-serif'],
        nano: ['var(--font-nano)', 'system-ui', 'sans-serif'],
        acme: ['var(--font-acme)', 'system-ui', 'sans-serif'],
        geo: ['var(--font-geo)', 'system-ui', 'sans-serif'],
        desk: ['var(--font-desk)', 'system-ui', 'sans-serif'],
        bitec: ['var(--font-bitec)', 'system-ui', 'sans-serif'],
        ark: ['var(--font-ark)', 'system-ui', 'sans-serif'],
        kayon: ['var(--font-kayon)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'page': ['clamp(2rem, 7vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'headline-1': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline-2': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'headline-3': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'label': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
        'lg': '8px',
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 700ms var(--ease-out-expo) both',
        'slide-up': 'slideUp 700ms var(--ease-out-expo) both',
        'slide-up-delayed': 'slideUp 700ms var(--ease-out-expo) 160ms both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}