/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    require("prettier-plugin-astro"),
    require("prettier-plugin-tailwindcss"),
  ],
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 80,
};
