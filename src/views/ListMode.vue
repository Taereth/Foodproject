

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
    <h3>Sort by</h3>
    <input  type="checkbox" v-model="vegetarian" v-on:change="updateList">Vegetarian</input>
    <input  type="checkbox" v-model="vegan" v-on:change="updateList">Vegan</input>
    <input  type="checkbox" v-model="meat" v-on:change="updateList">Meat</input>
    <p>{{vegetarian}}  {{vegan}}  {{meat}}</p>
    <li v-for="event in shownevents" v-if="event.seen">{{event.name}} von {{event.owner.fields.name}} | {{event.food}} | {{event.time}} | {{event.location}}
      <p> </p>
      <button>Apply</button>
      <p> </p>
    </li></button>





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
      shownevents: events,
      vegetarian: true,
      vegan: true,
      meat: true
    }
},methods: {
  updateList(){
         for(var i=0;i<events.length;i++){
           if(this.vegetarian == true && events[i].vegetarian == true){
             events[i].seen = true;
           }
           else if(this.vegan == true && events[i].vegan == true){
             events[i].seen = true;
           }
           else if(this.meat == true && events[i].meat == true){
             events[i].seen = true;
           }
           else{
             events[i].seen = false;
           }
         }
  }

},
  mounted: function(){

    console.log(this.vegetarian);
    console.log(this.vegan);
    console.log(this.meat);



    window.contentfulClient.getEntries({
    'content_type': 'event'
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
    this.vegetarian = entry.fields.vegetarian
    this.vegan = entry.fields.vegan
    this.meat = entry.fields.meat
    this.seen = true
  }
}



</script>
