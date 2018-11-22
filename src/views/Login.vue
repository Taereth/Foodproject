

<template>
<div class="test">
  <div class="headbar">

    <div class="logo">
      <h3>STUDENTENFUTTER</h3>
    </div>
    <div class="settings">
      <!-- <p>SET</p> -->

      <img src="../assets/settings.svg" height="20px"></img>
    </div>
  </div>

  <div class="userlogin">


    <div id="user">{{username}}</div>
    <p>Username</p>
    <input class="fillin" v-model="usernameinput" placeholder="USERNAME">
    <p>Password</p>
    <input class="fillin"v-model="passwordinput" placeholder="PASSWORT">
    <p> </p>
    <button class="loginbtn" v-on:click="login">LOGIN</button><button class="loginbtn" v-on:click="signup">SIGN UP</button>
    <p id="errormessage"><span v-if="seen">USER DOES NOT EXIST</span></p>
    <h6>Forgot password?</h6>

  </div>
</div>

</template>

<style scoped lang="scss">
.userlogin {
  justify-content: center;
  margin-top: 50px;
}
h6 {
  font-size: 10px;
  font-weight: normal;
}
.loginbtn {
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  margin: 4px;
  background-color: #12DD8E;
  color: white;
  border-radius: 20px;
  display: inline-flex;
  text-align: center;
  padding: 8px 15px 8px 15px;
  font-weight: bold;
}

.fillin {
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  margin: 4px;
  background-color: #f1f1f1;
  color: white;
  border-radius: 20px;
  display: inline-flex;
  padding: 8px 15px 8px 15px;
  border-style: none;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

//countup variable

var countup;

export default {
  name: "login",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      username: "",
      usernameinput: "",
      passwordinput: "",
      seen: false

    }
  },
  methods: {
    login() {

      window.contentfulClient.getEntries({
          'content_type': 'user',
          'fields.name': this.usernameinput
        })
        .then((entries) => {

          entries.items.forEach((entry) => {
            if (entry.fields.passwort == this.passwordinput) {
              document.cookie = "username=" + this.usernameinput;
              this.$router.push("/listmode");
            } else {
              this.seen = true;
            }
          })
        })
        .catch();
    },
    signup() {
      this.$router.push("/newuser");
    }

  },
  mounted: function() {




  }
};
</script>
