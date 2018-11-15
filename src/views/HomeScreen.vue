

<template>
  <div class="test">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/login">Login</router-link>
    </div>


    <h1>This will be the Homescreen</h1>




  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

//countup variable

var countup;

export default {
  name: "Test",
  components: {
    HelloWorld
  },data: function(){
    return {
    }
},methods: {

},
  mounted: function(){



  }
};
</script>
