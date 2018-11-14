import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {createClient} from 'contentful';
import {createClient as managementClient} from 'contentful-management';


Vue.config.productionTip = false;

window.contentfulClient = createClient({
    accessToken: '27243c8cabc12720b696d4687d01f3158787ea6a93063f3b23690a75bc1caada',
    space: 'nyazvzij5ixn'
});

window.contentfulClientUpdate = managementClient({
    accessToken: 'CFPAT-b313bded7fa4a871b52834b41bca7f3ade8cf532daac79819562f73979ef4796'
});

contentfulClient.getEntries()
.then((response) => console.log(response.items))
.catch(console.error);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
