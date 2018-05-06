<template>
  <div id="blog-home" class="home">    
    <div class="container-fluid">
      <div class="row">
        <!-- featured posts -->
        <div class="col-md-8">
          <div class="category__posts-title-wrap">
            <span class="category__posts-title">Featured for you</span>
            <span class="category__posts-more"><router-link to="/posts">More<icon name="chevron-right"></icon></router-link></span>
          </div>

          <button @click="getPosts">getPosts</button>

          <div 
            v-for="(post,index) in posts" 
            :key="post.slug + '_' + index"
            class="featured"
            >
            <router-link 
              :to="`/category/${post.categories[0].slug}/${post.slug}`"
              class="featured__wrap"
              >
              <div class="featured__left">
                <div class="featured__left-top">
                  <h2 class="featured__title">{{ post.title }}</h2>
                  <p class="featured__text">{{ post.summary }}</p>
                </div>
                <span class="featured__text-bottom">
                  <div class="featured__text-bottom-category">
                    <!-- <span>{{post.categories[0].name}}</span> -->
                  </div>
                  <div class="featured__text-bottom-date">
                    <span>{{post.published | moment("calendar")}}</span><icon name="star"></icon>
                    <span>{{read_time(post.body)}}</span>
                  </div>
                </span>
              </div>
              <div class="featured__image">
                <img v-if="post.featured_image" :src="post.featured_image" alt="">
                <img v-else src="http://via.placeholder.com/250x250" alt="">
              </div>
            </router-link>
          </div>
          <div class="featured__footer">
            <span class="category__posts-more"><router-link to="/posts">See all posts<icon name="chevron-right"></icon></router-link></span>
          </div>
        </div> <!-- end of featured posts -->
        <!-- right sidebar -->
        <div class="col-md-4">
          <fixed-header 
              :fixed.sync="isFixed"
              :threshold="60"
              >
              <div class="sidebar"
                :class="{ 'sidebar--fixed': isFixed }"
                >
                <div class="sidebar__title-wrap">
                  <span class="sidebar__title">
                    Popular
                  </span>
                </div>
                <div class="sidebar__content">
                  content
                </div>
              </div>
          </fixed-header>
        </div> <!-- end of right sidebar -->
      </div> 
    </div>
  </div>
</template>


<script>
  import { butter } from '@/buttercms';
  import store from '@/store';
  import { mapMutations, mapActions } from 'vuex'

  import FixedHeader from 'vue-fixed-header';
  import HeaderComponent from '@/components/partials/HeaderComponent.vue';

  export default {
    name: 'blog-home',
    components: {
      FixedHeader,
      HeaderComponent
    },
    data() {
      return {
        page_title: 'Featured',
        isFixed: false
      }
    },
    methods: {
      // ...mapMutations([
      //   'getPosts'
      // ]),
      // ...mapActions([
      //   'getPosts'
      // ]),
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
