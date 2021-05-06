# 测试标题

我是一段文字

:::demo

```vue
<template>
  <div>
    测试 md 内置组件1
  </div>
</template>
<script>
export default {

};
</script>
```

:::

:::demo

```vue
<template>
  <div>
    测试 md 内置组件2
  </div>
</template>
<script>
export default {

};
</script>
```

:::

:::demo

```vue
<template>
  <div>
    测试 md 内置组件 --- <span class="text">{{ data.msg }}</span>
  </div>
</template>

<script>
import data from "./data.json";
console.log("data ======> ", data)

export default {
  data() {
    return {
      data
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
