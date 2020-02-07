import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'

import StartPage from './components/pages/StartPage.vue'
import GamePage from './components/pages/GamePage.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'startPage',
      component: StartPage
    },
    {
      path: '/play',
      name: 'QuickSpeech',
      component: GamePage
    },
  ]
})

Vue.use(VueAnalytics, {
  id: 'UA-99011528-8',
  router,
  checkDuplicatedScript: true
})

Vue.config.productionTip = true
Vue.use(VueRouter)
new Vue({
  render: h => h(App),  
  router,
}).$mount('#app')
