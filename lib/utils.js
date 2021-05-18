// 将 css 代码块包裹
function scopedCss(cssContent = "", wrapper, lang = "css") {
  if (lang !== "css") {
    return `.${wrapper} { ${cssContent} }`;
  }

  const reg = /([\s\S]*?)\{([\s\S]*?)\}/gu;
  let scopedCode = "";
  let result;
  while ((result = reg.exec(cssContent))) {
    const [, selectors, definition] = result;
    scopedCode += `${selectors
      .replace(/\n/g, "")
      .split(",")
      .map((selector) => `.${wrapper} ${selector}`)
      .join(",")}{${definition}}`;
  }
  return scopedCode;
}

function getVueScript(content = "") {
  const jsBlock = /<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u.exec(
    content
  );

  if (!jsBlock) return "";

  const jsLang = jsBlock[3] || "js";
  const code = jsBlock[4] || "";
  return `<script lang="${jsLang}">${code}</script>`;
}

function getVueStyle(content = "", componentNameId) {
  const cssBlock = /<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u.exec(
    content
  );

  if (!cssBlock) return "";

  const cssLang = cssBlock[3] || "css";
  const code = scopedCss(cssBlock[4], componentNameId, cssLang);
  return `<style lang="${cssLang}">${code}</style>`;
}

function getVueTemplate(content, componentNameId) {
  // 模板中可能不存在 template，这里采用去除其他代码块的方式
  const htmlBlock = content.replace(/<(script|style)[\s\S]+<\/\1>/g, "").trim();
  return (
    htmlBlock &&
    `
      <template>
        <div class="block-container ${componentNameId}">
          ${htmlBlock}
        </div>
      </template>
    `
  );
}

/**
 * 格式化 Vue 组件模板
 * @param {object} cacheTemplate
 * @param {string} componentNameId
 * @returns
 */
exports.parse = function(cacheTemplate = {}, componentNameId) {
  const vueTemplate = cacheTemplate[componentNameId];
  const html = getVueTemplate(vueTemplate, componentNameId);
  const js = getVueScript(vueTemplate);
  const css = getVueStyle(vueTemplate, componentNameId);

  return [html, js, css].join("\n");
};
