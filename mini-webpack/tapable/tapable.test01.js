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
      syncHook: new SyncHook(['address']),
      syncBailHook: new SyncBailHook(['address2'])
    };

    this.initTap();
  }

  initTap() {
    // syncHook
    this.hooks.syncHook.tap('syncHook01', address => {
      console.log('syncHook log 01: ', address);
    });
    this.hooks.syncHook.tap('syncHook02', address => {
      console.log('syncHook log 02: ', address);
    });
    // syncBailHook
    this.hooks.syncBailHook.tap('syncBailHook01', address => {
      console.log('syncBailHook log 01: ', address);
      return 1;
    });
    this.hooks.syncBailHook.tap('syncBailHook02', address => {
      console.log('syncBailHook log 02: ', address);
    });
  }

  startSyncHook() {
    this.hooks.syncHook.call('zx1: sync');
  }

  startSyncBailHook() {
    this.hooks.syncBailHook.call('zx1: syncbail');
  }
}

const les = new Lesson();
les.startSyncHook();
les.startSyncBailHook();
