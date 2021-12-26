const path = require('path');
const toConstantCase = require('constant-case');

module.exports = plop => {
  /**
   * 各种命名规范标准
   * properCase/pascalCase: ChangeFormatToThis
   * camelCase: changeFormatToThis
   * snakeCase: change_format_to_this
   * constantCase: CHANGE_FORMAT_TO_THIS
   * dashCase/kebabCase: change-format-to-this
   * dotCase: change.format.to.this
   * pathCase: change/format/to/this
   * lowerCase: change format to this
   * sentenceCase: Change format to this,
   */
  // 转化为大写字母（小写 lowerCase 自带了）
  plop.setHelper('upperCase', function (text) {
    return text.toUpperCase();
  });
  plop.setHelper('wrappedBraces', function (text) {
    return `{${text}}`;
  });
  plop.setHelper('wrappedBracesWithSuffix', function (text, suffix) {
    return `{${text}${suffix || ''}}`;
  });

  plop.setGenerator('new', {
    decsription: '创建一个新的组件',
    prompts: [
      {
        type: 'input',
        name: 'comName',
        message: '新增组件名称（必须符合 kebab-case 命名规范：a-b-c）',
        default: 'default-com',
        validate(value) {
          if (/^[a-z]+(-[a-z]+)*$/.test(value)) {
            return true;
          }

          return 'Please enter a valid kebab-case string';
        }
      },
      {
        type: 'input',
        name: 'libName',
        message: '组件库名称（必须符合 kebab-case 命名规范：a-b-c）',
        default: 'default-lib',
        validate(value) {
          if (/^[a-z]+(-[a-z]+)*$/.test(value)) {
            return true;
          }

          return 'Please enter a valid kebab-case string';
        }
      },
      {
        type: 'confirm',
        name: 'isDemoCom',
        message: '是否需要自动生成demo组件',
        default: false
      },
      {
        type: 'confirm',
        name: 'isDemoCom',
        message: '是否需要自动生成demo组件',
        default: false
      },
      {
        type: 'confirm',
        name: 'isRouteMenu',
        message: '是否需要添加菜单路由配置',
        default: false
      },
      {
        type: 'confirm',
        name: 'isFirstRoute',
        message: '是否是第一次配置菜单路由',
        default: false,
        when: answers => {
          return answers.isRouteMenu;
        }
      }
    ],
    actions: data => {
      const { comName, libName, isDemoCom, isRouteMenu, isFirstRoute } = data;

      //   let publicDir = '';
      //   if (comName === '') {
      //     publicDir = process.env.INIT_CWD;
      //   }

      return [
        /**
         * 组件
         */
        // {
        //   type: 'addMany',
        //   destination: path.resolve(__dirname, './test1'),
        //   templateFiles: './plop-templates/com/*.hbs',  // 注意 glob 只能支持 posix 文件写法，因此windows下不能使用 path
        //   template: './com.hbs',
        //   stripExtensions: 'hbs', // 默认自动使用的文件扩展名
        //   force: true
        // },
        {
          type: 'add',
          path: path.resolve(`./packages/${libName}/components/${comName}/${comName}.tsx`),
          templateFile: path.resolve(__dirname, './plop-templates/com/com.hbs'),
          force: true
        },
        {
          type: 'add',
          path: path.resolve(`./packages/${libName}/components/${comName}/interface.ts`),
          templateFile: path.resolve(__dirname, './plop-templates/com/interface.hbs'),
          force: true
        },
        {
          type: 'add',
          path: path.resolve(`./packages/${libName}/components/${comName}/index.ts`),
          templateFile: path.resolve(__dirname, './plop-templates/com/index.hbs'),
          force: true
        },
        {
          type: 'add',
          path: path.resolve(`./packages/${libName}/components/${comName}/style/index.ts`),
          templateFile: path.resolve(__dirname, './plop-templates/com/style/index.hbs'),
          force: true
        },
        {
          type: 'add',
          path: path.resolve(`./packages/${libName}/components/${comName}/style/index.less`),
          templateFile: path.resolve(__dirname, './plop-templates/com/style/style.hbs'),
          force: true
        },
        // demo
        {
          type: 'add',
          path: path.resolve(`./packages/ui-app/src/pages/${libName}/${comName}/index.tsx`),
          templateFile: path.resolve(__dirname, './plop-templates/demo/index.hbs'),
          force: true
        },
        isRouteMenu && isFirstRoute && {
          type: 'append',
          path: path.resolve(__dirname, './packages/ui-app/src/routes/route.config.ts'),
          pattern: new RegExp('\\/\\* ROUTE BEGIN \\*\\/', 'i'),
          template: `      /* ${toConstantCase(libName)} ROUTE BEGIN */`
        },
        isRouteMenu && {
          type: 'modify',
          path: path.resolve(__dirname, './packages/ui-app/src/routes/route.config.ts'),
          pattern: new RegExp(`(\\/\\* ${toConstantCase(libName)} ROUTE BEGIN \\*\\/)`, 'i'),
          templateFile: path.resolve(__dirname, './plop-templates/demo/route.hbs')
          // transform: () => {},
        },
        isRouteMenu && isFirstRoute && {
          type: 'append',
          path: path.resolve(__dirname, './packages/ui-app/src/routes/menu.config.ts'),
          pattern: new RegExp('\\/\\* MENU BEGIN \\*\\/', 'i'),
          templateFile: path.resolve(__dirname, './plop-templates/demo/init_menu.hbs')
        },
        isRouteMenu && {
          type: 'modify',
          path: path.resolve(__dirname, './packages/ui-app/src/routes/menu.config.ts'),
          pattern: new RegExp(`\\/\\* ${toConstantCase(libName)} CHILDREN MENU BEGIN \\*\\/`, 'i'),
          templateFile: path.resolve(__dirname, './plop-templates/demo/menu.hbs')
        }
      ].filter(Boolean);
    }
  });
};
