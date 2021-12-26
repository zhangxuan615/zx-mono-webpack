// loader 本质上是一个函数
export const pitch = function () {
  console.log('111: pitch');
};

export default function (content, map, meta) {
  console.log('111', content);

  return content + 'console.log(12);';
}
