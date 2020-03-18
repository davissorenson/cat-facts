module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"]
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  rules: {
    semi: "off",
    "@typescript-eslint/semi": ["error", "never"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "max-len": ["error", { code: 120 }],
    // the preferred interface member delimiter in TS is a semicolon, but prettier doesn't like that
    "@typescript-eslint/member-delimiter-style": {
      multiline: {
        delimiter: "none"
      }
    },
    "prettier/prettier": "error"
  }
}
