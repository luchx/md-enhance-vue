<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <testJson />
  </div>
</template>

<script>
import testJson from "./docs/test2.md";

export default {
  name: 'App',
  components: {
    testJson
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
