import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 导入全局样式
import Css from './main.css'
Vue.use(Css)

// 导入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入Echarts
import VueECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/visualMap'
Vue.component('v-chart',VueECharts)

// 导入Axios
import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,Axios)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
