/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',  // Clinical Dental Ice
          100: '#e0f2fe', // Soft Enamel Sky
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Dental Cyan
          600: '#0284c7', // Primary Dental Sapphire
          700: '#0369a1', // Deep Medical Blue
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dental: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        slate: {
          150: '#e9eef4',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        bangla: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)',
        'card': '0 0 0 1px rgba(15, 23, 42, 0.06), 0 2px 8px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 0 0 1.5px rgba(2, 132, 199, 0.35), 0 16px 32px -6px rgba(2, 132, 199, 0.15)',
        'soft': '0 2px 10px rgba(15, 23, 42, 0.05)',
        'soft-lg': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'floating': '0 12px 30px -4px rgba(2, 132, 199, 0.3), 0 4px 12px -2px rgba(15, 23, 42, 0.08)',
        'float': '0 20px 40px -8px rgba(2, 132, 199, 0.22), 0 6px 16px -4px rgba(15, 23, 42, 0.06)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
};
