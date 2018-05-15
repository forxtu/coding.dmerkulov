<template>
  <div class="container">
    <div class="row">
      <div 
          v-for="(categoryPost, index) in this.$store.state.categoryPosts.recent_posts" 
          :key="categoryPost.slug + '_' + index"
          class="category__post col-xs-12 col-sm-12 col-md-6"
        >
        <router-link 
            :to="`/category/${categoryPost.categories[0].slug}/${categoryPost.slug}`"
          >
          <article class="category__article">
          <figure class="category__image">
              <img 
                  v-if="categoryPost.featured_image" 
                  :src="categoryPost.featured_image" alt=""
                >
              <img 
                  v-else 
                  src="http://via.placeholder.com/250x250" 
                  alt=""
                >
          </figure>
          <div class="category__content">
            <div class="category__copy">
              <h2 class="category__copy-title">{{ categoryPost.title }}</h2>
              <p class="category__copy-text">{{ categoryPost.summary }}</p>
            </div>
            <div class="category__bottom">
              <span>{{categoryPost.published | moment("calendar")}}</span><icon name="star"></icon>
              <span>{{readTime(categoryPost.body)}}</span>
            </div>
          </div>
          </article>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
  import { butter } from '@/buttercms';
  import store from '@/store';
  import { mapMutations, mapActions } from 'vuex';
  import { EventBus } from '@/event-bus';
  import readTimeMixin from '@/mixins/readTimeMixin';
  export default {
    name: 'category-post-item',
    props: {
      categoryName: {
        type: String,
        default: ''
      }
    },
    mixins: [readTimeMixin],
    methods: {
      getPostsByCategory(category) {
        store.commit('getPostsByCategory', category);
      }
    },
    computed: {
      categoryPosts() {
        return store.state.categoryPosts;
      }
    },
    watch: {
      '$route': function(from, to) {
        this.getPostsByCategory(this.categoryName);
      }
    },
    mounted() {
      this.getPostsByCategory(this.categoryName);
    }
  }
</script>

<style lang="scss" scoped>

</style>
