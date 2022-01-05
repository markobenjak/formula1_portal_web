import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/MainPage.vue'
import Archive from './components/Archive.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive
    },
  ]
})

