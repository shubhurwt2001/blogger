import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import firebase from "firebase/compat/app";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

import "./assets/main.css";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlhEc_H5RGs71a4lZdgiPEq7nLIDs5XNE",
  authDomain: "blog-5a979.firebaseapp.com",
  projectId: "blog-5a979",
  storageBucket: "blog-5a979.appspot.com",
  messagingSenderId: "825972325951",
  appId: "1:825972325951:web:12227770a26db76662c28a",
  databaseURL:"https://blog-5a979-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(function (user) {
  store.dispatch("checkAuth", user);
});
const app = createApp(App);
app.use(VueSweetalert2);
app.use(router);
app.use(store);

app.mount("#app");
