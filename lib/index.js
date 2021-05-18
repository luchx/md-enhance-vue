// @ts-nocheck
const path = require("path");
const { getOptions, parseQuery, stringifyRequest } = require("loader-utils");
const config = require("./config");
const { parse } = require("./utils");

// 缓存组件内容
const vueCacheContent = {};

module.exports = function(source) {
  const loaderContext = this;
  const { resourcePath, resourceQuery } = loaderContext;

  // 获取 loader 配置
  const options = getOptions(loaderContext) || {};
  const md = config(options);
  const content = md.render(source);
  // 当前文件名
  const fileName = path
    .basename(resourcePath)
    .replace(path.extname(resourcePath), "")
    .replace("-", "");

  const startTag = "<!--demo-begin:"; // 匹配开启标签
  const startTagLen = startTag.length;
  const endTag = ":demo-end-->"; // 匹配关闭标签
  const endTagLen = endTag.length;

  let components = ""; // 存储组件示例
  let importVueString = ""; // 存储引入组件声明
  let uid = 0; // demo 的 uid
  const outputSource = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  const queryParams =
    resourceQuery.length > 0
      ? parseQuery(resourceQuery)
      : {
          vueDemoBlock: false,
        };

  // 判断如果是代码块进入则直接传递给 vue-loader 使用
  if (queryParams.vueDemoBlock) {
    // 读取返回的代码块内容
    return parse(vueCacheContent, queryParams.componentNameId, options);
  }

  while (commentStart !== -1 && commentEnd !== -1) {
    outputSource.push(content.slice(start, commentStart));

    const componentNameId = `demo_${fileName}_${uid}`;

    vueCacheContent[componentNameId] = content.slice(
      commentStart + startTagLen,
      commentEnd
    )
    // 声明内容插槽传入
    outputSource.push(
      `<template slot="source"><${componentNameId} /></template>`
    );

    // 添加引入声明
    importVueString += `\nimport ${componentNameId} from ${stringifyRequest(
      loaderContext,
      resourcePath + `?vueDemoBlock&componentNameId=${componentNameId}`
    )};`;
    // 添加组件声明
    components += `${componentNameId},`;

    // 重新计算下一次的位置
    uid++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 后续内容添加
  outputSource.push(content.slice(start));

  return `
    <template>
      <section class="demo-container">
        ${outputSource.join("")}
      </section>
    </template>
    <script>
      ${importVueString}
      export default {
        name: 'demo-container',
        components: {
          ${components}
        },
      }
    </script>
  `;
};
