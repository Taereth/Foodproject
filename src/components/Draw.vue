<template>
  <div class="Draw">
      <div ref="p5"></div>
  </div>
</template>


<style>

.Draw {
    margin:auto;
    width:200px;
    border-radius: 10%;
    border-style: solid;
    border-width:5px;

}
</style>

<script>


var p = false;
var img;
let myp5;

export default {
  name: "Draw",
  data: function() {
    return {
      sketchref: null,
      blob: null
    };
  },
  methods: {
    getPicture(){



    var wait = false;


    var blob = this.sketchref.canvas.toBlob((blob)=>{
      this.blob=blob;
      this.$emit("blobready");
    })
}
  },
  mounted: function() {


    console.log(this.$refs.p5);
    console.log(this.$route);
    let that = this;
    let s = function(sketch) {
      sketch.setup = function() {
        sketch.createCanvas(200, 200);
        sketch.strokeWeight(10)
	      sketch.stroke(0);
      };

      sketch.mousePressed = function() {
        p = true;
      };
      sketch.mouseReleased = function() {
        p = false;
      };
      sketch.mouseDragged = function() {

        sketch.strokeWeight(5);
	      sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
      };
      sketch.saveit = function() {
        return sketch.save();
      };
      that.sketchref = sketch;

    };
    myp5 = new p5(s, this.$refs.p5);


  }
};
</script>
