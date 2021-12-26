import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';

import schema from './.schema';

// loader 本质上是一个函数
export const pitch = function () {
  console.log('3333: pitch');
};

export default function (content, map, meta) {
  const options = getOptions(this);
  validate(schema, options, {
    name: 'loader3zx'
  });

  console.log('33333', content, options);

  // 异步方式
  const callback = this.async();
  setTimeout(() => {
    callback(null, 'var x = 13;');
  }, 3000);

  // 同步方式
  // this.callback(null, 'const x = 123456;');
  // return content;
}
