// loader 本质上是一个函数
export const pitch = function () {
  console.log('222: pitch');
};

export default function (content, map, meta) {
  console.log('22222', content);

  return content + 'console.log(12);';
}
