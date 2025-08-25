import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier"; // ✅ Correct import
import prettierRecommended from "eslint-plugin-prettier/recommended"; // ✅ For recommended Prettier config

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ✅ Extend Next.js rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Add Prettier integration
  prettierRecommended, // Automatically includes plugin and rules
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Shows Prettier issues as ESLint errors
    },
  },

  // ✅ Ignore unnecessary folders
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
export default eslintConfig;