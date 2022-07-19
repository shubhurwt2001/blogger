<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 my-5" v-if="blog">
        <div v-if="myBlog">
          <form @submit.prevent="saveBlog">
            <div class="mt-5">
              <h6>Title :</h6>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control"
                v-model="title"
              />
            </div>
            <div v-if="editor" class="mt-3">
              <h6>Blog :</h6>
              <button
                type="button"
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
              >
                bold
              </button>
              <button
                type="button"
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
              >
                italic
              </button>
              <button
                type="button"
                @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }"
              >
                strike
              </button>
              <button
                type="button"
                @click="editor.chain().focus().toggleCode().run()"
                :class="{ 'is-active': editor.isActive('code') }"
              >
                code
              </button>
              <button
                type="button"
                @click="editor.chain().focus().unsetAllMarks().run()"
              >
                clear marks
              </button>
              <button
                type="button"
                @click="editor.chain().focus().clearNodes().run()"
              >
                clear nodes
              </button>
              <button
                type="button"
                @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }"
              >
                paragraph
              </button>
              <button
                type="button"
                @click="
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 1 }),
                }"
              >
                h1
              </button>
              <button
                type="button"
                @click="
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 2 }),
                }"
              >
                h2
              </button>
              <button
                type="button"
                @click="
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 3 }),
                }"
              >
                h3
              </button>
              <button
                type="button"
                @click="
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 4 }),
                }"
              >
                h4
              </button>
              <button
                type="button"
                @click="
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 5 }),
                }"
              >
                h5
              </button>
              <button
                type="button"
                @click="
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 6 }),
                }"
              >
                h6
              </button>
              <button
                type="button"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
              >
                bullet list
              </button>
              <button
                type="button"
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }"
              >
                ordered list
              </button>
              <button
                type="button"
                @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }"
              >
                code block
              </button>
              <button
                type="button"
                @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }"
              >
                blockquote
              </button>
              <button
                type="button"
                @click="editor.chain().focus().setHorizontalRule().run()"
              >
                horizontal rule
              </button>
              <button
                type="button"
                @click="editor.chain().focus().setHardBreak().run()"
              >
                hard break
              </button>
              <button
                type="button"
                @click="editor.chain().focus().undo().run()"
              >
                undo
              </button>
              <button
                type="button"
                @click="editor.chain().focus().redo().run()"
              >
                redo
              </button>
            </div>
            <editor-content :editor="editor" />
            <div class="mt-4">
              <button class="btn btn-lg btn-primary" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
        <div v-else>
          <h1 class="px-1 bg-light">{{ title }}</h1>
          <p class="px-1">
            <i
              ><b>Author : </b>{{ author }} <b>,</b> <b>Date : </b
              >{{
                new Date(date).getDate() +
                "/" +
                (new Date(date).getMonth() + 1) +
                "/" +
                new Date(date).getFullYear()
              }}</i
            >
          </p>
          <div class="mt-4 px-1" v-html="blog"></div>
        </div>
      </div>
      <div class="col-md-12 mt-5" v-else>
        <h1 class="px-1 bg-light">Loading.........</h1>
      </div>
    </div>
  </div>
</template>
<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { mapGetters } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      title: null,
      blog: null,
      date: null,
      author: null,
      myBlog: false,
      editor: null,
    };
  },
  mounted() {
    this.getBlog();
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    getBlog() {
      const usersBlogList = firebase
        .database()
        .ref("blogs/" + this.$route.params.id);

      usersBlogList.on("value", (data) => {
        if (data.val()) {
          this.title = data.val().title;
          this.blog = data.val().content;
          this.author = data.val().author;
          this.date = data.val().date;
          if (this.user && this.user.uid === data.val().userID) {
            this.myBlog = true;
            if (this.editor) {
              this.editor.destroy();
            }
            this.editor = new Editor({
              content: this.blog,
              extensions: [StarterKit],
            });
          }
        } else {
          this.$router.replace("/page-not-found");
        }
      });
    },

    saveBlog() {
      if (!this.title) return this.$swal("Please enter a title");
      if (!this.editor.getText().trim()) return this.$swal("Blog is empty");

      const usersBlogList = firebase
        .database()
        .ref("blogs/" + this.$route.params.id);
      usersBlogList
        .update({
          author: this.user.email,
          title: this.title,
          content: this.editor.getHTML(),
          date: Date.now(),
          userID: this.user.uid,
        })
        .then((res) => {
          this.$swal({
            title: "Hurray!",
            icon: "success",
            text: "Blog updated successfully.",
          });
          //   this.$router.replace("/");
        })
        .catch((err) => {
          this.$swal({
            title: "Ops!",
            icon: "error",
            text: err.message,
          });
        });
    },
  },
};
</script>
