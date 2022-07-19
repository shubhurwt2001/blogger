<template>
  <div class="container">
    <div class="row" v-if="blogs.length > 0">
      <div
        class="col-md-6 my-3"
        v-for="(article, index) in blogs"
        :key="index"
        :article="article"
      >
        <div class="card">
          <div class="card-header">
            <h3>{{ article.data.title }}</h3>
          </div>
          <div class="card-body">
            <div
              class="card-text"
              v-html="
                article.data.content.length > 300
                  ? article.data.content.substring(0, 300 - 3) + '...'
                  : article.data.content
              "
            ></div>
            <p>
              <i
                ><b>Author : </b>{{ article.data.author }} <b>, </b>
                <b>Date : </b
                >{{
                  new Date(article.data.date).getDate() +
                  "/" +
                  (new Date(article.data.date).getMonth() + 1) +
                  "/" +
                  new Date(article.data.date).getFullYear()
                }}</i
              >
            </p>
            <a :href="`/blog/${article.id}`" class="btn btn-primary"
              >Read Blog</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-12 my-5">
        <h1>Loading.......</h1>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      blogs: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.fetchBlogs();
  },
  methods: {
    fetchBlogs() {
      const usersBlogList = firebase.database().ref("blogs/");
      usersBlogList.on("value", (data) => {
        this.blogs = [];
        Object.keys(data.val()).forEach((key) => {
          this.blogs.push({
            id: key,
            data: data.val()[key],
          });
        });
      });
    },
  },
};
</script>

<style></style>
