const CopyWebpackPlugin = require('./src/plugins/CopyWebpackPlugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new CopyWebpackPlugin({
      from: './src/public',
      to: './copy-dist',
      ignore: ['**/index.html']
    })
  ]
};
