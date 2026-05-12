import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // KPC brand palette — premium commercial contractor energy
        kpc: {
          night: "#0A0F1C",      // hero/footer bg
          deep: "#0F1729",       // dark cards
          steel: "#1E2A44",      // dark borders
          fog: "#F5F7FA",        // light section bg
          paper: "#FFFFFF",
          ink: "#0A0F1C",        // body text on light
          muted: "#5B6478",      // secondary text
          emergency: "#E63946",  // 24/7 / phone CTA / sirens
          signal: "#FF7A1A",     // primary brand accent
          gold: "#D4A85A",       // commercial premium tier
          success: "#2DBE7E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid type — used by H1/H2 on hero/section headers
        "display-xl": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      opacity: {
        // Master-prompt design tokens use values Tailwind's default 5/10/20/25
        // scale skips. Whitelist every step we actually use in the codebase.
        "2": "0.02",
        "3": "0.03",
        "4": "0.04",
        "6": "0.06",
        "8": "0.08",
        "12": "0.12",
        "15": "0.15",
        "18": "0.18",
        "22": "0.22",
        "35": "0.35",
        "45": "0.45",
        "55": "0.55",
        "65": "0.65",
        "85": "0.85",
      },
      borderColor: {
        DEFAULT: "rgb(0 0 0 / 0.08)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "kpc-card": "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.5)",
        "kpc-glow": "0 0 0 1px rgba(255,122,26,0.2), 0 20px 40px -10px rgba(255,122,26,0.25)",
        "kpc-emergency": "0 0 0 1px rgba(230,57,70,0.3), 0 20px 40px -10px rgba(230,57,70,0.35)",
      },
      backgroundImage: {
        "kpc-grain": "url('/images/grain.svg')",
        "kpc-radial-night":
          "radial-gradient(ellipse at top, rgba(255,122,26,0.08), transparent 50%), linear-gradient(180deg, #0A0F1C 0%, #0F1729 100%)",
        "kpc-emergency-sweep":
          "linear-gradient(90deg, transparent, rgba(230,57,70,0.15), transparent)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.4" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "siren": {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "marquee": "marquee 32s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
        "siren": "siren 8s ease-in-out infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      transitionTimingFunction: {
        "kpc": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [animate],
};

export default config;
