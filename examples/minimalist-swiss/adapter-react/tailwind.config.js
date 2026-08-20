// Generated from examples/minimalist-swiss/theme.json by the React/Tailwind adapter
// described in references/platform-and-output.md. Extends (not replaces) the host
// project's own Tailwind config -- merge this `extend` block into yours.
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: "#F7F7F5",
        surface: "#FFFFFF",
        "text-primary": "#161613",
        "text-secondary": "#57574F",
        "text-muted": "#9C9C94",
        "text-inverse": "#FFFFFF",
        "border-default": "#DEDEDA",
        "border-subtle": "#EDEDEA",
        accent: { DEFAULT: "#3F52E8", weak: "#EDEFFD" },
        success: "#2F7D4F",
        warning: "#9C6B15",
        danger: "#B3402D",
        approval: { DEFAULT: "#F5A623", weak: "#FFF4E0" },
        "agent-bubble": "#FFFFFF",
        "user-bubble": "#EDEDEA",
      },
      fontFamily: {
        ui: ["Archivo", "sans-serif"],
        body: ["Newsreader", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["20px", "28px"],
        xl: ["25px", "32px"],
      },
      spacing: {
        // theme.spacing.scale, as Tailwind's numeric-key spacing convention (1 unit = 4px, matching baseUnit).
        1: "4px", 2: "8px", 3: "12px", 4: "16px", 6: "24px", 8: "32px", 12: "48px", 16: "64px",
      },
      borderRadius: {
        sm: "6px", md: "10px", lg: "16px",
      },
      boxShadow: {
        bubble: "0 1px 2px rgba(22,22,19,.08)",
        panel: "0 8px 24px rgba(22,22,19,.10)",
        approval: "0 12px 32px rgba(22,22,19,.18)",
      },
      transitionDuration: {
        instant: "80ms", fast: "120ms", DEFAULT: "160ms", slow: "240ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(.2,.6,.2,1)",
        exit: "cubic-bezier(.4,0,1,1)",
      },
    },
  },
};
