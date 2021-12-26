const { AsyncSeriesHook } = require('tapable');
const hook = new AsyncSeriesHook(['name']);

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
// hello ahonn
// hello ahonn, again
// done
// cost: 3011.162ms
