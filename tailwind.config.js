export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
        success: { DEFAULT: '#22c55e', dark: '#16a34a' },
        warning: { DEFAULT: '#f59e0b', dark: '#d97706' },
        danger: { DEFAULT: '#ef4444', dark: '#dc2626' },
      },
    },
  },
  plugins: [],
}
