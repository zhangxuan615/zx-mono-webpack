const fs = require('fs');
const util = require('util');
const path = require('path');

const webpack = require('webpack');
const { RawSource } = webpack.sources;

// 将 fs.readFile 异步方法 变成基于 promise 的异步方法
const readFile = util.promisify(fs.readFile);

class Plugin02 {
  apply(compiler) {
    // 初始化 compilation 钩子
    compiler.hooks.thisCompilation.tap('Plugin2', compilation => {
      compilation.hooks.additionalAssets.tapAsync('plugin2', async cb => {
        const content = 'hello world';
        compilation.assets['a.txt'] = {
          // 创建文件大小
          size() {
            return content.length;
          },

          // 创建文件内容
          source() {
            return content;
          }
        };

        const data = await readFile(path.resolve(__dirname, 'x.txt'));
        // 两种方式等价
        // compilation.assets["b.txt"] = new RawSource(data);
        compilation.emitAsset('c.txt', new RawSource(data));

        cb();
      });
    });
  }
}

module.exports = Plugin02;
