<template>
  <footer class="footer-wrapper" ref="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="footer">
            <div class="footer__logo">
                <router-link to='/'>coding.dmerkulov</router-link>
            </div>
            <div class="footer__right">
                <router-link to='/' exact>About</router-link>
                <router-link to='/' exact>Сooperation</router-link>
                <router-link to='/' exact>dmerkulov.xyz</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'footer-component',
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../scss/main';
</style>
