module.exports = {
  // 配置是否跳过某些环节
  skip: {
    // changelog: true, // 配置跳过生成 changelog
    // tag: true,
  },
  //types为Conventional Commits标准中定义，目前支持
  // hidden属性值控制是否将该类型的commit消息写入changlog, 不填的情况下默认是:false
  types: [
    { type: "feat", section: "✨ 新特性" },
    { type: "fix", section: "🐛 Bug修复" },
    { type: "docs", section: "✏️ 文档" },
    { type: "chore", section: "配置项", hidden: true },
    { type: "style", section: "格式", hidden: true },
    { type: "refactor", section: "重构", hidden: true },
    { type: "perf", section: "性能", hidden: true },
    { type: "test", section: "测试", hidden: true },
    { type: "build", section: "构建", hidden: true },
    { type: "ci", section: "CI", hidden: true },
    { type: "revert", section: "回滚", hidden: true },
  ],
};
