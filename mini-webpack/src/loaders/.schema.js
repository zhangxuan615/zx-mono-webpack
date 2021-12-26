export default {
  type: 'object', // options 类型
  properties: {
    name: {
      type: 'string', // 参数类型
      description: '名称~' // 参数描述
    }
  },
  additionalProperties: true // 是否允许定义之外的参数
};
