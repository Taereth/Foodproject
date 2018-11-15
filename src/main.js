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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
