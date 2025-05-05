import globals from "globals";
import Js from "@eslint/js";
import tseslint from "typescript-eslint";



export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
    },
    {
        ignores: ["public/*", "node_modules/*", ".next/*", "../fake-feed/src/*"]
    },
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    Js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            semi: ["error"],
            indent: ["error"],
            "object-curly-spacing": ["error", "always"],
            "prefer-const": "off"
        }
    },
];