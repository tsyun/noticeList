import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexPage from '@/components/IndexPage'
import LoginPage from '@/components/LoginPage'

import MovieIndexPage from '@/components/MovieIndexPage'
import MovieShowPage from '@/components/MovieShowPage'

import Notice from '@/components/Notice'
import WritingNotice from '@/components/WritingNotice'
import DataTable from '@/components/DataTable'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index-page',
      component: IndexPage
    },
    {
      path: '/loginPage',
      name: 'login-page',
      component: LoginPage
    },
    {
      path: '/movie',
      name: 'movie-page',
      component: MovieIndexPage
    },
    {
      path: '/movie/:id',
      name: 'movie-show-page',
      component: MovieShowPage
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice,
    },
    {
      path: '/notice/writing',
      name: 'noticeWriting',
      component: WritingNotice,
      props: true
    },
    {
      path: '/dataTable',
      name: 'dataTable',
      component: DataTable
    }
  ]
})
