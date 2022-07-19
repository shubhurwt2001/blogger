<script setup>
import { computed } from "@vue/runtime-core";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="bg-light">
    <div class="container">
      <div class="row">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <!-- <div class="collapse navbar-collapse" id="navbarNav"> -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink active-class="active" class="nav-link" to="/"
                >Blogs</RouterLink
              >
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <RouterLink class="nav-link" active-class="active" to="/login"
                >Login</RouterLink
              >
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <RouterLink class="nav-link" active-class="active" to="/register"
                >Register</RouterLink
              >
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <RouterLink class="nav-link" active-class="active" to="/create"
                >Create</RouterLink
              >
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <RouterLink class="nav-link" to="" @click="logout"
                >Logout</RouterLink
              >
            </li>
          </ul>
          <!-- </div> -->
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
