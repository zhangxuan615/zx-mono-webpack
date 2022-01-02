const Plugin02 = require('./src/plugins/Plugin02');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [new Plugin02()]
};
