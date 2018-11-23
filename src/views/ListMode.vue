<template>
<div class="test">



  <div class="sticky">

    <div class="headbar">
    <div class="UserPictureContainer">
      <img class="UserPicture" height="40px" :src="currentUserPicture"></img>
    </div>
      <div class="logo">
        <h3>STUDENTENFUTTER</h3>
      </div>
      <div class="settings">

        <img src="../assets/settings.svg" height="20px"></img>
      </div>
    </div>


    <div class="nav">
      <router-link to="/">Events</router-link>
      <router-link to="/listmode">List</router-link>
      <router-link to="/mapmode">Map</router-link>
    </div>
  </div>







  <div :class="[showPopup ? 'noScroll' :'' , 'listcontent' ]">



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


    <li v-for="event in shownevents" v-if="event.seen">

      <div class="eventbox" id="event.name" v-on:click="selectEvent(event)">
        <img class="foodimage" :src="event.imageURL1"></img>
        <div class="eventFlag"><img class="flagimg" :src="event.imageURL2"></img>
        </div>
        <div class="eventNut">
          <img :src="event.imageURL4"></img>
          {{event.nutrition}}</div>

        <div class="infos">
          <div class="eventDate">
            {{event.date}}</div>
          <div class="eventTime">
            {{event.time}} </div>
          <div class="eventDistance">
            {{event.distance}}</div>
        </div>

        <div class="eventName">
          {{event.name}} </div>
        <!-- {{event.owner.fields.name}} -->

        <!-- <div class="eventDesc">
          {{event.food}}</div> -->


        <!-- <div class="eventLoc">
        {{event.location}} </div> -->

      </div>
    </li>

  </div>

  <div v-if="showPopup">
    <div class="modal">
      <div class="eventboxpopup" >
        <img class="foodimage" :src="currentEvent.imageURL1"></img>
        <div class="eventFlag">
          <img class="flagimg" :src="currentEvent.imageURL2"></img>
        </div>
        <div class="eventNut">
          <img :src="currentEvent.imageURL4"></img>{{currentEvent.nutrition}}
        </div>

        <div class="infos">
          <div class="eventDate">{{currentEvent.date}}</div>
          <div class="eventTime">{{currentEvent.time}} </div>
          <div class="eventDistance">{{currentEvent.distance}}</div>
        </div>

        <div class="eventName">{{currentEvent.name}}</div>
        <div class="eventDesc">{{currentEvent.food}}</div>

        <div class="controlbuttons">
          <button class="buttonapply">Apply</button>
          <button @click="closePopup" class="buttonclose">Back</button>
        </div>

        <div class="detailmap" id="popUpmap"></div>






      </div>
    </div>
  </div>
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

.listcontent {
    z-index: -1;
    padding-top: 120px;
    margin: 0;
}

.listcontent.noScroll {
  height: 70vh;
  overflow: hidden;
}
.infos {
    padding: 20px;
    display: flex;
    justify-content: space-between;

}
.eventPic {
    position: relative;
}
.eventFlag {
    position: absolute;
    top: 10px;
    right: -18px;
}
.eventNut {
    position: absolute;
    top: 20px;
    left: 20px;
}
.modal .eventNut {
  img {
      margin-right: 4px;
    }
}

