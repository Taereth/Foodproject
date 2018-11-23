<template>
<div class="test">


  <div class="headbar">
    <div class="UserPictureContainer">
      <img class="UserPicture" height="40px" :src="currentUserPicture"></img>
    </div>
    <div class="logo">
      <h3>STUDENTENFUTTER</h3>
    </div>
    <div class="settings">
      <!-- <p>SET</p> -->

      <img src="../assets/settings.svg" height="20px"></img>
    </div>
  </div>

  <div class="nav">
    <router-link to="/">Events</router-link>
    <router-link to="/listmode">List</router-link>
    <router-link to="/mapmode">Map</router-link>
  </div>


<div class="filter">

  <div class="ck-button">
    <label for="vegbox">
    <input type="checkbox" id="vegbox" v-model="vegetarian" v-on:change="updateList"></input><span>Vegetarian</span>
    </label>
  </div>

  <div class="ck-button">
    <label for="veganbox">
  <input type="checkbox" id="veganbox" v-model="vegan" v-on:change="updateList"></input><span>Vegan</span>
  </label>
  </div>

  <div class="ck-button">
    <label for="meatbox">
  <input type="checkbox" id="meatbox" v-model="meat" v-on:change="updateList"></input><span>Meat</span>
</label>
  </div>
</div>

<div id="map"></div>

</div>
</template>

<style scoped lang="scss">
div label input {
    margin-right: 100px;
}
body {
    font-family: sans-serif;
}

li {
    list-style-type: none;
}
.eventTime {
    background-color: orange;
}
.eventName {
    background-color: green;
}
.eventLoc {
    background-color: pink;
}
.eventDesc {
    background-color: yellow;
}

.eventbox {
    margin: 10px;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.04);
}

.ck-button span {
    position: relative;
}

.ck-button {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
    margin: 4px;
    background-color: #C0C0C0;
    color: white;
    border-radius: 20px;
    display: inline-flex;
}

.ck-button input:checked + span {
    border-radius: 20px;
    background-color: #12DD8E;
    color: #fff;
}

.ck-button span:after {

    content: "";
    position: absolute;
    margin-top: 10px;
    background: url("../assets/uncheck.svg") no-repeat;
    height: 40px;
    width: 60px;
    top: 1px;
    left: 12px;

}

.ck-button input:checked ~ :after {
    top: 0;
    left: 8px;
    background: url("../assets/check.svg") no-repeat;
}

.ck-button label {
    font-weight: bold;
    font-size: 15px;
    float: left;
    width: auto;
}

.ck-button label span {
    text-align: center;
    padding: 8px 15px 8px 30px;
    display: block;
}

.ck-button label input {
    position: absolute;
    top: -20px;
}

.headbar {
    align-items: baseline;
    display: inline-flex;
}

#map {
  overflow-y: hidden;
  height:543px;
  max-width: 398px;
  display: block;
  margin-top:20px;
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 20px;

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
      meat: true,
      currentUserPicture: ""
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

    markers = [];
    events = [];
    this.shownevents = events;

    getUserPicture(Helper.getCookie("username"))
    .then((result)=>{this.currentUserPicture=result})

    const element = document.getElementById("map")
    const options = {
        zoom: 14,
        center: new google.maps.LatLng(47.071467, 8.277621),
        styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
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

function initMarkers(){
  for(var i = 0; i<events.length; i++){


    var eventloc = events[i].location;
    var eventname = events[i].name;

    var mylat = eventloc.lat;
    var mylng = eventloc.lon;
    var flag = events[i].imageURL5;

    var LatLng = {lat: mylat, lng: mylng};


    var marker = new google.maps.Marker({
      position: LatLng,
      map: mapref,
      title: eventname,
      icon: flag

    });



    let contentString = `<div>
                        <img style = "border: solid; border-radius: 50%; border-width: 5px; height: 80px; "src="`+ events[i].ownerpicture + `"></img>
                        <h1>` + events[i].name + `</h1>
                        <p>von `+events[i].ownername+ `</p>
                        <p>` +  events[i].food + `</p>
                        <p>` +  events[i].time + `</p>
                    </div>`;

    let infowindow = new google.maps.InfoWindow({
                content: " "
                });


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
    this.nutrition = entry.fields.nutrition
    this.location = entry.fields.location
    this.owner = entry.fields.owner
    this.time = entry.fields.time
    this.vegetarian = entry.fields.vegetarian
    this.vegan = entry.fields.vegan
    this.meat = entry.fields.meat
    this.picture = entry.fields.picture
    this.ownername = entry.fields.owner.fields.name

    this.seen = true

    if (entry.fields.mapPin != undefined) {
      this.imageURL5 = 'https:' + entry.fields.mapPin.fields.file.url
    } else {
      this.imageURL5 = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
    }

    this.ownerpicture = this.owner.fields.profilepicture;

    if (this.owner.fields.profilepicture != undefined) {
      this.ownerpicture = 'https:' + this.owner.fields.profilepicture.fields.file.url
    } else {
      this.ownerpicture = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
    }

  }
}

function getUserPicture(User){

  return window.contentfulClient.getEntries({
  'content_type': 'user',
  'fields.name': User
})
.then((entry)=>{
  console.log('https:' + entry.items[0].fields.profilepicture.fields.file.url);
  return 'https:' + entry.items[0].fields.profilepicture.fields.file.url
})
}

</script>
