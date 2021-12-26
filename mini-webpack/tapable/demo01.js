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

/**
 * 同步钩子
 * 异步钩子
 * 都是回调执行完成，才会继续往下走
 */
