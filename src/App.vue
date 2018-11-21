<template>
  <div id="app">

    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://rsms.me/inter/inter-ui.css');
#app {
  font-family: "Inter UI", sans-serif;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#nav {
  padding: 30px;
  a {
    font-weight: lighter;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>

export default {

  mounted: function(){

    this.$router.push("/login")




  }
};
</script>
