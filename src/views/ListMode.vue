

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

//events array

var events =[];

export default {
  name: "listmode",
  components: {
    HelloWorld
  },data: function(){
    return {
      currentUser: getCookie("username"),
      shownevents: events
    }
},methods: {

},
  mounted: function(){

    console.log(getCookie("username"));

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
