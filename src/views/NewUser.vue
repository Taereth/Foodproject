

<template>
  <div class="test">
    <p>USERNAME</p>
    <input v-model="newusernameinput" placeholder="USERNAME">
    <p>PASSWORD</p>
    <input v-model="newpasswordinput" placeholder="PASSWORD">
    <p>AGE</p>
    <input v-model.number="newageinput" placeholder="AGE">
    <p>ORIGIN</p>
    <input v-model="neworigininput" placeholder="ORIGIN">
    <p>PROFILE PICTURE</p>
    <Draw v-on:blobready = "blobready" ref="Portrait"/>
    <button v-on:click = "saveit">SAVE</button>
    <img :src="imgsrc"></img>

    <button id="signup" v-on:click="register">SIGNUP</button>
  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Draw from "@/components/Draw.vue";

//countup variable

var countup;

export default {
  name: "newuser",
  components: {
    HelloWorld,
    Draw
  },data: function(){
    return {
      newusernameinput: "",
      newpasswordinput: "",
      newageinput: "",
      neworigininput: "",
      newuserimage: "",
      imgsrc: ""

    }
},methods: {
  register(){

    window.contentfulClientUpdate.getSpace('nyazvzij5ixn')
    .then((space)=> {space.createEntry('user', {
      fields: {
        name:{
          'en-US': this.newusernameinput
        },
        origin:{
          'en-US': this.neworigininput
        },
        passwort:{
          'en-US': this.neworigininput
        },
        age:{
          'en-US': this.newageinput
        },

      }
    })

  }
    )
    window.contentfulClientUpdate.getSpace('nyazvzij5ixn')
    .then((space)=>space.getEntries({
    'content_type': 'user',
    'fields.name': this.newusernameinput
  })
  .then((entries)=>{

    entries.items.forEach((entry)=>{

      return entry.publish();

    })

  })
  .then((entries)=>{this.$router.push("/login")})
  .catch()
  )

},
saveit(){
  this.$refs.Portrait.getPicture();

},
blobready(){
  console.log(this.$refs.Portrait.blob);
  this.imgsrc = URL.createObjectURL(this.$refs.Portrait.blob);
}

},
  mounted: function(){





  }
};
</script>
