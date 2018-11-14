

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



  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

//countup variable

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
      numberx: ""
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

        entry.fields.number['en-US']=countup;
        entry.update();
        entry.publish();
        console.log(entry.fields.number);

      })
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

  }
};
</script>
