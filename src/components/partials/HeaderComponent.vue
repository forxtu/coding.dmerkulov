<template>
  <header class="header-wrapper" ref="header">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="header">
            <div class="header__top">
              <a href="#">Subscribe</a>
              <div class="header__top-logo">
                <router-link to='/'>coding.dmerkulov</router-link>
              </div>
              <div class="header__top-right">
                <autocomplete-component
                  :items="titleInPost"
                >
                </autocomplete-component>
              </div>
            </div>
            <div v-if="isFixed" class="header__nav--fixed-placeholder"></div>
            <fixed-header 
              :fixed.sync="isFixed"
              :threshold="60"
              >
              <div :class="{ 'header__nav--fixed': isFixed }">
                <div class="header__nav">
                  <router-link to='/' exact>Home</router-link>
                  <router-link
                    v-for="(category, index) in categories"
                    :key="category.slug + '_' + index"
                    :to='`/${categories[index].slug}`'
                    exact
                    >
                    {{categories[index].name}}
                  </router-link>
                </div>
              </div>
            </fixed-header>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { butter } from '@/buttercms';
  import store from '@/store';
  import { mapMutations } from 'vuex';
  import FixedHeader from 'vue-fixed-header';
  import AutocompleteComponent from './AutocompleteComponent';
  export default {
    name: 'header-component',
    data() {
      return {
        isFixed: false
      }
    },
    props: {
      titleInPost: {
        type: Array,
        default: []
      }
    },
    components: {
      FixedHeader,
      AutocompleteComponent
    },
    methods: {
      ...mapMutations([
        'getCategories'
      ])
    },
    computed: {
      categories() {
        return store.state.categories
      }
    },
    mounted() {
      this.getCategories();
    }
  }
</script>

<style lang="scss">
@import '../../scss/main';
</style>
