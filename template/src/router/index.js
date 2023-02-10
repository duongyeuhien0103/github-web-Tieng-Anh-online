import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from '@/components/login/login.vue'
import list from '@/components/list'
import task from '@/components/task'
import Question from '@/components/question'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    {
      path: '/question/:id',
      name: 'question',
      component: Question
    },
    {
      path: '/',
      name: 'list',
      component: list,
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: task
        }
      ]
    },
    {
      // not found handler
      path: '*',
      component: task
    }
  ]
})
