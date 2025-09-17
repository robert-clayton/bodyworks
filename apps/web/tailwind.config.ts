import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Instagram-inspired primary accent colors
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#e91e63',  // Instagram pink/red
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        // Instagram dark theme colors
        background: {
          primary: '#000000',    // Pure black like Instagram
          secondary: '#1a1a1a',  // Very dark gray
          tertiary: '#262626',   // Slightly lighter
          card: '#1a1a1a',       // Card background
          elevated: '#262626',   // Elevated surfaces
        },
        surface: {
          primary: '#1a1a1a',    // Main surface
          secondary: '#262626',  // Secondary surface
          tertiary: '#363636',   // Tertiary surface
          hover: '#2a2a2a',      // Hover state
          border: '#262626',     // Border color
          divider: '#363636',    // Dividers
        },
        text: {
          primary: '#ffffff',    // Pure white text
          secondary: '#f5f5f5',  // Off-white
          tertiary: '#a8a8a8',   // Light gray
          muted: '#737373',      // Muted gray
          disabled: '#525252',   // Disabled text
        },
        accent: {
          blue: '#0095f6',       // Instagram blue
          success: '#00d4aa',    // Green
          warning: '#ffb800',    // Yellow
          error: '#ed4956',      // Instagram red
          info: '#0095f6',       // Blue
        }
      },
      screens: {
        'xs': '475px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
