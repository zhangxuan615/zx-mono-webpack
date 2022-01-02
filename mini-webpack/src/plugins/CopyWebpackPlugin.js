const { validate } = require('schema-utils');
const schema = require('./schema.json');
const globby = require('globby');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const webpack = require('webpack');

// 将 回调异步 转换为 promise异步
const readFile = promisify(fs.readFile);

const { RawSource } = webpack.sources;

class CopyWebpackPlugin {
  constructor(options = {}) {
    // 验证 options 是否符合规范
    validate(schema, options, {
      name: 'CopyWebpackPlugin'
    });
    this.options = options;
  }

  apply(compiler) {
    // 初始化 compilation
    compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', async compilation => {
      // 添加资源的 hooks
      compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async cb => {
        // 将 from 中的资源复制到 to 中，输出出去
        const { from, ignore } = this.options;
        const to = this.options.to ? this.options.to : '.';
        // 1. 读取 from 中的所有资源，globby(要处理的文件夹，options)
        // 运行指令的目录
        const context = compiler.options.context;
        // 将输入路径变成绝对路径
        let absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from);
        absoluteFrom = absoluteFrom.replace(/\\/g, '/');
        // 过滤掉 ignore 的文件
        const paths = await globby(absoluteFrom, { ignore });

        // 2. 读取 paths 中所有资源
        const fileData = await Promise.all(
          paths.map(async itemPath => {
            // const data = await readFile(path, 'utf-8');
            const data = await readFile(itemPath);

            // 文件名称
            let fileName = path.basename(itemPath);
            fileName = path.join(to, fileName);

            return {
              data,
              fileName
            };
          })
        );

        // 3. 生成 webpack 格式的资源
        const assets = fileData.map(file => {
          const source = new RawSource(file.data);

          return {
            source,
            fileName: file.fileName
          };
        });
        // 4. 添加 compilation 中，输出出去
        assets.forEach(asset => {
          compilation.emitAsset(asset.fileName, asset.source);
        });

        cb();
      });
    });
  }
}

module.exports = CopyWebpackPlugin;
