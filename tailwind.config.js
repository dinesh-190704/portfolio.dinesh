/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#1A1A1A',
        'surface-elevated': '#252525',
        border: 'rgba(255,255,255,0.1)',
        'border-hover': 'rgba(255,255,255,0.2)',
        foreground: '#FFFFFF',
        muted: '#9CA3AF',
        'muted-foreground': '#9CA3AF',
        accent: {
          DEFAULT: '#2563EB',
          muted: 'rgba(37,99,235,0.15)',
          glow: 'rgba(37,99,235,0.30)',
        },
        security: {
          DEFAULT: '#00FF41',
          muted: 'rgba(0,255,65,0.15)',
          glow: 'rgba(0,255,65,0.30)',
        },
        'security-blue': {
          DEFAULT: '#2563EB',
          muted: 'rgba(37,99,235,0.15)',
          glow: 'rgba(37,99,235,0.30)',
        },
        primary: {
          DEFAULT: '#FFFFFF',
          foreground: '#0A0A0A',
        },
        secondary: {
          DEFAULT: '#374151',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          hover: 'rgba(255,255,255,0.10)',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          hover: 'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1.2s ease-out forwards',
        'fade-up': 'fadeUp 1.5s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'grid-flow': 'gridFlow 20s linear infinite',
        'tilt-hover': 'tiltHover 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,65,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,255,65,0.6)' },
        },
        gridFlow: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-50px, -50px)' },
        },
        tiltHover: {
          '0%': { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
        'gradient-security': 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(0,255,65,0.05) 50%, rgba(37,99,235,0.1) 100%)',
        'gradient-subtle': 'linear-gradient(45deg, #0A0A0A 0%, #1A1A1A 25%, #2563EB 50%, #1A1A1A 75%, #0A0A0A 100%)',
        'gradient-grid': 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
