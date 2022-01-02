/**
 * 清除 console 代码
 */
const reg = /console.log\(.*\)/g;

export default function (content, map, meta) {
  // 异步方式
  const callback = this.async();
  setTimeout(() => {
    callback(null, content.replace(reg, ''));
  }, 10000);

  //   return content.replace(reg, '');
}
