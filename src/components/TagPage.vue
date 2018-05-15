<template>
  <div class="tag">
    
    <category-title-component
        :pageTitle="`${$route.params.tag} Tag`"
        pageSubtitle="there is go!"
    >
    </category-title-component>

    <div class="container">
      <div class="row">
        <div 
            v-for="(post, index) in posts"
            :key="`${post.title}_${index}_outer`"
            class="featured"
            >
            <div 
                v-for="(tag, index) in post.tags"
                :key="`${tag.name}_${index}`"
                class="col-md-12"
                ref="tagList"
              >
              <div v-if="tag.name.match(routeTag)">
                
                <router-link 
                    :to="`/category/${post.categories[0].slug}/${post.slug}`"
                    class="featured__wrap"
                  >
                  <div class="featured__left">
                    <div class="featured__left-top">
                      <h2 class="featured__title">{{ post.title }}</h2>
                      <p class="featured__text">{{ post.summary }}</p>
                    </div>
                    <div class="featured__text-bottom">
                      <div class="featured__text-bottom-category">
                        <span>{{post.categories[0].name}}</span>
                      </div>
                      <div class="featured__text-bottom-date">
                        <span>{{post.published | moment("calendar")}}</span><icon name="star"></icon>
                        <span>{{readTime(post.body)}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="featured__image">
                    <img v-if="post.featured_image" :src="post.featured_image" alt="">
                    <img v-else src="http://via.placeholder.com/250x250" alt="">
                  </div>
                </router-link>

              </div>
            </div>
          </div>
      </div>
    </div>
    
  </div>
</template>


<script>
  import { butter } from '@/buttercms';
  import store from '@/store';
  import { mapMutations, mapActions } from 'vuex';
  import CategoryTitleComponent from './partials/CategoryTitleComponent';
  import CategoryPostItem from './partials/CategoryPostItem';
  import { EventBus } from '@/event-bus';
  import readTimeMixin from '@/mixins/readTimeMixin';

  export default {
    name: 'vue-js-category',
    components: {
      CategoryTitleComponent,
      CategoryPostItem
    },
    mixins: [readTimeMixin],
    data() {
      return {
        
      }
    },
    methods: {
      getTags() {
        store.commit('getTags');
      },
      getPosts(pageNumber, postsAmount) {
        store.commit('getPosts', {
          numberOfPage: pageNumber,
          postsOnPage: postsAmount
        });
      }
    },
    computed: {
      tags() {
        return store.state.tags;
      },
      posts() {
        return store.state.posts;
      },
      routeTag() {
        return this.$route.params.tag;
      },
      postInPosts() {
        return store.state.posts.map((post) => {
          return post.tags;
        })
      }
    },
    mounted() {
      this.getTags();
      this.getPosts(1, 10);
    }
  }
</script>

<style lang="scss" scoped>

</style>
