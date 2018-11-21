

<template>
<div class="test">

  <div class="headbar">
    <div id="logo">
      <h3>STUDENTENFUTTER</h3>
    </div>
    <div id="settings">
      <p> Set </p>
    </div>
  </div>

  <div class="headbar">

  </div> <div id="nav">
    <router-link to="/">Events</router-link>
    <router-link to="/listmode"><b>List</b></router-link>
    <router-link to="/mapmode">Map</router-link>
  </div>
</div>

</div>
</template>

<style scoped lang="scss">

 .headbar{
   align-items: baseline;
   display: inline-flex;
 }
 #settings{
   display: flex;
   position: absolute;
   right: 28px;
   top: 20px;
 }
 h3{
   font-weight: lighter;
   font-style: normal;
   font-size: 1.5em;
 }
</style>

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
  },
  data: function() {
    return {
      currentUser: Helper.getCookie("username")
    }
  },
  methods: {

  },
  mounted: function() {

    console.log(Helper.getCookie("username"));




  }
};
</script>
