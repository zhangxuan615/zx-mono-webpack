# webpack 原理笔记

## 自定义 loaders

**1. 执行顺序**

- 默认导出按照从下往上顺序执行
- pitch 导出按照从上往下顺序执行

**2. 配置 `loaders` 导入目录**

```javascript
{
  resolveLoader: {
    modules: [absolutePath('./src/loaders'), 'node_modules'];
  }
}
```

**3. 同步 / 异步**
同步（默认）

- 直接在函数中 return
- 利用 this.callback(null, content)

异步（推荐）

- `const callback= this.async(); ...`

**4. 获取/校验 loader 参数**

- 安装依赖 `yarn add --dev loader-utils schema-utils`
- 获取参数、校验参数

```javascript
import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';

// 导入参数校验配置：只要是一个对象就可以
import schema from './.schema';

export default function (content, map, meta) {
  // 1. 获取参数
  const options = getOptions(this);
  // 2. 校验参数
  console.log('33333', content, options);
  validate(schema, options, {
    name: 'loader3zx'
  });

  // 异步方式
  const callback = this.async();
  setTimeout(() => {
    callback(null, 'var x = 13;');
  }, 3000);
}
```
