class Plugin01 {
  apply(compiler) {
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      console.log('emit: ');
    });

    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, cb) => {
      console.log(' tapAsync emit: ');
      cb();
    });

    compiler.hooks.emit.tapPromise('MyPlugin', (compilation, cb) => {
      console.log(' tapAsync emit: ');
      return Promise.reject('');
    });

    compiler.hooks.afterEmit.tap('MyPlugin', compilation => {
      console.log('afterEmit: ');
    });

    compiler.hooks.done.tap('MyPlugin', stats => {
      console.log('done: ');
    });
  }
}

module.exports = Plugin01;
