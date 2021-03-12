import Vue from 'vue'
import Router from 'vue-router'
import UseWheel from '@/views/useWheel/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/useWheel',
      name: 'useWheel',
      component: UseWheel
    }
  ]
})
