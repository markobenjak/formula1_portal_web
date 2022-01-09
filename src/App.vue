<template>
  <div id="app">
    <div>
        <Header />
    </div>
    <div>
        <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/header.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
