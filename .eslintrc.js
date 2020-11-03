module.exports = {
  extends: ["airbnb-typescript/base"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-continue": "off"
  },
  overrides: [
    {
      files: "./src/utils/**/*.ts",
      rules: {
        "import/prefer-default-export": "off"
      }
    } 
  ]
};
