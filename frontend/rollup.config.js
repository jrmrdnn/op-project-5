import css from "rollup-plugin-import-css";

export default {
  input: "src/index.js",
  output: {
    file: "public/app.js",
    format: "es",
  },
  plugins: [
    css({
      output: "style.css",
    }),
  ],
};
