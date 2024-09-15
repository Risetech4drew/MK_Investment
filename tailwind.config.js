/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./pages/services/**/*.html",
    "./assets/src/css/**/*.css",
    "./assets/src/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        bkgDark: "#050a1f",
        accent: "#A34928",
        accentLight: "#5D180E",
      },
      backgroundImage: {
        "hero-pattern": "url('/assets/images/flat-geometric-background.png')",
        "contact-bkg": "url('/assets/images/contact_bg.jpg')",
        "aboutUs-bkg": "url('/assets/images/business_team.jpg')",
      },
      aspectRatio: {
        "9/14": "9 / 14",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      fontFamily: {},
      fontSize: {
        sm: ["clamp(1.00rem, calc(0.92rem + 0.39vw), 1.20rem)", "1.4"],
        base: ["clamp(1.13rem, calc(0.98rem + 0.73vw), 1.50rem)", "1.5"],
        lg: ["clamp(1.27rem, calc(1.03rem + 1.19vw), 1.88rem)", "1.4"],
        xl: ["clamp(1.42rem, calc(1.06rem + 1.80vw), 2.34rem)", "1.4"],
        "2xl": ["clamp(1.60rem, calc(1.08rem + 2.59vw), 2.93rem)", "1.2"],
        "3xl": ["clamp(1.80rem, calc(1.08rem + 3.63vw), 3.66rem)", "1.1"],
        "4xl": ["clamp(2.03rem, calc(1.03rem + 4.98vw), 4.58rem)", "1"],
        "5xl": ["clamp(2.28rem, calc(0.94rem + 6.71vw), 5.72rem)", "1"],
        "6xl": ["clamp(2.57rem, calc(0.78rem + 8.95vw), 7.15rem)", "1"],
      },
    },
  },
  plugins: [],
};
