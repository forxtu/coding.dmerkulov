import Vue from 'vue'
import Router from 'vue-router'
import BlogHome from '@/components/BlogHome'
import BlogPost from '@/components/BlogPost'
import BlogAllPosts from '@/components/BlogAllPosts'
import JavaScriptCategory from '@/components/JavaScriptCategory'
import SearchResults from '@/components/SearchResults'

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
    // {
    //   path: '/blog/',
    //   name: 'blog-home',
    //   component: BlogHome
    // },
    {
      path: '/:category/:slug',
      name: 'blog-post',
      component: BlogPost,
      props: true
    },
    {
      path: '/java-script/',
      name: 'java-script-category',
      component: JavaScriptCategory,
      props: true
    },
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
