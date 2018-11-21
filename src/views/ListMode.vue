<template>
<div class="test">

  <div class="headbar">
    <div class="logo">
      <h3>STUDENTENFUTTER</h3>
    </div>
    <div class="settings" v-for="event in shownevents" v-if="event.seen">
      <!-- <p>SET</p> -->

      <img :src="event.imageURL3"></img>
    </div>
  </div>

  <div class="headbar">

  </div>
  <div class="nav">
    <router-link to="/">Events</router-link>
    <router-link to="/listmode">List</router-link>
    <router-link to="/mapmode">Map</router-link>
  </div>

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

    <div class="eventbox">
      <img :src="event.imageURL1"></img>
      <div class="eventFlag"><img class="flagimg" :src="event.imageURL2"></img>
      </div>
      <div class="eventNut">
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

      <div class="eventDesc">
        {{event.food}}</div>


      <!-- <div class="eventLoc">
        {{event.location}} </div> -->

      <button>Apply</button>
    </div>
  </li>


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
.infos{
  padding: 20px;
  display: flex;
  justify-content: space-between;

}
.eventPic {
    position: relative;
}
.eventFlag {
    position: absolute;
    top: 20px;
    right: -18px;
}
.eventNut {
    position: absolute;
    top: 20px;
    left: 20px;
}
.eventName {
  padding: 0 20px 10px 20px;
    font-size: 25px;
    text-align: left;

}
.eventDesc {
  padding: 0 20px 0 20px;
    text-align: left;

}
.eventDate {

    }
.eventTime {

    }

.eventDistance {

}

.eventbox {
    position: relative;
    margin: 10px 10px 20px;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.04);
}

.ck-button {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
    margin: 4px;
    background-color: #C0C0C0;
    color: white;
    border-radius: 20px;
    display: inline-flex;
}

.ck-button label {
    font-weight: bold;
    font-size: 15px;
    float: left;
    width: auto;
}

.ck-button label span {
    text-align: center;
    padding: 8px 15px;
    display: block;
}

.ck-button label input {
    position: absolute;
    top: -20px;
}

.ck-button input:checked + span {
    border-radius: 30px;
    background-color: #12DD8E;
    color: #fff;
}

.headbar {
    align-items: baseline;
    display: inline-flex;
}
</style>

<!-- <template>
  <div class="test">

    <div id="nav">
      <router-link to="/">TODO_Events</router-link> |
      <router-link to="/listmode">List</router-link> |
      <router-link to="/mapmode">Map</router-link>
    </div> -->










<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Helper from "@/helper.js"

//events array

var events = [];

export default {
  name: "listmode",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      currentUser: Helper.getCookie("username"),
      shownevents: events,
      vegetarian: true,
      vegan: true,
      meat: true
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
    }

  },
  mounted: function() {

    console.log(this.vegetarian);
    console.log(this.vegan);
    console.log(this.meat);



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

    console.log(events);




  }
};

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
  }
}
</script>
