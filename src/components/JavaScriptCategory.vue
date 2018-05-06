<template>
  <div class="category">
    
    <category-title-component
        pageTitle="JavaScript"
        pageSubtitle="is not that hard"
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

    <category-post-item
        categoryName="java-script"
    >
    </category-post-item>

  </div>
</template>


<script>
  import { butter } from '@/buttercms';
  import store from '@/store';
  import { mapMutations, mapActions } from 'vuex';
  import CategoryTitleComponent from './partials/CategoryTitleComponent';
  import CategoryPostItem from './partials/CategoryPostItem';
  import { EventBus } from '@/event-bus';
  export default {
    name: 'java-script-category',
    components: {
      CategoryTitleComponent,
      CategoryPostItem
    },
    data() {
      return {
        page_title: 'Java Script',
      }
    },
    methods: {
      // ...mapMutations([
      //   'getCategories',
      //   'getTags',
      //   'getPostsByCategory'
      // ]),
      // getPostsByCategory() {
      //   store.commit('getPostsByCategory', 'java-script');
      // }
    },
    computed: {
      // categoryPosts() {
      //   return store.state.categoryPosts;
      // }
    },
    mounted() {
      // this.getCategories();
      // this.getPostsByCategory();
      // this.getTags();
    }
  }
</script>

<style lang="scss" scoped>

</style>
