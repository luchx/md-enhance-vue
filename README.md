# md-enhance-vue

一个支持在 markdown 中写 Vue 的 webpack loader~

## 安装

```bash
yarn add md-enhance-vue -D
# OR
npm install md-enhance-vue -D
```

## webpack 使用

> 支持在 webpack 中配置使用。

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
          {
            loader: "md-enhance-vue",
            options: {
              // ... 见下文
            },
          },
        ],
      },
    ],
  },
};
```

## vue-cli 使用

> 支持在 vue-cli 脚手架中配置使用。

```js
// vue.config.js

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("md-loader")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .options({
        compilerOptions: {
          preserveWhitespace: false,
        },
      })
      .end()
      .use("md-enhance-vue")
      .loader("md-enhance-vue")
      .options({
        // ... 见下文
      })
      .end();
  },
};
```

## eslint ignore

> 如果配置了 eslint，则需要在 `.eslintignore` 文件中添加忽略，避免格式化问题。

```bash
*.md
```

## options 扩展选项

```js
{
  cacheDir: ".", // 定义 md 文件转换后的 vue 组件缓存目录，默认在同级目录下。
  lineNumbers: true, // 是否启用行号，默认启用
  // markdown-it-table-of-contents options see: https://github.com/martinlissmyr/markdown-it-table-of-contents
  toc: {},
  // markdown-it-anchor options see: https://github.com/valeriangalliat/markdown-it-anchor
  anchor: {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "$"
  }
}
```

## 用法

> 使用时需要将 vue 模板写在以 `:::demo 开头，::: 结束` 的标签中，能识别以 `vue、html` 包裹的代码块。支持配置的所有以 `.vue` 单文件支持的写法

````markdown
# 测试标题

我是一段文字

:::demo

```vue
<template>
  <div>
    测试 md 内置组件 -- <span class="text">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello World !!!",
    };
  },
};
</script>
<style scoped>
.text {
  color: #f00;
}
</style>
```

:::
````

