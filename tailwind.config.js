/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "accent-100": "var(--accent-100)",
        "accent-200": "var(--accent-200)",
        accenthover: "var(--accenthover)",
        bordercard: "var(--bordercard)",
        borderinput: "var(--borderinput)",
        "colecci-n-de-variables-accent": "var(--colecci-n-de-variables-accent)",
        "colecci-n-de-variables-background":
          "var(--colecci-n-de-variables-background)",
        "colecci-n-de-variables-border": "var(--colecci-n-de-variables-border)",
        "colecci-n-de-variables-color-semantico-azul":
          "var(--colecci-n-de-variables-color-semantico-azul)",
        "colecci-n-de-variables-color-semantico-naranja":
          "var(--colecci-n-de-variables-color-semantico-naranja)",
        "colecci-n-de-variables-color-semantico-rojo":
          "var(--colecci-n-de-variables-color-semantico-rojo)",
        "colecci-n-de-variables-color-semantico-verde":
          "var(--colecci-n-de-variables-color-semantico-verde)",
        "colecci-n-de-variables-color-texto-principal":
          "var(--colecci-n-de-variables-color-texto-principal)",
        "colecci-n-de-variables-color-texto-principal-duplicate":
          "var(--colecci-n-de-variables-color-texto-principal-duplicate)",
        "colecci-n-de-variables-muted": "var(--colecci-n-de-variables-muted)",
        "colecci-n-de-variables-primary":
          "var(--colecci-n-de-variables-primary)",
        "colecci-n-de-variables-secondary":
          "var(--colecci-n-de-variables-secondary)",
        "colecci-n-de-variables-terciario":
          "var(--colecci-n-de-variables-terciario)",
        "destructive-100": "var(--destructive-100)",
        "destructive-200": "var(--destructive-200)",
        destructivedefault: "var(--destructivedefault)",
        fontalert: "var(--fontalert)",
        fontprimary: "var(--fontprimary)",
        fontsecondary: "var(--fontsecondary)",
        "icon-100": "var(--icon-100)",
        icondefault: "var(--icondefault)",
        "muted-100": "var(--muted-100)",
        mutedbackground: "var(--mutedbackground)",
        mutedforeground: "var(--mutedforeground)",
        pendingdefault: "var(--pendingdefault)",
        primaryforeground: "var(--primaryforeground)",
        "primaryopacity-20": "var(--primaryopacity-20)",
        "primaryopacity-50": "var(--primaryopacity-50)",
        "primaryopacity-85": "var(--primaryopacity-85)",
        primaryprimary: "var(--primaryprimary)",
        secondaryforeground: "var(--secondaryforeground)",
        secondarysecondary: "var(--secondarysecondary)",
        "succes-100": "var(--succes-100)",
        "succes-200": "var(--succes-200)",
        succesdefault: "var(--succesdefault)",
        tertiaryforegroung: "var(--tertiaryforegroung)",
        tertiarytertiary: "var(--tertiarytertiary)",
        "warning-100": "var(--warning-100)",
        "warning-200": "var(--warning-200)",
        warningdefault: "var(--warningdefault)",
      },
      fontFamily: {
        "button-button": "var(--button-button-font-family)",
        "button-medium": "var(--button-medium-font-family)",
        h1: "var(--h1-font-family)",
        h2: "var(--h2-font-family)",
        h3: "var(--h3-font-family)",
        h4: "var(--h4-font-family)",
        "help-text": "var(--help-text-font-family)",
        input: "var(--input-font-family)",
        label: "var(--label-font-family)",
        "numeric-KPI": "var(--numeric-KPI-font-family)",
        "numeric-table": "var(--numeric-table-font-family)",
        parrafo: "var(--parrafo-font-family)",
        "title-XL": "var(--title-XL-font-family)",
      },
      keyframes: {
        dotPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(0.6)", opacity: "0.5" },
        },
        triangle: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0",
          },
          "25%": {
            opacity: "1",
          },
          "50%": {
            transform: "translate(var(--x), var(--y)) scale(1)",
          },
          "75%": {
            opacity: "1",
          },
          "100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0",
          },
        },
      },
      animation: {
        "dot-pulse": "dotPulse 2s ease-in-out infinite",
        triangle: "triangle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
