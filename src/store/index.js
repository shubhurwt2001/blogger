import { createStore } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import router from "../router";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user: null,
      isAuthenticated: false,
    };
  },
  getters: {
    user: (state) => {
      if (state.user) {
        return state.user;
      } else {
        return null;
      }
    },
    email: (state) => {
      if (state.user.email) {
        return state.user.email;
      } else {
        return null;
      }
    },
    isAuthenticated: (state) => state.isAuthenticated,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuth(state, payload) {
      state.isAuthenticated = payload;
    },
  },
  actions: {
    checkAuth(context, user) {
      if (user) {
        context.commit("setAuth", true);
        context.commit("setUser", user);
      } else {
        context.commit("setAuth", false);
        context.commit("setUser", null);
      }
    },

    logout() {
      firebase.auth().signOut();
      router.replace("/register");
    },
  },
});
export default store;
