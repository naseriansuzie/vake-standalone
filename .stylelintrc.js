module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
    'stylelint-config-idiomatic-order',
  ],
  customSyntax: '@stylelint/postcss-css-in-js',
  plugins: ['stylelint-order'],
  reportNeedlessDisables: false,
  reportDescriptionlessDisables: false,
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['after-same-name', 'inside-block'],
        ignore: ['after-comment'],
      },
    ],
    'block-no-empty': null,
    'color-hex-length': 'long',
    'function-name-case': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['label', '/^user-/'],
      },
    ],
    'value-keyword-case': null,
    'no-missing-end-of-source-newline': null,
  },
};
