<template>
  <div id="blog-all-posts" class="posts">    
    <category-title-component
        pageTitle="All featured posts"
        pageSubtitle="check it out!"
      >
    </category-title-component>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="all-posts__navigation">
            <a 
                v-if="postsMeta.previous_page !== null"
                href="#" 
                @click.prevent="getPosts(postsMeta.previous_page, 6)"
                class="all-posts__navigation-prev"
              >
              <icon name="chevron-left"></icon>
            </a>
            <span 
                v-else
                class="all-posts__navigation-placeholder"
              >
              #first
            </span>
            <a 
                v-if="postsMeta.next_page !== null"
                href="#" 
                @click.prevent="getPosts(postsMeta.next_page, 6)"
                class="all-posts__navigation-next"
              >
              <icon name="chevron-right"></icon>
            </a>
            <span 
                v-else
                class="all-posts__navigation-placeholder"
              >
              #last
            </span>
          </div>
        </div>
      </div>
    </div>

    

    <div class="container">
      <div class="row">
          <div 
              v-for="(post, index) in posts" 
              :key="post.slug + '_' + index"
              class="category__post col-xs-12 col-sm-12 col-md-6"
            >
            <router-link :to="`/category/${post.categories[0].slug}/${post.slug}`">
              <article class="category__article">
                <div class="category__image">
                  <img v-if="post.featured_image" :src="post.featured_image" alt="">
                  <img v-else src="http://via.placeholder.com/250x250" alt="">
                </div>
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
  import { mapMutations, mapActions } from 'vuex';
  import readTimeMixin from '@/mixins/readTimeMixin';

  import CategoryTitleComponent from './partials/CategoryTitleComponent';

  export default {
    name: 'blog-home',
    components: {
      CategoryTitleComponent
    },
    mixins: [readTimeMixin],
    data() {
      return {
        page_title: 'Featured',
        isFixed: false
      }
    },
    methods: {
      getPosts(pageNumber, postsAmount) {
        store.commit('getPosts', {
          numberOfPage: pageNumber,
          postsOnPage: postsAmount
        });
      }
    },
    computed: {
      posts() {
        return store.state.posts;
      },
      postsMeta() {
        return store.state.postsMeta;
      }
    },
    mounted() {
      this.getPosts(1, 6);
    }
  }
</script>

<style lang="scss" scoped>

</style>
