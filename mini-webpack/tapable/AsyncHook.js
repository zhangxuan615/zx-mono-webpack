const { AsyncParallelHook } = require('tapable');

/**
 * 同步钩子
 * AsyncParallelHook 和 AsyncSeriesHook：最基本的异步钩子，单纯的按照顺序执行注册的回调函数
 */
const hook = new AsyncParallelHook(['name']);

console.time('cost');

hook.tapAsync('hello', (name, cb) => {
  console.log(111);
  setTimeout(() => {
    console.log(`hello ${name}`);
    cb();
  }, 2000);
});
hook.tapPromise('hello again', name => {
  console.log(222);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`hello ${name}, again`);
      resolve();
    }, 1000);
  });
});

hook.callAsync('ahonn', () => {
  console.log('done');
  console.timeEnd('cost');
});

// hello ahonn, again
// hello ahonn
// done
// cost: 2.004s
