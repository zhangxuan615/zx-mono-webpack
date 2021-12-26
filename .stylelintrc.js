module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-recommended', 'stylelint-config-standard', 'stylelint-less'], // 这是官方推荐的方式
  rules: {
    // css书写顺序
    'order/order': ['declarations', 'custom-properties', 'dollar-variables', 'rules', 'at-rules'],
    'order/properties-order': [
      'position',
      'z-index'
      // 其他样式的顺序
    ],
    // 其他规则
    'string-quotes': 'single',
    'alpha-value-notation': 'number',
    'no-empty-source': null
  }
};
