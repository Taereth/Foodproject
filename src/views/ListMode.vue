

<template>
  <div class="test">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/login">LogOut</router-link>
    </div>


    <h1>Current User: {{currentUser}}</h1>
    <h2>This will be the Listmode</h2>
    <li v-for="event in shownevents">{{event.name}} von {{event.owner.fields.name}} | {{event.food}} | {{event.time}} | {{event.location}}</li>





  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Helper from "@/helper.js"

//events array

var events =[];

export default {
  name: "listmode",
  components: {
    HelloWorld
  },data: function(){
    return {
      currentUser: Helper.getCookie("username"),
      shownevents: events
    }
},methods: {

},
  mounted: function(){

    console.log(Helper.getCookie("username"));

    window.contentfulClient.getEntries({
    'content_type': 'event',
  })
  .then((entries)=>{

    entries.items.forEach((entry)=>{
      var newEvent = new event(entry)
      events.push(newEvent);


    })
  })
  .catch();

  console.log(events);




  }
};

class event{
  constructor(entry){
    this.food = entry.fields.food
    this.name = entry.fields.eventTitle
    this.location = entry.fields.location
    this.owner = entry.fields.owner
    this.time = entry.fields.time
  }
}



</script>
