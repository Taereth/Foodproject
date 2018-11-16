

<template>
  <div class="test">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/login">LogOut</router-link>
    </div>


    <h1>Current User: {{currentUser}}</h1>
    <h2>This will be the MapMode</h2>
    <div id="map"></div>





  </div>


</template>

<style scoped lang="scss">
#map {
  height: 80vh;
  width: 80vw;
}
</style>


<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Helper from "@/helper.js"

//events array

var events =[];
var markers =[];
let mapref;

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

    const element = document.getElementById("map")
    const options = {
        zoom: 14,
        center: new google.maps.LatLng(47.071467, 8.277621)
    }
    this.map = new google.maps.Map(element, options);
    mapref = this.map;


    window.contentfulClient.getEntries({
    'content_type': 'event',
  })
  .then((entries)=>{

    entries.items.forEach((entry)=>{
      var newEvent = new event(entry)
      events.push(newEvent);
      console.log(events.length);


    })

    initMarkers();



  })

  }
};

function initMap(){

  const element = document.getElementById("map")
  const options = {
      zoom: 14,
      center: new google.maps.LatLng(47.071467, 8.277621)
  }
  this.map = new google.maps.Map(element, options);
  mapref = this.map;

}

function initMarkers(){
  for(var i = 0; i<events.length; i++){


    var eventloc = events[i].location;
    var eventname = events[i].name;

    var mylat = eventloc.lat;
    var mylng = eventloc.lon;

    var LatLng = {lat: mylat, lng: mylng};


    var marker = new google.maps.Marker({
      position: LatLng,
      map: mapref,
      title: eventname
    });

    marker.addListener('click',function(){
      mapref.setZoom(10);
      mapref.setCenter(marker.getPosition());
    })


    markers.push(marker);


  }
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
