import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      '.scrollbar-none': {
        /* Hide scrollbar for modern browsers */
        '&::-webkit-scrollbar': { display: 'none' },
        '-ms-overflow-style': 'none',  /* IE and Edge */
        'scrollbar-width': 'none',     /* Firefox */
      },
    });
  },]
};
export default config;
