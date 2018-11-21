

<template>
  <div class="test">

    <div id="nav">
      <router-link to="/">TODO_Events</router-link> |
      <router-link to="/listmode">List</router-link> |
      <router-link to="/mapmode">Map</router-link>
    </div>


    <h1>Current User: {{currentUser}}</h1>




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

},
  mounted: function(){

    console.log(Helper.getCookie("username"));




  }
};



</script>
