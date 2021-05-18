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
