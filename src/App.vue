<template>
  <div id="app">
   <Header></Header>
   <router-view></router-view>
  <!-- 可以通过route.path来控制footer的显示与隐藏，
  但是不能通过indexOf来判断，因为js中，除了 0、null、undefined、NaN、false 和空字符串 '' 以外，
  其他所有的值（包括负数）在布尔上下文中都会被视为真值。
  可以用includes -->
   <!-- <Footer v-show="$route.path.indexOf('home')||$route.path.indexOf('search')"></Footer> -->
   <!-- <Footer v-show="$route.path.includes('home')||$route.path.includes('search')"></Footer> -->
   <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'||$route.path=='/'"></Footer> -->
   <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted() {
    this.$store.dispatch("getCategory");
  },
}
</script>

<style>

</style>
