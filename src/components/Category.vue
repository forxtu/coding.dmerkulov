<template>
  <div class="category">
    <category-title-component
        :pageTitle="$route.params.category"
        pageSubtitle="is fun"
    >
    </category-title-component>
    <category-post-item
        :categoryName="$route.params.category"
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

    },
    computed: {

    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>

</style>
