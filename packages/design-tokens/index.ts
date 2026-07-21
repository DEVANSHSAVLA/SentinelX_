// SentinelX Design Tokens System (Enterprise Glassmorphism & High-Contrast Cyber Palette)

export const tokens = {
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      900: '#312e81',
    },
    danger: {
      500: '#ef4444',
      600: '#dc2626',
      900: '#7f1d1d',
    },
    warning: {
      500: '#f59e0b',
      600: '#d97706',
    },
    success: {
      500: '#10b981',
      600: '#059669',
    },
    dark: {
      bg: '#0f172a',
      card: 'rgba(30, 41, 59, 0.8)',
      border: 'rgba(51, 65, 85, 0.6)',
      text: '#f8fafc',
      subtext: '#94a3b8',
    },
    light: {
      bg: '#f8fafc',
      card: 'rgba(255, 255, 255, 0.9)',
      border: 'rgba(226, 232, 240, 0.8)',
      text: '#0f172a',
      subtext: '#64748b',
    }
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'JetBrains Mono, Fira Code, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    }
  },
  elevation: {
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  animation: {
    pulseFast: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    fadeIn: 'fadeIn 0.2s ease-in-out',
  }
};
