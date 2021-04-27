import Vue from 'vue'
import App from './App.vue'
import DemoBlock from "./components/demo-block";

Vue.component('demo-block', DemoBlock);

new Vue({
  render: h => h(App),
}).$mount('#app')
