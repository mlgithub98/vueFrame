import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import page404 from '@/components/404'
import login from '@/components/login/login'
import filtersExample from '@/components/filtersExample'
import refresh from '@/components/refresh'

import ClosedTest from '@/views/ClosedTest/ClosedTest'
import editModel from '@/components/editModel/editModel'

// 表格
import tabledemo from '@/components/tabledemo/tabledemo'
import formModel from '@/components/formModel/formModel'
import checkPhoto from '@/components/checkPhoto/checkPhoto'
import chartDemoM from '@/views/chartDemoM/chartDemoM'

import breadDemo from '@/views/breadDemo/breadDemo'
import breadHome from '@/views/breadDemo/breadHome'
import breadOne from '@/views/breadDemo/breadOne'
import breadTwo from '@/views/breadDemo/breadTwo'
import breadThree from '@/views/breadDemo/breadThree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect: '/Disconnected',
      component: home,
      children:[
        {
          path: '/filtersExample',
          name: 'filtersExample',
          component: filtersExample,
        },
        {
          path: '/login',
          name: 'login',
          component: login,
        },
        {
          path: '/404',
          name: 'page404',
          component: page404,
        },
        {
          path: '/tabledemo',
          name: 'tabledemo',
          component: tabledemo,
        },
        {
          path: '/formModel',
          name: 'formModel',
          component: formModel,
        },
        // {
        //   path: '/editModel',
        //   name: 'editModel',
        //   component: editModel,
        // },
        {
          path: '/ClosedTest',
          name: 'ClosedTest',
          component: ClosedTest,
        },
        {
          path: '/checkPhoto',
          name: 'checkPhoto',
          component: checkPhoto,
        },
        {
          path: '/chartDemoM',
          name: 'chartDemoM',
          component: chartDemoM,
        },
        {
          path: '/breadDemo',
          name: 'breadDemo',
          component: breadDemo,
          children:[
            {
              path: '/breadDemo',
              name: 'breadHome',
              component: breadHome,
              children:[
                {
                  path: '/breadDemo/breadOne',
                  name: 'breadOne',
                  component: breadOne,
                  children:[
                    {
                      path: '/breadDemo/breadOne/breadTwo',
                      name: 'breadTwo',
                      component: breadTwo,
                      children:[
                        {
                          path: '/breadDemo/breadOne/breadTwo/breadThree',
                          name: 'breadThree',
                          component: breadThree,
                        },
                      ]
                    },
                  ]
                }
              ]
            },
          ]
        },
      ]
    },





    {
      path: '/refresh',
      name: 'refresh',
      component: refresh,
    },
    {
      path: '*',
      name: '404',
      component: page404,
    },

  ]
})

