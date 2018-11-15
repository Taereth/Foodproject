

<template>
  <div class="test">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/login">LogOut</router-link>
    </div>


    <h1>Current User: {{currentUser}}</h1>
    <h2>{{events}}</h2>
    <button v-on:click="listmode">LISTMODE</button>




  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

//countup variable

var countup = 2;

export default {
  name: "Test",
  components: {
    HelloWorld
  },data: function(){
    return {
      currentUser: getCookie("username"),
      events: ""
    }
},methods: {
  listmode(){
    this.$router.push("/listmode")
  }

},
  mounted: function(){

    console.log(getCookie("username"));




  }
};

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



</script>
