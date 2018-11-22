

<template>
  <div class="test">

    <div id="user">{{username}}</div>
    <p>Username</p>
    <input v-model="usernameinput" placeholder="USERNAME">
    <p>Password</p>
    <input v-model="passwordinput" placeholder="PASSWORT">
    <p> </p>
    <button v-on:click="login">LOGIN</button><button v-on:click="signup">SIGN UP</button>
    <p id="errormessage"><span v-if="seen">USER DOES NOT EXIST</span></p>


  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

//countup variable

var countup;

export default {
  name: "login",
  components: {
    HelloWorld
  },data: function(){
    return {
      username: "",
      usernameinput: "",
      passwordinput: "",
      seen: false

    }
},methods: {
  login(){

      window.contentfulClient.getEntries({
      'content_type': 'user',
      'fields.name': this.usernameinput
    })
    .then((entries)=>{

      entries.items.forEach((entry)=>{
      if(entry.fields.passwort == this.passwordinput){
        document.cookie = "username="+this.usernameinput;
        this.$router.push("/listmode");
      }
      else{
        this.seen = true;
      }
      })
    })
    .catch();
  },
  signup(){
    this.$router.push("/newuser");
  }

},
  mounted: function(){




  }
};
</script>
