

<template>
  <div class="test"><h1>This is a testing page</h1>


    <div class="test2"><h2>Test2</h2></div>
    <div id="hovertest">
      <span v-bind:title="hovermessage">{{message}}</span>
    </div>
    <div id="hidetest">
      <span v-if="seen">Click the Button to Hide</span>
      <button v-on:click="hide">{{hidemessage}}</button>
    </div>
    <div id="countup">
      <p>{{numberx}}</p>
      <p>This gets a number from Contentful, counts it up and reuploads the number</p>
      <button v-on:click="countup">Click here to Count Up</button>
    </div>

    <li v-for="event in shownevents" v-if="event.seen"><img :src="event.imageURL"></img>{{event.name}} von {{event.owner.fields.name}} | {{event.food}} | {{event.time}} | {{event.location}}
      <p> </p>
      <button>Apply</button>
      <p> </p>
    </li>



  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Helper from "@/helper.js";

//countup variable

var events = [];
var countup;

export default {
  name: "Test",
  components: {
    HelloWorld
  },data: function(){
    return {
      message: 'Hover over Me',
      hovermessage: 'Hovering',
      seen: true,
      hidemessage: 'Hide',
      numberx: "",
      shownevents: events
    }
},methods: {
  hide(){
    if(this.seen == true){
      this.seen=false;
      this.hidemessage = 'Show';
    }
    else{
      this.seen=true;
      this.hidemessage = 'Hide';
    }
  },
  countup(){

    countup+=1;

    window.contentfulClientUpdate.getSpace('nyazvzij5ixn')
    .then((space)=>{
      space.getEntry('6dacYpvBiEiS2UIuO8mYeQ')
      .then((entry)=>{
        var currentVersion= entry.sys.version;
        currentVersion+=1;
        this.numberx = countup;
        entry.fields.number['en-US']=countup;
        return entry.update();
      }).then(entry =>{ return entry.publish();})
    })

  }
},
  mounted: function(){


    window.contentfulClient.getEntry('6dacYpvBiEiS2UIuO8mYeQ')
    .then((entry)=>{

      this.numberx = entry.fields.number;
      countup = entry.fields.number;

    })
    .catch(console.error);

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

    if(entry.fields.picture != undefined){
      this.imageURL = 'https:'+entry.fields.picture.fields.file.url
    }
    else{
      this.imageURL = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
    }
  }
}

</script>
