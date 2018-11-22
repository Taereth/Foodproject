

<template>
  <div class="test">
    <div class="headbar">

      <div class="logo">
        <h3>STUDENTENFUTTER</h3>
      </div>
      <div class="settings">
        <!-- <p>SET</p> -->

        <img src="../assets/settings.svg" height="20px"></img>
      </div>
    </div>

    <p>Username</p>
    <input class="fillin" v-model="newusernameinput" placeholder="USERNAME">
    <p>Password</p>
    <input class="fillin" v-model="newpasswordinput" placeholder="PASSWORD">
    <p>Age</p>
    <input class="fillin" v-model.number="newageinput" placeholder="AGE">
    <p>Origin</p>
    <input class="fillin" v-model="neworigininput" placeholder="ORIGIN">
    <p>Draw your Profile Picture</p>
    <Draw v-on:blobready = "blobready" ref="Portrait" class="drawWindow"/>
    <button class="loginbtn" id="signup" v-on:click="saveit"><span>SIGN UP</span></button>
  </div>


</template>

<style>
.headbar{
  margin-bottom: 20px;
}


.ck-button {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
    margin: 4px;
    background-color: orange;
    color: #fff;
    border-color: black;
    border-radius: 20px;
    display: inline-flex;
    margin-top: 6px;
}
.ck-button span {
    color: black;
    font-weight: bold;
    font-size: 15px;
}

.drawWindow {
  border-width: 1px;
  margin-bottom: 10px;
}

.loginbtn {
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  margin: 4px;
  background-color: #12DD8E;
  color: white;
  border-radius: 20px;
  display: inline-flex;
  text-align: center;
  padding: 8px 15px 8px 15px;
  font-weight: bold;
}

.fillin {
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
  margin: 4px;
  background-color: #f1f1f1;
  color: black;
  border-radius: 20px;
  display: inline-flex;
  padding: 8px 15px 8px 15px;
  border-style: none;
  margin: 0 0 25px 0;

}

p {
  font-size: 14px;
  margin:5px 0 10px 0;
}


</style>

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
