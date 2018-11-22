

<template>
  <div class="test">
    <p>USERNAME</p>
    <input v-model="newusernameinput" placeholder="USERNAME">
    <p>PASSWORD</p>
    <input v-model="newpasswordinput" placeholder="PASSWORD">
    <p>AGE</p>
    <input v-model.number="newageinput" placeholder="AGE">
    <p>ORIGIN</p>
    <input v-model="neworigininput" placeholder="ORIGIN">
    <p>PROFILE PICTURE</p>
    <Draw v-on:blobready = "blobready" ref="Portrait"/>
    <button id="signup" v-on:click="saveit">SIGNUP</button>
  </div>


</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Draw from "@/components/Draw.vue";

//countup variable

var countup;

export default {
  name: "newuser",
  components: {
    HelloWorld,
    Draw
  },data: function(){
    return {
      newusernameinput: "",
      newpasswordinput: "",
      newageinput: "",
      neworigininput: "",
      newuserimage: "",
      imgsrc: ""

    }
},methods: {

  createAsset: function(blob) {


     let assetreference;
     let spaceref = null;
     console.log("uploading");
     let contentType = "image/png";
     window.contentfulClientUpdate
       .getSpace("nyazvzij5ixn")
       .then(space => {
         spaceref = space;
         return space.getEnvironment("master");
       })
       .then(environment => environment.createUpload({ file: blob }))
       .then(upload => {
         console.log("creating asset...");
         return spaceref.createAsset({
           fields: {
             title: {
               "en-US": this.newusernameinput + "_profile.png"
             },
             file: {
               "en-US": {
                 fileName: this.newusernameinput + "_profile.png",
                 contentType: contentType,
                 uploadFrom: {
                   sys: {
                     type: "Link",
                     linkType: "Upload",
                     id: upload.sys.id
                   }
                 }
               }
             }
           }
         });
       })
       .then(asset => {
         console.log("processing...");
         return asset.processForLocale("en-US", {
           processingCheckWait: 2000
         });
       })
       .then(asset => {
         console.log("publishing...");
         this.assetreference = asset;
         console.log(this.assetreference);
         return asset.publish();
       })
       .then(asset => {
         console.log(asset);
         return asset;
       })
       .then((asset)=>{return spaceref.createEntry('user', {
           fields: {
             name:{
               'en-US': this.newusernameinput
             },
             origin:{
               'en-US': this.neworigininput
             },
             passwort:{
               'en-US': this.newpasswordinput
             },
             age:{
               'en-US': this.newageinput
             },
             profilepicture:{
               'en-US': {
                 'sys': {
                   'id': asset.sys.id,
                   'linkType': 'Asset',
                   'type': 'Link'
                 }
               }
             }

           }
         })

       })
       .then((entry)=>{return entry.update()})
       .then((entry)=>{return entry.publish()})
       .then(()=>{this.$router.push("/login")})
       .catch(err => {
         console.log(err);
       });
   },
saveit(){
  this.$refs.Portrait.getPicture();

},
blobready(){
  this.$refs.Portrait.blob.lastModifiedDate = new Date();
  this.$refs.Portrait.blob.name = "tempname.png";
  this.imgsrc = this.$refs.Portrait.blob
  this.createAsset(this.imgsrc)

}


},
  mounted: function(){

  }
};
</script>
