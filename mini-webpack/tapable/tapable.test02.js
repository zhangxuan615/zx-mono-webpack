const {
  SyncHook, // 按照顺序执行回调函数
  SyncBailHook, // 按照顺序执行回调函数，如果某个回调函数有返回值，停止执行
  SyncWaterfallHook, // 瀑布流：按照顺序执行回调函数，并以上一个回调返回值作为下一个回调参数
  SyncLoopHook, // 按照顺序执行回调函数，如果回调函数有返回值，继续再次执行该回调
  AsyncParallelHook, // 并行执行
  AsyncParallelBailHook, // 并行执行，有返回值终止
  AsyncSeriesHook, // 串行执行
  AsyncSeriesBailHook, // 串行执行，有返回值终止
  AsyncSeriesWaterfallHook // 串行执行，瀑布流
} = require('tapable');

class Lesson {
  constructor() {
    // 初始化钩子容器
    this.hooks = {
      asyncParallelHook: new AsyncParallelHook(['name', 'age'])
    };

    this.initTap();
  }

  initTap() {
    // syncHook
    this.hooks.asyncParallelHook.tapAsync('syncHook01', (name, age, cb) => {
      console.log('asyncHook log 01: ', name, age);

      setTimeout(() => {
        console.log('async 01');
        cb();
      }, 3000);
    });
    this.hooks.asyncParallelHook.tapAsync('syncHook02', (name, age, cb) => {
      console.log('asyncHook log 02: ', name, age);
      cb();
    });

    this.hooks.asyncParallelHook.tapPromise('syncHook03', (name, age) => {
      console.log('asyncHook log 03 promise: ', name, age);
      return new Promise((resolve, reject) => {
        reject(1);
      });
    });
  }

  startAsyncParallelHook() {
    this.hooks.asyncParallelHook.callAsync('zx1', 18, () => {
      // 所以异步钩子都执行完 cb() 或者 返回Promise完成态，才会触发该回调
      // 有点类似 Promise.all 特性
      console.log('all async hooks end。。。。');
    });
  }
}

const les = new Lesson();
les.startAsyncParallelHook();
