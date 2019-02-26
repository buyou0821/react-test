module.exports = {
  "parser": "babel-eslint",
  "extends": ["plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "none",
        "semi": false
      }
    ]
  }
}