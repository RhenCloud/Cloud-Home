// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt([eslintPluginPrettierRecommended], {
  files: ["app/**/*.ts", "app/**/*.vue", "server/**/*.ts"],
  ignores: [".nuxt/", "node_modules/"],
});
