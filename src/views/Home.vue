<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Yo" />
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

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted: function(){
    const element = document.getElementById("map")
    const options = {
        zoom: 14,
        center: new google.maps.LatLng(47.071467, 8.277621)
    }
    this.map = new google.maps.Map(element, options);
    console.log("Hallo");

    client.getEntry('GmaDHEoU8esUEys6Wyiwe')
      .then(function (entry) {
      // logs the entry metadata

      console.log("Hallo");

      var myLatLng = {lat: entry.fields.lat, lng: entry.fields.lng};
      var marker = new google.maps.Marker({
        position: myLatLng
        map: map
        title: 'test'
      });
    })


  }
};
</script>
