module.exports = {
  env: {
    browser: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: [
    "eslint-plugin-import",
    "eslint-plugin-jsdoc",
    "eslint-plugin-prefer-arrow",
    "@typescript-eslint",
    "@typescript-eslint/tslint"
  ],
  root: true,
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array-simple"
      }
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "Object": {
            message: "Avoid using the `Object` type. Did you mean `object`?"
          },
          "Function": {
            message: "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
          },
          "Boolean": {
            message: "Avoid using the `Boolean` type. Did you mean `boolean`?"
          },
          "Number": {
            message: "Avoid using the `Number` type. Did you mean `number`?"
          },
          "String": {
            message: "Avoid using the `String` type. Did you mean `string`?"
          },
          "Symbol": {
            message: "Avoid using the `Symbol` type. Did you mean `symbol`?"
          },
          "{}": false
        },
        extendDefaults: true
      }
    ],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit"
      }
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "none",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-parameter-properties": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [
      "error",
      {
        hoist: "never"
      }
    ],
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/quotes": [
      "error",
      "double",
      {
        avoidEscape: true
      }
    ],
    "@typescript-eslint/semi": ["error", "never"],
    "@typescript-eslint/triple-slash-reference": [
      "error",
      {
        path: "always",
        types: "prefer-import",
        lib: "always"
      }
    ],
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/unified-signatures": "error",
    "arrow-body-style": "error",
    "arrow-parens": ["error", "as-needed"],
    "brace-style": ["error", "1tbs"],
    "comma-dangle": "error",
    "complexity": "off",
    "constructor-super": "error",
    "curly": "error",
    "dot-notation": "error",
    "eol-last": "error",
    "eqeqeq": ["error", "smart"],
    "guard-for-in": "error",
    "id-denylist": [
      "off",
      "any",
      "Number",
      "number",
      "String",
      "string",
      "Boolean",
      "boolean",
      "Undefined",
      "undefined"
    ],
    "id-match": "off",
    "import/order": "off",
    "jsdoc/check-alignment": "error",
    "jsdoc/check-indentation": "error",
    "jsdoc/newline-after-description": "error",
    "max-classes-per-file": ["error", 10],
    "max-len": [
      "error",
      {
        code: 130
      }
    ],
    "new-parens": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-console": [
      "error",
      {
        allow: [
          "warn",
          "dir",
          "time",
          "timeEnd",
          "timeLog",
          "trace",
          "assert",
          "clear",
          "count",
          "countReset",
          "group",
          "groupEnd",
          "table",
          "debug",
          "info",
          "dirxml",
          "error",
          "groupCollapsed",
          "Console",
          "profile",
          "profileEnd",
          "timeStamp",
          "context"
        ]
      }
    ],
    "no-debugger": "error",
    "no-empty": "error",
    "no-empty-function": "error",
    "no-eval": "off",
    "no-fallthrough": "off",
    "no-invalid-this": "off",
    "no-multiple-empty-lines": "error",
    "no-new-wrappers": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": [
      "error",
      {
        ignoreComments: true
      }
    ],
    "no-undef-init": "error",
    "no-underscore-dangle": "off",
    "no-unreachable": "error",
    "no-unsafe-finally": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-use-before-define": "off",
    "no-var": "error",
    "object-shorthand": "error",
    "one-var": ["error", "never"],
    "prefer-const": "error",
    "quote-props": ["error", "consistent-as-needed"],
    "quotes": ["error", "double", "avoid-escape"],
    "radix": "error",
    "semi": ["error", "never"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        asyncArrow: "always",
        named: "never"
      }
    ],
    "spaced-comment": [
      "error",
      "always",
      {
        markers: ["/"]
      }
    ],
    "use-isnan": "error",
    "valid-typeof": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/tslint/config": [
      "error",
      {
        rules: {
          "import-spacing": true,
          "whitespace": [
            true,
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type",
            "check-typecast"
          ]
        }
      }
    ],
    "space-before-function-paren": "off"
  }
}
