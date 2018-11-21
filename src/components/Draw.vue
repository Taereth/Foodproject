<template>
  <div class="Draw">
      <div ref="p5"></div>
  </div>
</template>
<script>

var p = false;

export default {
  name: "Draw",
  data: function() {
    return {};
  },
  methods: {},
  mounted: function() {
    console.log(this.$refs.p5);
    console.log(this.$route);
    let s = function(sketch) {
      sketch.setup = function() {
        sketch.createCanvas(200, 200);
        sketch.strokeWeight(10)
	      sketch.stroke(0);
      };
      sketch.draw = function() {
        console.log(p);
      };
      sketch.mousePressed = function() {
        p = true;
      };
      sketch.mouseReleased = function() {
        p = false;
      };
      sketch.mouseDragged = function() {
        console.log("yo");
        sketch.strokeWeight(5);
	      sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
      }
    };
    let myp5 = new p5(s, this.$refs.p5);
  }
};
</script>
