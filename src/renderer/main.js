import Vue from 'vue'
import 'uikit/dist/css/uikit.min.css'

import App from './App'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

// loads the Icon plugin
UIkit.use(Icons)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
