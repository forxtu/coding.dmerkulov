export default {
  methods: {
    readTime(text){
      var minutes = Math.floor(text.split(' ').length / 130 )
      if(minutes === 0) minutes = 1
      return minutes + ' min read'
    }
  }
}