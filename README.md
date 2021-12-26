# 初始化 monorepo 项目

1. 初始化项目：`npx lerna init`
   - 在 packages 文件夹下初始化一个 package 模块：`lerna create <name>`
   - `npx lerna create @zx/aaa`
   - `npx lerna create @zx/aab`
2. 执行命令
   - 执行在 packages 文件夹下所有 package 中的 script 命令（若某个 packkage 中没有则中断执行，报错退出）
     - `npx lerna run test` 或者 `npx lerna exec -- yarn test`
     - `yarn workspaces run test`
   - 执行在 packages 文件夹下某个 package 中的 script 命令
     - `npx lerna --scope @zx/aaa run test` 或者 `npx lerna exec --scope @zx/aaa -- yarn test`
     - `yarn workspace @zx/aaa run test`
3. 查看项目中 workspaces 依赖树
   - `yarn workspaces info [--json]`

# yarn 依赖管理

> 利用 lerna 来管理依赖很恶心，优先考虑使用 yarn 来管理依赖

1. 只给 根目录下 root 安装依赖：
   - `yarn add --dev(-D) -W prettie`
   - `yarn remove -D -W typescript`
2. 给 packags 下所有包安装依赖：
   - `yarn add --dev(-D) -W prettie`
   - `yarn remove -W -D typescript`
     - `npx lerna add (-D) <lib_name>`: 给所有 package 安装依赖，不包括根目录：给所有 package 目录下的 package.json 添加依赖
     - `npx lerna remove (-D) <lib_name>`: 给所有 package 安装依赖，不包括根目录：给所有 package 目录下的 package.json 添加依赖
3. 只给 packags 下某给包单独安装依赖：
   - `yarn workspace @zx/aaa add math`
   - `yarn workspace @zx/aaa remove math`
     - `npx lerna add (-D) <lib_name> --scope <package_name>`
     - `npx lerna remove (-D) <lib_name> --scope <package_name>`
4. 清理依赖：所有 package 中的依赖 node_modules （不包括根目录）
   - `lerna clean`

# lerna 版本控制，包发布管理

幸运的是 lerna 支持按照拓扑排序规则执行命令, ​--sort​ 参数可以控制以拓扑排序规则执行命令
`lerna run --stream --sort build`

使用--conventional-commits 参数会自动的根据 conventional commit 规范和 git commit message 记录帮忙确定更新的版本号
`lerna version --conventional-commits`

> lerna 官方不支持仅发布某个 package，如果需要，只能自己手动的进入 package 进行发布，这样 lerna 自带的各种功能就需要手动完成且可能和 lerna 的功能相互冲突
