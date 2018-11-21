<template>
  <div id="app">

    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://rsms.me/inter/inter-ui.css');
#app {
  font-family: "Inter UI", sans-serif;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img{
  height: 200px;
  width: auto;
}

.flagimg{
  height: 38px;
  width: auto;
}

.nav {
  padding: 20px;
  a {
    margin: 0px 10px 0px 10px;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      border-bottom: 3px solid red;
    }
  }
}

.settings {
    display: flex;
    position: absolute;
    right: 28px;
    top: 20px;
}

h3 {
    margin-bottom: 10px;
    font-size: 1.1em;
}

</style>

<script>

export default {

  mounted: function(){

    this.$router.push("/login")




  }
};
</script>
