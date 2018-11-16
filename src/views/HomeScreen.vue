

<template>
  <div class="test">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/login">LogOut</router-link>
    </div>


    <h1>Current User: {{currentUser}}</h1>
    <button v-on:click="listmode">LISTMODE</button><button v-on:click="mapmode">MAPMODE</button>




  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Helper from "@/helper.js"

//countup variable

var countup = 2;

export default {
  name: "homescreen",
  components: {
    HelloWorld
  },data: function(){
    return {
      currentUser: Helper.getCookie("username")
    }
},methods: {
  listmode(){
    this.$router.push("/listmode")
  },
  mapmode(){
    this.$router.push("/mapmode")
  }

},
  mounted: function(){

    console.log(Helper.getCookie("username"));




  }
};



</script>
