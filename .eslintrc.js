module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": "off",
    "linebreak-style": "off",
    quotes: "off",
    "no-unused-vars": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "import/no-extraneous-dependencies": "off",
    "implicit-arrow-linebreak": "off",
    radix: "off",
    "comma-dangle": "off",
    "no-bitwise": "off",
  },
};
