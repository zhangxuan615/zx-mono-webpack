const { validate } = require('schema-utils');
const globby = require('globby');
const path = require('path');
const { readFile } = require('fs/promises');
const { RawSource } = require('webpack').sources;

const schema = require('./schema.json');

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
        /**
         * 1. 读取 from 中的所有资源
         * 2. 过滤掉 ignore 的文件
         * 3. 生成 webpack 格式的资源
         * 4. 添加 compilation 中，输出出去
         */
        // 1. 读取 from 中的所有资源，globby(要处理的文件夹，options)
        const { from, to = './', ignore } = this.options;
        // 运行指令的目录
        const contextPath = compiler.options.context;
        // 将输入路径变成绝对路径
        let absoluteFrom = path.isAbsolute(from) ? from : path.join(contextPath, from);
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
