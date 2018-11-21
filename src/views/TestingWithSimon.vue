

<template>
  <div class="test">

    <div id="nav">
      <router-link to="/">TODO_Events</router-link> |
      <router-link to="/listmode">List</router-link> |
      <router-link to="/mapmode">Map</router-link>
    </div>


    <h1>Current User: {{currentUser}}</h1>
    <h2>This will be the MapMode</h2>
    <input  type="checkbox" v-model="vegetarian" v-on:change="updateList">Vegetarian</input>
    <input  type="checkbox" v-model="vegan" v-on:change="updateList">Vegan</input>
    <input  type="checkbox" v-model="meat" v-on:change="updateList">Meat</input>
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
      shownevents: events,
      vegetarian: true,
      vegan: true,
      meat: true
    }
},methods: {
  updateList(){

           for(var i=0;i<events.length;i++){
             if(this.vegetarian == true && events[i].vegetarian == true){
               markers[i].setVisible(true);
             }
             else if(this.vegan == true && events[i].vegan == true){
               markers[i].setVisible(true);
             }
             else if(this.meat == true && events[i].meat == true){
               markers[i].setVisible(true);
             }
             else{
               markers[i].setVisible(false);
             }
           }



  }

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

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
      spain: {
        icon: iconBase + 'flag-map-spain.svg'
      },
      japan: {
        icon: iconBase + 'flag-map-spain.svg'
      },
      india: {
        icon: iconBase + 'flag-map-spain.svg'
      }
    };

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
      type: 'spain',
      map: mapref,
      title: eventname
    });



    let contentString = `<div>
                        <h1>` + events[i].name + `</h1>
                        <p>` +  events[i].food + `</p>
                        <p>` +  events[i].time + `</p>
                    </div>`;

    let infowindow = new google.maps.InfoWindow({
                content: " "
                });

    console.log(marker);
    bindWindow(marker,mapref,infowindow,contentString);

    markers.push(marker);





  }
}

function bindWindow(marker,map,infowindow,html){
  marker.addListener('click',function(){
    infowindow.setContent(html);
    infowindow.open(mapref,this);
  })
}

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
  }
}



</script>
