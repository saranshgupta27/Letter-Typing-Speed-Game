const generateSpacing = (spacer = 8) => {
  const GENERATE_UPTO = 20;
  const values = {};

  for (let i = 0; i <= GENERATE_UPTO; ) {
    values[i] = `${spacer * i}px`;

    if (i < 3) i += 0.25;
    else if (i < 5) i += 0.5;
    else i += 1;
  }

  return values;
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      // xs: "0px",
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
    spacing: {
      px: "1px",
      ...generateSpacing(),
    },
  },
  plugins: [],
};
