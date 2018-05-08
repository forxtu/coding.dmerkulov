import Vue from 'vue'
import Vuex from 'vuex'
import { butter } from '@/buttercms';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    postsInArray: [],
    titleInPost: [],
    searchResult: '',
    categories: [],
    nameOfCategory: [],
    tags: [],
    nameOfTag: [],
    categoryPosts: []
  },
  mutations: {
    getPosts(state, numberOfPage, postsOnPage) {
      butter.post.list({
        page: numberOfPage,
        page_size: postsOnPage
      }).then((res) => {
        // console.log(res.data)
        state.posts = res.data.data;
        state.postsInArray = state.posts.map((postsInArrayItem) => {
          return postsInArrayItem;
        })
        state.titleInPost = state.postsInArray.map((title) => {
          return title.title;
        });
      })
    },
    getSearchResult(state, result) {
      return state.searchResult = result;
    },
    getCategories(state) {
      butter.category.list()
        .then((res) => {
          // console.log('List of Categories:')
          // console.log(res.data.data)
          state.categories = res.data.data;
          state.nameOfCategory = state.categories.map((name) => {
            return name.name;
          });
        })
    },
    getTags(state) {
      butter.tag.list()
        .then((res) => {
          // console.log('List of Tags:')
          // console.log(res.data.data)
          state.tags = res.data.data;
          state.nameOfTag = state.tags.map((name) => {
            return name.name;
          });
        })
    },
    getPostsByCategory(state, category) {
      butter.category.retrieve(category, {
          include: 'recent_posts'
        })
        .then((res) => {
          state.categoryPosts = res.data.data;
        })
    }
  },
  actions: {
    // getPosts(context) {
    //   context.commit('getPosts')
    // }
    getPostsByCategory({ commit }) {
        commit('getPostsByCategory')
    }
  }
})