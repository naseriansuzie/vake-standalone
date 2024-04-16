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
    'color-hex-case': 'upper',
    'declaration-colon-newline-after': null,
    'function-name-case': null,
    'number-leading-zero': 'always',
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['label', '/^user-/'],
      },
    ],
    'value-list-comma-newline-after': null,
    'value-keyword-case': null,
  },
};
