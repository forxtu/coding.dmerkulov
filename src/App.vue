<template>
  <div id="app" class="app-wrapper">
    <header-component
      :titleInPost="titleInPost"
      >
    </header-component>
    <div class="app-content">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import store from '@/store';
import { mapMutations } from 'vuex';
import HeaderComponent from '@/components/partials/HeaderComponent.vue';
import FooterComponent from '@/components/partials/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  },
  methods: {
    ...mapMutations([
      'getPosts',
      'getCategories',
      'getTags'
    ]),
    // getPosts() {
    //   store.commit('getPosts');
    // }
  },
  computed: {
    posts() {
        return store.state.posts;
      },
    titleInPost() {
      return store.state.titleInPost;
    },
    nameOfCategory() {
      return store.state.nameOfCategory;
    },
    nameOfTag() {
      return store.state.nameOfTag;
    },
    tags() {
      return store.state.tags;
    }
  },
  mounted() {
    this.getPosts();
    this.getCategories();
    this.getTags();
  }
}
</script>

<style lang="scss">
@import './scss/main.scss';
</style>
