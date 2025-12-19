// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
// import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt([eslintPluginPrettierRecommended], {
  files: ["src/**/*.ts", "src/**/*.vue"],
  ignores: [".nuxt/", "node_modules/"],
  language: "vue",

  // plugins: {
  //   prettier: prettierPlugin,
  // },
  // rules: {
  //   "prettier/prettier": "error",
  //   "simple-import-sort/imports": "error",
  //   "simple-import-sort/exports": "error",
  // },
});
