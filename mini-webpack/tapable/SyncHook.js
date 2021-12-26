const { SyncHook } = require('tapable');
/**
 * 同步钩子
 * SyncHook：最基本的同步钩子，单纯的按照顺序执行注册的回调函数
 * SyncBailHook：单纯的按照顺序执行注册的回调函数，如果回调函数返回 非undefined 值，停止
 * SyncWaterfallHook：接受至少一个参数，上一个注册的回调返回值会作为下一个注册的回调的参数。
 * SyncLoopHook：有点类似 SyncBailHook，但是是在执行过程中回调返回非 undefined 时继续再次执行当前的回调。
 */
const hook = new SyncHook(['name']);

hook.tap('helloabc', name => {
  console.log(`hello ${name}`);
});
hook.tap('helloabc again', name => {
  console.log(`hello ${name}, again`);
});

hook.call('ahonn');
// hello ahonn
// hello ahonn, again
