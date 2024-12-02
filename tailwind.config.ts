import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wallpaper': "url('/wall14.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'popup-fade': 'popupFade 5s forwards', // Adds the custom animation
      },
      keyframes: {
        popupFade: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
