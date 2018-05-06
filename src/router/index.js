import Vue from 'vue'
import Router from 'vue-router'
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'
import BlogAllPosts from '@/components/BlogAllPosts'
import SearchResults from '@/components/SearchResults'
import JavaScriptCategory from '@/components/JavaScriptCategory'
import VueJsCategory from '@/components/VueJsCategory'
import Category from '@/components/Category'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'blog-home',
      component: BlogHome,
      props: true
    },
    {
      path: '/category/:category/',
      // redirect: { name: 'blog-home' },
      name: 'category',
      component: Category,
      children: [
        // {
        //   path: ':slug',
        //   name: 'blog-post',
        //   component: BlogPost,
        //   props: true
        // },
      ]
    },
    {
      path: '/category/:category/:slug',
      name: 'blog-post',
      component: BlogPost,
      props: true
    },
    // {
    //   path: '/java-script/',
    //   name: 'java-script-category',
    //   component: JavaScriptCategory,
    //   props: true
    // },
    // {
    //   path: '/vuejs/',
    //   name: 'vue-js-category',
    //   component: VueJsCategory,
    //   props: true
    // },
    {
      path: '/search-results/',
      name: 'search-results',
      component: SearchResults,
      props: true
    },
    {
      path: '/posts/',
      name: 'blog-all-posts',
      component: BlogAllPosts,
      props: true
    }
  ]
})
