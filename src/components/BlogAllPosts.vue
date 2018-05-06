<template>
  <div id="blog-all-posts" class="posts">    
    <category-title-component
        pageTitle="All featured posts"
        pageSubtitle="check it out!"
      >
    </category-title-component>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="category__posts-title-wrap">
            <span class="category__posts-title">For you</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
          <div 
              v-for="(post, index) in posts" 
              :key="post.slug + '_' + index"
              class="category__post col-xs-12 col-sm-12 col-md-6"
            >
            <router-link :to="`/category/${post.categories[0].slug}/${post.slug}`">
              <article class="category__article">
                <figure class="category__image">
                  <img v-if="post.featured_image" :src="post.featured_image" alt="">
                  <img v-else src="http://via.placeholder.com/250x250" alt="">
                </figure>
                <div class="category__copy">
                  <h2 class="category__copy-title">{{ post.title }}</h2>
                  <p class="category__copy-text">{{ post.summary }}</p>
                  <span class="category__copy-bottom">
                    {{post.categories[0].name}}
                  </span>
                </div>
              </article>
            </router-link>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { butter } from '@/buttercms';
  import store from '@/store';
  import { mapMutations, mapActions } from 'vuex'

  import CategoryTitleComponent from './partials/CategoryTitleComponent';

  export default {
    name: 'blog-home',
    components: {
      CategoryTitleComponent
    },
    data() {
      return {
        page_title: 'Featured',
        isFixed: false
      }
    },
    methods: {
      getPosts() {
        store.commit('getPosts', 1, 5);
      },
      read_time(text){
        var minutes = Math.floor(text.split(' ').length / 130 )
        if(minutes === 0) minutes = 1
        return minutes + ' min read'
      }
    },
    computed: {
      posts() {
        return store.state.posts
      }
    },
    mounted() {
      this.getPosts();
    }
  }
</script>

<style lang="scss" scoped>

</style>
