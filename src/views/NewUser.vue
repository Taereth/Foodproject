

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
    <p>TO DO</p>
    <button id="signup" v-on:click="register">SIGNUP</button>
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
      newusernameinput: "",
      newpasswordinput: "",
      newageinput: "",
      neworigininput: ""

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
        }
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

      entry.publish();

    })
  })
  .catch())

  }

},
  mounted: function(){




  }
};
</script>
