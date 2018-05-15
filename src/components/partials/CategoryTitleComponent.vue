<template>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="category__title-block">
            <div class="category__title-left">
              <h1 class="category__title-main">{{pageTitle | uppercase | remove-dashes}}</h1>
              <p class="category__title-subtitle">{{pageSubtitle}}</p>
            </div>
            <slot name="pageRight"></slot>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="category__posts-title-wrap">
            <span class="category__posts-title">For you</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { butter } from '@/buttercms';
  export default {
    name: 'category-title-component',
    data() {
      return {

      }
    },
    props: {
      pageTitle: {
        type: String,
        required: false
      },
      pageSubtitle: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../scss/main';
</style>
