<template>
  <div class="hello">
    <div class="forumDiv">
      <b-breadcrumb class="breadItem">
        <b-breadcrumb-item @click="$bvModal.show('addPost'); clearPostModal()">
          <b-icon icon="newspaper" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
          New Post
        </b-breadcrumb-item>
        <b-modal id="addPost" size="lg" hide-footer>
          <template #modal-title>
            Add New Post
          </template>
          <label for="inputTopic"><b>Topic:</b></label>
          <b-form-input
            id="inputTopic"
            v-model="topic"
            :state="nameState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Topic"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 3 letters
          </b-form-invalid-feedback>
          <div id="editor" class="formEditor">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('addPost')">Close</b-button>
          <b-button class="mt-3" variant="success" block @click="$bvModal.hide('addPost'); insertTopic()">Finish</b-button>
        </b-modal>
        <b-breadcrumb-item >
          <b-icon icon="pencil" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
          Plan a Race</b-breadcrumb-item>
      </b-breadcrumb>
      <b-card-group columns>
        <b-card
          title="Card title that wraps to a new line"
          img-src="https://placekitten.com/g/400/450"
          img-alt="Image"
          img-top
          class="blogCard"
        >
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </b-card-text>
        </b-card>

        <b-card class="blogCard" header="Quote">
          <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </b-card>

        <b-card class="blogCard" title="Title" img-src="https://placekitten.com/500/350" img-alt="Image" img-top>
          <b-card-text>
            This card has supporting text below as a natural lead-in to additional content.
          </b-card-text>
          <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
        </b-card>

        <b-card class="blogCard" bg-variant="primary" text-variant="white">
          <blockquote class="card-blockquote">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer>
              <small>Someone famous in <cite title="Source Title">Source Title</cite></small>
            </footer>
          </blockquote>
        </b-card>

        <b-card class="blogCard">
          <b-card-title>Title</b-card-title>
          <b-card-text>
            This card has supporting text below as a natural lead-in to additional content.
          </b-card-text>
          <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
        </b-card>

        <b-card class="blogCard" img-src="https://picsum.photos/400/400/?image=41" img-alt="Image" overlay></b-card>

        <b-card class="blogCard" img-src="https://picsum.photos/400/200/?image=41" img-alt="Image" img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This card has even longer content than the first.
          </b-card-text>
          <template #footer>
            <small class="text-muted">Footer Text</small>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Blog',
  props: {
    msg: String
  },
  mounted() {

  },
  computed: {
    nameState() {
      return this.topic.length > 2 ? true : false
    },
  },
  data : function() {
    return {
      editor: ClassicEditor,
      topic: '',
      editorData: '',
      editorConfig: {
      // The configuration of the editor.
      },
    } 
  },
  methods: {
    clearPostModal(){
      this.topic = '';
      this.editorData = '';
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .blogCard {
    border: 1px solid;
  }
  .forumDiv{
    width: 80%;
    margin: 0 auto;
  }
  .breadItem{
    background-color: white;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  }
</style>
