import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {createClient} from 'contentful';

Vue.config.productionTip = false;



window.contentfulClient = createClient({
    accessToken: '27243c8cabc12720b696d4687d01f3158787ea6a93063f3b23690a75bc1caada',
    space: 'nyazvzij5ixn'
});

contentfulClient.getEntries()
.then((response) => console.log(response.items))
.catch(console.error);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
