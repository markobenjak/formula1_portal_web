import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/MainPage.vue'
import Archive from './components/Archive.vue'
import UserManagement from './components/UserManagement.vue'
import Forum from './components/Forum.vue'
import Blog from './components/Blog.vue'

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
    {
      path: '/userManagement',
      name: 'UserManagement',
      component: UserManagement
    },
    {
      path: '/forum',
      name: 'Forum',
      component: Forum
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
  ]
})

