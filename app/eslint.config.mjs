import globals from "globals";
import Js from "@eslint/js";
import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {rules: {semi: "error"}},
  {languageOptions: { globals: globals.browser }},
  Js.configs.recommended,
  ...tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
];