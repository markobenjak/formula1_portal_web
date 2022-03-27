<template>
  <div class="hello">
    <div class="forumActions">
        <b-button block variant="primary" v-if="userName != ''"  @click="$bvModal.show('addTopic'); clearTopicModal()">Add Topic</b-button>
          <b-modal id="addTopic" size="lg" hide-footer>
            <template #modal-title>
              Add New Topic
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
            <b-button class="mt-3" block @click="$bvModal.hide('addTopic')">Close</b-button>
            <b-button class="mt-3" variant="success" block @click="$bvModal.hide('addTopic'); insertTopic()">Finish</b-button>
          </b-modal>
    </div>
    <div class="accordion" role="tablist" v-for="item in allTopics" :key="item.id">
        <b-card no-body class="mb-1 forumCard" v-if="(userRole != null && item.approved == 1) || userRole.includes('ROLE_MODERATOR')  || userRole.includes('ROLE_ADMIN')">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block @click="openCollapse(item.id)" :variant="userRole.includes('ROLE_MODERATOR')  || userRole.includes('ROLE_ADMIN') ? item.approved == 0 ? 'outline-danger' : 'outline-success' : 'light'">
              <span class="postOwner">created by: {{item.topicOwner}}</span>
              {{item.topic}} 
              <span class="postDate">created: {{item.creation_date}}</span></b-button>
          </b-card-header>
          <b-collapse :id="item.id" :accordion="item.id" role="tabpanel">
            <b-card-body>
              <div class="contentDiv" v-html="item.content"></div>
              <hr/>
                <b-card
                  no-body 
                  class="commentCards"
                  v-for="comment in item.forumComments"  :key="comment.id"
                >
                  <b-card-text v-html="comment.comment"></b-card-text>
                  <b-card-footer class="commentFooter">
                    <p class="userComment">User: {{comment.comment_owner}}</p>
                    <p class="dateComment">Date: {{comment.creation_date}}</p>
                    <b-button class="mt-3" block variant="outline-info" v-if="userRole.includes('ROLE_MODERATOR') || userRole.includes('ROLE_ADMIN')" @click="deleteComment(comment.id)">Delete Comment</b-button>
                  </b-card-footer>
                </b-card>
            </b-card-body>
            <div class="actionButtonsDiv">
              <b-button variant="outline-warning" v-if="userRole.includes('ROLE_MODERATOR') || userRole.includes('ROLE_ADMIN')" class="actionButtons" @click="approveOrDeleteTopic(false, item.id)">Delete</b-button>
              <b-button variant="outline-success" v-if="userRole.includes('ROLE_MODERATOR') || userRole.includes('ROLE_ADMIN')" class="actionButtons" @click="approveOrDeleteTopic(true, item.id)" :disabled="item.approved == 1">Approve</b-button>
              
              <b-button variant="outline-success" class="actionButtons"  @click="$bvModal.show('addComment' + item.id); clearCommentModal()"  v-if="userRole != null && item.approved == 1">Comment</b-button>
              <b-modal :id="'addComment' + item.id" size="lg" hide-footer>
                <template #modal-title>
                 Comment on:<b> {{item.topic}}</b>
                </template>
                <div id="editor" class="formEditor">
                  <ckeditor :editor="editor" v-model="editorDataComment" :config="editorConfig"></ckeditor>
                </div>
                <b-button class="mt-3" block @click="$bvModal.hide('addComment' + item.id)">Close</b-button>
                <b-button class="mt-3" variant="success" block @click="$bvModal.hide('addComment' + item.id); insertComment(item.id)">Finish</b-button>
              </b-modal>

            </div>
          </b-collapse>
        </b-card>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Forum',
  props: {
    msg: String
  },
  computed: {
    nameState() {
      return this.topic.length > 2 ? true : false
    },
    userName () {
        return this.$store.state.user.username
    },
    userRole () {
      return this.$store.state.user.userRole
    },
  },
  mounted (){
    this.getAllTopics();
  },
  data : function() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorDataComment: '',
      editorConfig: {
      // The configuration of the editor.
      },
      topic: '',
      allTopics: []

    } 
  },
  methods: {
    clearTopicModal(){
      this.topic = '';
      this.editorData = '';
    },
    clearCommentModal(){
      this.editorDataComment = '';
    },
    openCollapse(id){
      this.$root.$emit('bv::toggle::collapse', id)
    },
    getAllTopics() {
      let URL = 'portal/getAllTopics';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.status == '200'){
            this.allTopics = response.data.forumTopics
            console.log(this.allTopics)
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    insertComment(topicid) {
      let URL = 'portal/insertComment';
      let promise = axios.post(URL,{
        topicId: topicid,
        comment: this.editorDataComment,
        commentOwner: this.userName
      })
      return promise.then((response) => {
        if(response.status == 200){
          this.makeToast("Comment successful", "success", response.data.message, 30000);
          this.getAllTopics();
        }else{
          alert('ALERT');
        }

      },
      ).catch(err => {
        alert('ALERTR');
      })
    },
    deleteComment(commentId) {
      let URL = 'portal/deleteComment';
      let promise = axios.delete(URL,{
        data: {
          commentId: commentId
        }
      })
      return promise.then((response) => {
        if(response.status == 200){
          this.makeToast("Comment Deleted", "success", response.data.message, 30000);
          this.getAllTopics();
        }else{
          alert('ALERT');
        }

      },
      ).catch(err => {
        alert('ALERTR');
      })
    },
    insertTopic() {
      let URL = 'portal/insertTopic';
      let promise = axios.post(URL,{
        topic: this.topic,
        content: this.editorData,
        topicOwner: this.userName
      })
      return promise.then((response) => {
        if(response.status == 200){
          this.makeToast("Topic Created", "success", response.data.message, 30000);
          this.getAllTopics();
        }else{
          alert('ALERT');
        }

      },
      ).catch(err => {
        alert('ALERTR');
      })
    },
    approveOrDeleteTopic(approveValue, item) {
      let URL = 'portal/approveTopic';
      let promise = axios.post(URL,{
        approveValue: approveValue,
        topicID: item
      })
      return promise.then((response) => {
        if(response.status == 200){
          this.makeToast("Topic Created", "success", response.data.message, 30000);
          this.getAllTopics();
        }else{
          alert('ALERT');
        }

      },
      ).catch(err => {
        alert('ALERTR');
      })
    },
    makeToast(title, variant, content, delay) {
      this.$bvToast.toast(content, {
          title: title,
          toaster: 'b-toaster-top-center',
          variant: variant,
          solid: true,
          "auto-hide-delay": delay
      })
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .postDate{
    float: right;
    color: black;
    opacity: 0.5;
  }
  .postOwner{
    float: left;
    color: black;
    opacity: 0.5;
  }
  .forumCard {
    border: none;
    text-align: left;

  }
  .accordion{
    margin: 0 auto;
    width: 80%;
  }
  .forumActions{
    margin: 0 auto;
    width: 80%;
  }
  .formEditor{
    margin-top: 15px;
    margin-bottom: 15px;
    height:  500px;
  }
  .ck-content { 
    height: 450px;
  }
  .actionButtonsDiv{
    float: right;
    width: 40%;
  }
  .actionButtons{
    width: 32%;
    margin-right: 1%;
  }
  .commentCards {
    border: none;
    margin-bottom: 1%;
    box-shadow: none;
  }
  .userComment{
    float: left;
    opacity: 0.5;
  }
  .dateComment{
    float: right;
    opacity: 0.5;
  }
  .contentDiv{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 1%;
  }
  .commentFooter{
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
  }
</style>
