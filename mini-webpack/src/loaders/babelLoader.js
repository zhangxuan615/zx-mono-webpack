import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';
import { transform } from '@babel/core';
import util from 'util';

const schema = {
  type: 'object', // options 类型
  properties: {
    presets: {
      type: 'array', // 参数类型
      description: '预设环境~' // 参数描述
    }
  },
  additionalProperties: true // 是否允许定义之外的参数
};

// babel.transform 用来编译代码的方法
// util.promisify 将普通异步方法转化为基于 promise 的异步方法
const transform2 = util.promisify(transform);

// loader 本质上是一个函数
export const pitch = function () {
  console.log('3333: pitch');
};

export default function (content, map, meta) {
  const options = getOptions(this);
  validate(schema, options, {
    name: 'loader3zx' // 校验失败的错误提示
  });

  // 校验成功，继续执行
  // 异步方式
  const callback = this.async();
  transform2(content, options)
    .then(({ code, map }) => {
      callback(null, code, map, meta);
    })
    .catch(e => callback(e));

  // 同步方式
  // this.callback(null, 'const x = 123456;');
  // return content;
}
