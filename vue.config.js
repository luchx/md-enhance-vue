const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 使用 runtime 时 vue 文件
  runtimeCompiler: true,
  chainWebpack: config => {
    // 使用自定义 loader
    config.module
      .rule("md-loader")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .options({
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()
      .use(resolve("./lib/index.js"))
      .loader(resolve("./lib/index.js"))
      .options({
        cssLang: "scss",
        // lineNumbers: false,
        // toc: {},
        // anchor: {
        //   permalinkSymbol: "#"
        // }
      })
      .end();
  },
}