.eventName {
    padding: 0 20px 20px;
    font-size: 25px;
    text-align: left;

}
.eventDesc {
    padding: 0 20px;
    text-align: left;
    color: #7c7c7c;
    font-weight: 700;
}
.eventDate {
    position: relative;
    margin-left: 20px;
}
.eventDate:after {

    content: "";
    position: absolute;
    margin-top: 10px;
    background: url("../assets/date.svg") no-repeat;
    height: 40px;
    width: 60px;
    top: -8px;
    left: -20px;
}
.eventTime {
    position: relative;
}
.eventTime:after {

    content: "";
    position: absolute;
    margin-top: 10px;
    background: url("../assets/time.svg") no-repeat;
    height: 40px;
    width: 60px;
    top: -8px;
    left: -18px;
}
.eventDistance {
    position: relative;
}
.eventDistance:after {

    content: "";
    position: absolute;
    margin-top: 10px;
    background: url("../assets/location.svg") no-repeat;
    height: 40px;
    width: 60px;
    top: -9px;
    left: -15px;
}
.eventbox {
    position: relative;
    margin: 10px 20px 10px 20px;
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


/* Popup */

.modal {
    z-index: 1;
    position: fixed;
    top: 0;
    background-color:rgba(0,0,0,0.4);
    width: 100%;
    height: 100%;
    overflow-y: hidden;
}

.eventboxpopup {
  background-color:white;
  height:93.67vh;
  width: auto;
  z-index: 2;
  position: relative;
  padding-bottom: 10px;
  margin: 20px 20px 20px 20px;

}

.controlbuttons {
  justify-content: flex-start;
  margin: 20px 10px;
}

.buttonapply {
  font-size:15px;
  position: relative;
  background-color: #12DD8E;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  margin: 4px;
  color: white;
  border-radius: 20px;
  display: inline-flex;
  text-align: center;
  padding: 8px 15px 10px 30px;
  font-weight: bold;
  font-size:15px;
}

.buttonapply:after {

    content: "";
    position: absolute;
    margin-top: 10px;
    background: url("../assets/apply.svg") no-repeat;
    height: 40px;
    width: 60px;
    top: 1px;
    left: 11px;
}

.buttonclose {
  position: relative;
  background-color: #C0C0C0;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  margin: 4px;
  color: white;
  border-radius: 20px;
  display: inline-flex;
  text-align: center;
  padding: 8px 15px 10px 30px;
  font-weight: bold;
  font-size:15px;
}

.buttonclose:after {

    content: "";
    position: absolute;
    margin-top: 10px;
    background: url("../assets/uncheck.svg") no-repeat;
    height: 40px;
    width: 60px;
    top: 2px;
    left: 12px;
}

// .detailmap{
//   overflow: hidden;
//   height:243px;
//   max-width: 398px;
//   display: block;
//   margin-top:20px;
//   margin-left: 18px;
//   margin-right: 18px;
//   margin-bottom: 20px;
// }



#popUpmap{
  height: 25%;
  max-width: 398px;
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

var events = [];
let mapref;
let markers = [];

export default {
  name: "listmode",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      currentUser: Helper.getCookie("username"),
      shownevents: events,
      currentEvent: null,
      showPopup: false,
      vegetarian: true,
      vegan: true,
      meat: true,
      currentUserPicture: ""
    }
  },
  methods: {
    updateList() {
      for (var i = 0; i < events.length; i++) {
        if (this.vegetarian == true && events[i].vegetarian == true) {
          events[i].seen = true;
        } else if (this.vegan == true && events[i].vegan == true) {
          events[i].seen = true;
        } else if (this.meat == true && events[i].meat == true) {
          events[i].seen = true;
        } else {
          events[i].seen = false;
        }
      }
    },
    selectEvent: function(event) {
      this.currentEvent = event;
      this.showPopup = true;
      setTimeout(_=>initMap(),100)
    },
    closePopup: function(event) {
      this.showPopup = false;
    }

  },
  mounted: function() {

    events = [];
    this.shownevents = events;



    getUserPicture(Helper.getCookie("username"))
    .then((result)=>{this.currentUserPicture=result})




    window.contentfulClient.getEntries({
        'content_type': 'event'
      })
      .then((entries) => {

        entries.items.forEach((entry) => {
          var newEvent = new event(entry)
          events.push(newEvent);


        })
      })
      .catch();



  }
};

function initMap(){


    var maps = document.getElementsByClassName("detailmap");


    console.log(maps.length);

    for(var i=0;i<maps.length;i++){

      console.log(maps[i]);

      const element = maps[i]
      const options = {
          zoom: 14,
          center: new google.maps.LatLng(47.071467, 8.277621)
      }
      var map = new google.maps.Map(element, options);
      mapref = map;

      initMarkers(mapref);
}

}


function initMarkers(themap){
  for(var i = 0; i<events.length; i++){


    var eventloc = events[i].location;
    var eventname = events[i].name;

    var mylat = eventloc.lat;
    var mylng = eventloc.lon;
    var flag = events[i].imageURL5;

    var LatLng = {lat: mylat, lng: mylng};


    var marker = new google.maps.Marker({
      position: LatLng,
      map: themap,
      title: eventname,
      icon: flag

    });



    let contentString = `<div>
                        <img src="`+ events[i].ownerpicture + `"></img>` + events[i].name + `</h1>
                        <h1>` + events[i].name + `</h1>
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

class event {
  constructor(entry) {
    this.food = entry.fields.food
    this.name = entry.fields.eventTitle
    this.nutrition = entry.fields.nutrition
    this.location = entry.fields.location
    this.distance = entry.fields.distance
    this.owner = entry.fields.owner
    this.time = entry.fields.time
    this.date = entry.fields.date
    this.vegetarian = entry.fields.vegetarian
    this.vegan = entry.fields.vegan
    this.meat = entry.fields.meat
    this.seen = true
    this.ownerpicture = this.owner.fields.profilepicture;

    if (this.owner.fields.profilepicture != undefined) {
      this.ownerpicture = 'https:' + this.owner.fields.profilepicture.fields.file.url
    } else {
      this.ownerpicture = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
    }


    if (entry.fields.picture != undefined) {
      this.imageURL1 = 'https:' + entry.fields.picture.fields.file.url
    } else {
      this.imageURL1 = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
    }

    if (entry.fields.flag != undefined) {
      this.imageURL2 = 'https:' + entry.fields.flag.fields.file.url
    } else {
      this.imageURL2 = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
    }

    if (entry.fields.setIcon != undefined) {
      this.imageURL3 = 'https:' + entry.fields.setIcon.fields.file.url
    } else {
      this.imageURL3 = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
    }
    if (entry.fields.nutImg != undefined) {
      this.imageURL4 = 'https:' + entry.fields.nutImg.fields.file.url
    } else {
      this.imageURL4 = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
    }
    if (entry.fields.mapPin != undefined) {
      this.imageURL5 = 'https:' + entry.fields.mapPin.fields.file.url
    } else {
      this.imageURL5 = 'http://trivialpursuitsdotorg.files.wordpress.com/2012/10/penis.png'
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
