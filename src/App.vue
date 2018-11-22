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
  color: black;
}

body {
  margin: 0;
}

.sticky {
  width: 100%;
  background-color: white;
  position: fixed;
  overflow-y: scroll;
  padding-top:0px;
  z-index: 1;

}

.foodimage{
  height: 200px;
  width: auto;
}

.flagimg{
  height: 38px;
  width: auto;
}

.nav {
  padding: 15px 0 15px 0;
  a {
    color: black;
    margin: 0px 10px 0px 10px;
    padding-bottom:5px;
    text-decoration: none;
    &.router-link-exact-active {
      border-bottom: 3px solid red;
    }
  }
}

.filter {
  padding-top: 22px;
}


.settings {
    display: flex;
    position: absolute;
    right: 28px;
    top: 16px;
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
