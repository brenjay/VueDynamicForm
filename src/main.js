// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import App from "./App";
import Vue from "vue";
import Multiselect from "vue-multiselect";
import DynamicForm from "./components/DynamicForm.vue";
import "./main.css";

Vue.component("multiselect", Multiselect);
Vue.component("dynamicform", DynamicForm);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { DynamicForm },
  data() {
    return {};
  }
}).$mount("#app");
