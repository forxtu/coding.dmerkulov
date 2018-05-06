<template>
  <div class="autocomplete">
    <div class="autocomplete__input">
      <!-- <icon name="search"></icon> -->
      <input 
          type="text" 
          @input="onChange" 
          v-model="search" 
          @keyup.down="onArrowDown" 
          @keyup.up="onArrowUp" 
          @keyup.enter="onEnter"
          placeholder="Search"
          ref="autocompleteInput"
          class="search__input-field search--underlined"
      />
    </div>
    <ul 
        id="autocomplete-results" 
        v-show="isOpen" 
        class="autocomplete-results"
      >
      <span class="autocomplete__search-text">
        <icon name="search"></icon>
        Search for 
        <span class="autocomplete__search-text-result">{{search}}</span>
        <!-- <span class="autocomplete__search-text-result">{{search.substr(0, 10)}}</span> -->
        <!-- <span v-if="search.length > 10">...</span> -->
      </span>
      <span class="autocomplete__search-subtitle">Titles</span>
      <!-- <li class="loading" v-if="isLoading">
        Loading results...
      </li> -->
      <li 
          v-for="(result, index) in results" 
          :key="result.slug + '_title_' + index"
          @click="setResult(result)" 
          class="autocomplete-result" 
          :class="{ 'is-active': index === arrowCounter }"
        >
        {{ result }}
      </li>
      <span class="autocomplete__search-subtitle">Categories</span>
      <li 
          v-for="(category, index) in resultsCategories" 
          :key="category.slug + '_category_' + index"
          @click="goToCategory(category.slug)" 
          class="autocomplete-result" 
          :class="{ 'is-active': index === arrowCounter }"
        >
        {{ category.name }}
      </li>
      <span class="autocomplete__search-subtitle">Tags</span>
      <li 
          v-for="(tag, index) in resultsTags" 
          :key="tag.slug + '_tag_' + index"
          @click="goToTag(tag.slug)" 
          class="autocomplete-result" 
          :class="{ 'is-active': index === arrowCounter }"
        >
        {{ tag.name }}
      </li>
      <div class="autocomplete__popover-arrow"></div>
    </ul>
  </div>
</template>


<script>
  import store from '@/store';
  import { mapMutations } from 'vuex';
  import router from '@/router';
  
  export default {
    name: "autocomplete-component",
    props: {
        items: {
          type: Array,
          required: false,
          default: () => []
        },
        // itemsCategories: {
        //   type: Array,
        //   required: false,
        //   default: () => []
        // },
        isAsync: {
          type: Boolean,
          required: false,
          default: false,
        }
    },

    data() {
        return {
          isOpen: false,
          results: [],
          resultsCategories: [],
          resultsTags: [],
          search: "",
          isLoading: false,
          arrowCounter: 0
        };
    },

    methods: {
        ...mapMutations([
          'getSearchResult',
          'getCategories',
          'getTags'
        ]),
        onChange() {
          // Let's warn the parent that a change was made
          this.$emit("input", this.search);

          // Is the data given by an outside ajax request?
          if (this.isAsync) {
              this.isLoading = true;
          } else {
              // Let's search our flat array
              this.filterResults();
              this.isOpen = true;
          }

          this.search == "" ? this.isOpen = false : this.isOpen = true;

          if(this.$route.path == '/search-results') {
            setTimeout(() => {
              this.setUpdatedSearchResult();
            }, 600);
          }
        },

        filterResults() {
          // first uncapitalize all the things
          this.results = this.items.filter(item => {
              return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
          });
          this.resultsCategories = store.state.categories.filter(item => {
              return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
          });
          this.resultsTags = store.state.tags.filter(item => {
              return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
          });
        },
        setResult(result) {
          this.search = result;
          this.isOpen = false;

          this.setUpdatedSearchResult();
        },
        onArrowDown(evt) {
          if (this.arrowCounter < this.results.length) {
              this.arrowCounter = this.arrowCounter + 1;
          }
        },
        onArrowUp() {
          if (this.arrowCounter > 0) {
              this.arrowCounter = this.arrowCounter - 1;
          }
        },
        onEnter() {
          // this.search = this.results[this.arrowCounter];
          this.isOpen = false;
          this.arrowCounter = -1;

          // console.log(store.state.searchResult);
          this.setUpdatedSearchResult();
        },
        handleClickOutside(evt) {
          if (!this.$el.contains(evt.target)) {
              this.isOpen = false;
              this.arrowCounter = -1;
          }
        },
        setUpdatedSearchResult() {
          this.getSearchResult(this.search);
          this.$bus.$emit('updateSearchResults');
          router.push({ path: '/search-results'})
        },
        goToCategory(path) {
          router.push({path: `/category/${path}`});
          this.isOpen = false;
        },
        goToTag(path) {
          router.push({path: `/tag/${path}`});
          this.isOpen = false;
        }
    },
    computed: {
      searchResult() {
        return store.state.searchResult;
      },
      categories() {
        return store.state.categories;
      },
      tags() {
        return store.state.tags;
      }
    },
    watch: {
      items: function(val, oldValue) {
        // actually compare them
        if (val.length !== oldValue.length) {
            this.results = val;
            this.isLoading = false;
        }
      }
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
        this.getCategories();
        this.getTags();
    },
    destroyed() {
        document.removeEventListener("click", this.handleClickOutside);
    }
  }
</script>

<style lang="scss" scoped>
@import '../../scss/main';
@import '../../scss/partials/autocomplete';
</style>