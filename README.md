# md-enhance-vue

一个支持在 markdown 中写 Vue 的 webpack loader~

支持特性 ✨✨✨：

1. 支持 .md 文件渲染
2. 支持在 markdown 中 Vue 模板渲染
3. 支持在 Vue 模板中使用 import
4. 支持代码高亮（使用 prismjs）
5. 支持传递 vue-loader 的所有特性（需要项目配置支持）

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
# 支持标题

我是一段文字

:::demo

```vue
<script>
export default {
  template: `<div>
    支持内联组件（需要配合 Vue 的 runtimeCompiler 模式）
  </div>`,
};
</script>
```

:::

:::demo

```vue
<script>
export default {
  render() {
    return <div>支持 render 函数</div>;
  },
};
</script>
```

:::

:::demo

```vue
<div>
  支持无 template 包裹
</div>
<script>
export default {};
</script>
```

:::

:::demo

```vue
<div>
  支持多根元素1
</div>
<div>
  支持多根元素2
</div>

<script>
export default {};
</script>
```

:::

:::demo

```vue
<span class="text">{{ data.msg }}</span>

<script>
import data from "./data.json";
console.log("data ======> ", data);

export default {
  data() {
    return {
      data,
    };
  },
};
</script>
<style>
.text {
  color: #f00;
}
</style>
```

:::

:::demo

```vue
<template>
  <div>
    <span class="text">支持 scss 样式</span>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
div {
  .text {
    color: #f00;
  }
}
</style>
```

:::

````

## 完整示例

> 需要注意的是文档挂载在全局组件 `demo-block` 下，所以你需要创建并使用组件 `demo-block`，另外还需要引入 `markdown` 支持的样式文件。

```vue
<template>
  <div class="demo-block">
    <slot name="source"></slot>
  </div>
</template>

<script>
export default {
  name: "DemoBlock",
};
</script>
```

```js
// main.js
import DemoBlock from "./components/demo-block";
Vue.component("demo-block", DemoBlock);
```

更多使用可参考 <https://github.com/luchx/ECHI_UI>

## 原理

请参考文章 [✨ 在 Markdown 中 使用 Vue](https://www.yuque.com/luchx/ziwg5m/df00sl)
