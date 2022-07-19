<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 offset-md-2">
        <div class="card card-primary">
          <div class="card-header">
            <h5>Login</h5>
          </div>
          <form @submit.prevent="login">
            <div class="card-body">
              <div class="form-group my-3">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  name="email"
                  v-model.trim="email"
                />
              </div>
              <div class="form-group my-3">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  name="password"
                  v-model="password"
                />
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  watch: {
    isAuthenticated: function (newVal) {
      if (newVal) {
        return this.$router.replace(localStorage.getItem("pathToLoadAfterLogin") || '/');
      }
    },
  },
  methods: {
    login() {
      if (!this.email) return this.$swal("Please provide email");
      if (!this.password) return this.$swal("Please provide password");

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: "Ops",
            text: err.message,
          });
        });
    },
  },
};
</script>

<style></style>
