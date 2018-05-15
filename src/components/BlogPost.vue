<template>
  <div class="container">
    <div class="row post__hero">
      <div class="col-sm-6 col-md-6 post__hero-left">
        <div class="post__hero-top">
          <h3
              v-for="(category, index) in post.data.categories"
              :key="`${category.name}_${index}`"
              class="post__hero-category"
            >
              {{category.name}}
          </h3>
          <div class="post__hero-tags">
            <span
                v-for="(tag, index) in post.data.tags"
                :key="`${tag.name}_${index}`"
                class="post__hero-tags-item"
              >
              <icon name="tag"></icon> {{tag.name}}
            </span>
          </div>
          <h1 class="post__hero-title">{{post.data.title}}</h1>
          <p class="post__hero-summary">{{post.data.summary}}</p>
        </div>
        <div class="post__hero-bottom">
          <div class="post__hero-bottom-author">
            <img :src="post.data.author.profile_image" alt="">
            <span>
              {{post.data.author.first_name}}
              {{post.data.author.last_name}}
            </span>
            <!-- <a :href="post.data.author.facebook_url"><icon name="tag"></icon>facebook</a> -->
            <div class="post__hero-bottom-date">
              <span>{{post.data.published | moment("calendar")}}</span><icon name="star"></icon>
              <span>{{read_time(post.data.body)}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-6">
        <div class="post__hero-image">
          <img :src="post.data.featured_image" alt="">
        </div>
      </div>
    </div>

    <div class="row">
      <!-- left menu -->
      <div class="col-xs-2 col-sm-2">
        <social-sharing 
            url="https://vuejs.org/"
            title="The Progressive JavaScript Framework"
            description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
            quote="Vue is a progressive framework for building user interfaces."
            hashtags="vuejs,javascript,framework"
            twitter-user="vuejs"
            inline-template
          >
          <div>
            <network network="facebook">
              Facebook
            </network>
            <network network="twitter">
              Twitter
            </network>
          </div>
        </social-sharing>
      </div>
      <div class="col-xs-8 col-sm-8">
        <!-- post body -->
        <p 
            v-html="post.data.body"
            class="post__main"
          >
        </p>
        <!-- post bottom -->
        <div class="post__bottom">
          <div class="post__bottom-links">
            <div class="post__bottom-links-left">
              <router-link 
                  v-if="post.meta.previous_post" 
                  :to="`/category/${post.data.categories[0].slug}/${post.meta.previous_post.slug}`" 
                  class="post__bottom-links"
                >
                {{ post.meta.previous_post.title }}
              </router-link>
              <span 
                  class="post__bottom-links-no-post"
                  v-else
                >
                You are reading first post
              </span>
            </div>
            <div class="post__bottom-links-right">
              <router-link 
                  v-if="post.meta.next_post" 
                  :to="`/category/${post.data.categories[0].slug}/${post.meta.next_post.slug}`" 
                  class="post__bottom-links"
                >
                {{ post.meta.next_post.title }}
                <icon name="chevron-right"></icon>
              </router-link>
              <span 
                  class="post__bottom-links-no-post"
                  v-else
                >
                You are reading last post
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-2 col-sm-2"></div>
    </div>
  </div>
</template>

<script>
  import { butter } from '@/buttercms'
  import router from '@/router';
  
  export default {
    name: 'blog-post',
    data() {
      return {
        post: {}
      }
    },
    methods: {
      getPost() {
        butter.post.retrieve(this.$route.params.slug)
          .then((res) => {
            // console.log(res.data)
            this.post = res.data
          }).catch((res) => {
            console.log(res)
          })
      },
      read_time(text){
        var minutes = Math.floor(text.split(' ').length / 130 )
        if(minutes === 0) minutes = 1
        return minutes + ' min read'
      },
      // getAllPostTags() {
      //   return post.data.tags.map(() => {
      //     this.
      //   })
      // }
    },
    watch: {
      $route(to, from) {
        this.getPost()
      }
    },
    created() {
      this.getPost()
    }
  }
</script>