<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 my-5">
        <h3>Create Blog</h3>
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
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            >
              h1
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            >
              h2
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            >
              h3
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            >
              h4
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            >
              h5
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
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
            <button type="button" @click="editor.chain().focus().undo().run()">
              undo
            </button>
            <button type="button" @click="editor.chain().focus().redo().run()">
              redo
            </button>
          </div>
          <editor-content :editor="editor" v-model="blog" />
          <div class="mt-4">
            <button class="btn btn-lg btn-primary" type="submit">Submit</button>
          </div>
        </form>
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
      editor: null,
      title: null,
      blog: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.editor = new Editor({
      content: "<p>Start writing your blog. 🎉</p>",
      extensions: [StarterKit],
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
  methods: {
    saveBlog() {
      if (!this.title) return this.$swal("Please enter a title");
      if (!this.editor.getText().trim()) return this.$swal("Blog is empty");

      const usersBlogList = firebase.database().ref("blogs/");
      usersBlogList
        .push({
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
            text: "Blog published successfully.",
          });
          this.$router.replace("/");
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

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  margin-top: 20px;
  padding: 10px;
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
button {
  font-size: inherit;
  font-family: inherit;
  color: rgb(0, 0, 0);
  accent-color: black;
  margin: 0.1rem;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-image: initial;
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  background: white;
}
</style>
