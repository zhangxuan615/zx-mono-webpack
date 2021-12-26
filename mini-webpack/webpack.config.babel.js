import path from 'path';

const absolutePath = relativePath => path.resolve(process.cwd(), relativePath);

export default {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babelLoader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  resolveLoader: {
    modules: [absolutePath('./src/loaders'), 'node_modules']
  }
};
