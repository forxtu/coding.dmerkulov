<template>
  <div class="search-wrapper">

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="search__title-block">
            <h1 
                class="search__title-main" 
            >
                Search 
                <span 
                    v-if="this.$store.state.searchResult.length > 0"
                    class="search__title-main"
                >
                    for '<span class="search__title-main search--highlighted">{{this.$store.state.searchResult}}</span>'
                </span>
            </h1>
            <!-- <input 
                type="text" 
                name=""
                :value="this.$store.state.searchResult"
                class="search__title-input search--underlined"
                placeholder="Search"
                ref="searchInput"
            > -->
            <!-- <p 
                v-if="this.$store.state.searchResult.length > 0"
                class="search__title-subtitle">here you go</p> -->
          </div>
        </div>
      </div>
    </div>

    <div 
        class="container-fluid"
        v-if="this.searchSuccess"
    >
      <div class="row">
        <div 
            v-for="(searchPost, index) in searchResults" 
            :key="searchPost.slug + '_' + index"
            class="category__post col-xs-12 col-sm-12 col-md-6"
            >
            <router-link :to="`/category/${searchPost.categories[0].slug}/${searchPost.slug}`">
              <article class="category__article">
                <figure class="category__image">
                  <img v-if="searchPost.featured_image" :src="searchPost.featured_image" alt="">
                  <img v-else src="http://via.placeholder.com/250x250" alt="">
                </figure>
                <div class="category__copy">
                  <h2 class="category__copy-title">{{ searchPost.title }}</h2>
                  <p class="category__copy-text">{{ searchPost.summary }}</p>
                  <span class="category__copy-bottom">
                    {{searchPost.categories[0].name}}
                  </span>
                </div>
              </article>
            </router-link>
          </div>
      </div>
    </div>
    <!-- if 0 chars in search field -->
    <div 
      class="container-fluid"
      v-else-if="this.$store.state.searchResult.length <= 0"
    >
      <div class="row">
        <div class="col-md-12">
          <h3>Please type something in search field</h3>
        </div>
      </div>
    </div>
    <!-- if no search items --> 
    <div 
      class="container-fluid"
      v-else
    >
      <div class="row">
        <div class="col-md-12">
          <h3>Please type something more specific</h3>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { butter } from '@/buttercms';
  import store from '@/store';
  import { mapMutations } from 'vuex';

  import { EventBus } from '@/event-bus';
  
  import CategoryTitleComponent from './partials/CategoryTitleComponent';
  
  export default {
    name: 'search-results',
    components: {
        CategoryTitleComponent
    },
    data() {
      return {
        searchResults: [],
        searchSuccess: []
      }
    },
    methods: {
      getSearchResults() {
        butter.post.search(this.$store.state.searchResult)
        .then((resp) => {
          console.log(resp.data)
          this.searchResults = resp.data.data;
          // show message if no posts
          this.searchResults.length > 0 ? this.searchSuccess = true : this.searchSuccess = false;
        }).catch((resp) => {
          console.log(resp)
        });
      },
      ...mapMutations([
        'getPosts',
        'getCategories',
        'getTags',
      ])
    },
    computed: {
      count() {
        return store.state.count
      },
      posts() {
        return store.state.posts
      },
      searchResult() {
        return store.state.searchResult
      },
      categories() {
        return store.state.categories
      },
      tags() {
        return store.state.tags
      },
    },
    mounted() {
      this.getSearchResults();
      this.getPosts();
      this.getCategories();
      this.getTags();
      this.$bus.$on('updateSearchResults', ($event) => {
        this.getSearchResults();
      })
    }
  }
</script>

<style lang="scss" scoped>
@import '../scss/main';
</style>
