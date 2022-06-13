import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin, NavbarPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(NavbarPlugin)
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import CKEditor from '@ckeditor/ckeditor5-vue2';
Vue.use( CKEditor )
import router from './router'
import storage from './storage.js'
import * as VueGoogleMaps from 'vue2-google-maps'
import { StatusCodes } from 'http-status-codes';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCmY4Nvugu4v85AKB-Wf1Ywg2fUyKzBePg',
    libraries: 'places',
  }
});

axios.interceptors.request.use(
  config => {
    if(config.baseURL == undefined){
      config.baseURL = "http://localhost:7777/"
    }
    console.log(storage.state.user.userRole)
    if (storage.state.user.sessionID != null) {
      config.headers.Authorization = `Bearer ${storage.state.user.sessionID}`;
    }

    return config;
    
  },
  error => Promise.reject(error)
);

const getRuntimeConfig = async () => {
   const runtimeConfig = await fetch('config.json');
   return await runtimeConfig.json()
}
getRuntimeConfig().then(function(json) {
  axios.defaults.baseURL = json.WEB_SERVICE_URL;
});
new Vue({
    render: h => h(App),
    router: router,
    store: storage
}).$mount('#app')