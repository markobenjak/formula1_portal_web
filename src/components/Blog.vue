<template>
  <div class="hello">
    <div class="forumDiv">
      <b-breadcrumb class="breadItem">
        <b-breadcrumb-item @click="$bvModal.show('addPost'); clearPostModal()" v-if="userRole.includes('ROLE_MODERATOR')  || userRole.includes('ROLE_ADMIN')">
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
            <ckeditor :editor="editor" v-model="editorDataPost" :config="editorConfig"></ckeditor>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('addPost')">Close</b-button>
          <b-button class="mt-3" variant="success" block @click="$bvModal.hide('addPost'); insertBlogPost()">Post</b-button>
        </b-modal>
        <b-breadcrumb-item  @click="$bvModal.show('addPlanRace'); clearPlanModal()" v-if="userRole.includes('ROLE_MODERATOR')  || userRole.includes('ROLE_ADMIN')">
          <b-icon icon="pencil" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
          Plan a Race
        </b-breadcrumb-item>
        <b-breadcrumb-item  @click="filterPosts(1)">
          <b-icon icon="award-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
          Show Race Plans Only
        </b-breadcrumb-item>
        <b-breadcrumb-item  @click="filterPosts(2)" >
          <b-icon icon="award" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
          Show Blog Posts Only
        </b-breadcrumb-item>
        <b-breadcrumb-item @click="filterPosts(3)">
          <b-icon icon="binoculars" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
          Show All
        </b-breadcrumb-item>
        <b-modal id="addPlanRace" size="lg" hide-footer>
          <template #modal-title>
            Plan A Race
          </template>

          <label for="inputRaceTitle"><b>Title:</b></label>
          <b-form-input
            id="inputRaceTitle"
            v-model="raceTile"
            :state="nameStateRace"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Title"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 3 letters
          </b-form-invalid-feedback>

          <label for="example-input">From: </label>
          <b-input-group class="mb-3">
            <b-form-input
              id="example-input"
              v-model="valueFromDate"
              type="text"
              placeholder="YYYY-MM-DD"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                v-model="valueFromDate"
                button-only
                right
                locale="en-US"
                aria-controls="example-input"
                @context="onContextFrom"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>

          <label for="example-input">To: </label>
          <b-input-group class="mb-3">
            <b-form-input
              id="example-input"
              v-model="valueToDate"
              type="text"
              placeholder="YYYY-MM-DD"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                v-model="valueToDate"
                button-only
                right
                locale="en-US"
                aria-controls="example-input"
                @context="onContextTo"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
          <GmapAutocomplete
            @place_changed='setPlace'
          />
          <button
            @click='addMarker'
          >
            Add
          </button>
          <GmapMap
            :center='center'
            :zoom="12"
            style="width: 100%; height: 300px"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              @click="center=m.position"
            />
          </GmapMap>
          <br/>
          <label for="example-input"><b>Trip Description: </b></label>
          <br/>
          <div id="editor" class="formEditor">
            <ckeditor :editor="editor" v-model="editorDataRacePlan" :config="editorConfig"></ckeditor>
          </div>

          <label for="inputPrice"><b>Price:</b></label>
          <b-form-input
            id="inputPrice"
            v-model="price"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Price"
            trim
          ></b-form-input>

          <label for="inputPrice"><b>Contact Phone:</b></label>
          <b-form-input
            id="contactPhone"
            v-model="contactPhone"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Phone"
            trim
          ></b-form-input>

          <label for="inputPrice"><b>Contact Email:</b></label>
          <b-form-input
            id="contactEmail"
            v-model="contactEmail"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Email"
            trim
          ></b-form-input>

          <b-button class="mt-3" block @click="$bvModal.hide('addPlanRace')">Close</b-button>
          <b-button class="mt-3" variant="success" block @click="$bvModal.hide('addPlanRace'); insertRacePlan()">Post</b-button>
        </b-modal>
      </b-breadcrumb>
      <b-card-group columns>
        <b-card class="blogRacePlanCard" :header="item.title" v-for="item in allRacePlans" :key="item.id" @click="fillPlanModal(item); $bvModal.show('racePlanDetails')">
          <blockquote class="blockquote mb-0">
            <div class="raceDescDiv">
              <p class="raceParagraph">From: <b>{{item.from}}</b></p>
              <p class="raceParagraph">To: <b>{{item.to}}</b></p>
              <p class="raceParagraph">Price: <b>{{item.price}}</b></p>
            </div>
            <p> I am here: {{item.latitude}}
            </p>
            <div class="raceDescDiv">
              <GmapMap
                :center="{lat:parseFloat(item.latitude), lng:(item.longitude)}"
                :zoom="12"
                style="width: 100%; height: 200px"
              >
              </GmapMap>
            </div>
            <footer class="cardFooter blockquote-footer">
              Created By: <b>{{item.planOwner}}</b> on <cite title="Source date">{{item.creation_date}}</cite>
            </footer>
          </blockquote>
        </b-card>
        <b-card class="blogPostCard" :header="item.title" v-for="item in allBlogPosts" :key="item.id" @click="fillBlogPostModal(item); $bvModal.show('blogPostDetails')">
          <blockquote class="blockquote mb-0">
            <b-card-text v-html="substringTest(item.content)"></b-card-text>
            <footer class="cardFooter blockquote-footer">
              Created By: <b>{{item.postOwner}}</b> on <cite title="Source date">{{item.creation_date}}</cite>
            </footer>
          </blockquote>
        </b-card>
      </b-card-group>
      <b-modal id="racePlanDetails" size="lg">
        <template #modal-title>
          Race Plan Details
        </template>
          <h4>{{planTitle}}</h4>
          <br/>
          <GmapMap
            :center="{lat:planLat, lng:planLng}"
            :zoom="12"
            style="width: 100%; height: 200px"
          >
          </GmapMap>
          <br/>
          <br/>
          <h6>Date From:</h6>
          <p>{{planFrom}}</p>
          <h6>Date To:</h6>
          <p>{{planTo}}</p>
          <br/>
          <hr/>
          <h6>Trip plan:</h6>
          <b-card-text v-html="planContent"></b-card-text>
          <hr/>
          <br/>
          <h6>Price: {{planPrice}}</h6>
          <h6>Phone: {{planPhone}}</h6>
          <h6>Email: {{planEmail}}</h6>
          <template #modal-footer>
            <b-button
              variant="danger"
              class="modalButtons"
              size="sm"
              block
              @click="deleteRacePlan(planId); $bvModal.hide('racePlanDetails')"
              v-if="userRole.includes('ROLE_ADMIN', 'ROLE_MODERATOR')"
            >
              Delete
            </b-button>
            <b-button
              variant="primary"
              class="modalButtons"
              block 
              size="sm"
              @click="$bvModal.hide('racePlanDetails')"
            >
              Close
            </b-button>
            <b-button
              variant="warning"
              class="modalButtons"
              block 
              size="sm"
              @click="$bvModal.show('sendEmail')"
            >
              Sign Up
            </b-button>

            <b-modal id="sendEmail" size="lg">
              <form ref="form" @submit.prevent="sendEmail">
                <label>Name</label>
                <input type="text" name="name">
                <label>Email</label>
                <input type="email" name="email">
                <label>Message</label>
                <textarea name="message"></textarea>
                <input type="submit" value="Send">
              </form>
            </b-modal>
        </template>
      </b-modal>
      <b-modal id="blogPostDetails" size="lg">
        <template #modal-title>
          {{blogPostTitle}}
        </template>
          <br/>
          <b-card-text v-html="blogPostContent"></b-card-text>
          <template #modal-footer>
            <b-button
              variant="danger"
              class="modalButtons"
              size="sm"
              block
              @click="deleteBlogPost(blogPostId); $bvModal.hide('blogPostDetails')"
              v-if="userRole.includes('ROLE_ADMIN', 'ROLE_MODERATOR')"
            >
              Delete
            </b-button>
            <b-button
              variant="primary"
              class="modalButtons"
              block 
              size="sm"
              @click="$bvModal.hide('blogPostDetails')"
            >
              Close
            </b-button>
          </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import { required } from 'vuelidate/lib/validators'
import emailjs from 'emailjs-com';
export default {
  name: 'Blog',
  props: {
    msg: String
  },
  mounted() {
    this.geolocate();
    this.getAllRacePlans();
    this.getAllBlogPosts();
  },
  computed: {
    nameState() {
      return this.topic.length > 2 ? true : false
    },
    nameStateRace(){
      return this.raceTile.length > 2 ? true : false
    },
    userName () {
      if(this.$store.state.user.username == '')
        return 'test'
      else
        return this.$store.state.user.username
    },
    userRole () {
      return this.$store.state.user.userRole
    },
  },
  data : function() {
    return {
      price: '',
      editor: ClassicEditor,
      topic: '',
      editorDataRacePlan: '',
      editorDataPost: '',
      editorConfig: {
      // The configuration of the editor.
      },
      raceTile: '',
      valueFromDate: '',
      formattedFromDate: '',
      selectedFromDate: '',
      valueToDate: '',
      formattedToDate: '',
      selectedToDate: '',
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
      allRacePlans: [],
      allBlogPosts: [],
      contactEmail: '',
      contactPhone: '',
      planTitle: '',
      planLat: 0.0,
      planLng: 0.0,
      planTo: '',
      planFrom: '',
      planContent: '',
      planPrice: '',
      planPhone: '',
      planEmail: '',
      planId: null,
      blogPostContent: '',
      blogPostTitle: '',
      name: '',
      email: '',
      message: ''
    } 
  },
  methods: {
    sendEmail(e) {
        var templateParams = {
             name: this.name,
             email: this.email,
             message: this.message
          };
          emailjs.sendForm('service_x1o5xle', 'template_jt0otml',  this.$refs.form, 'vZRwejEA4VXc2Op2k')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
        // Reset form field
        this.name = ''
        this.email = ''
        this.message = ''
    },
    filterPosts(value){
      if(value == 1){
        this.allBlogPosts = [];
        this.getAllRacePlans();
      }
      else if(value == 2){
        this.allRacePlans = [];
        this.getAllBlogPosts();
      }
      else if(value == 3){
          this.getAllRacePlans();
          this.getAllBlogPosts();
        }
    },
    substringTest(value){
      console.log('here')
      if(value != null && value.length > 500)
        return value.substring(0, 500) + "...";
      else
        return value;
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
    deleteBlogPost(blogId) {
      let URL = 'portal/deleteBlogPost';
      let promise = axios.delete(URL,{
        data: {
          blogPostId: blogId
        }
      })
      return promise.then((response) => {
        if(response.status == 200){
          this.makeToast("Topic Created", "success", response.data.message, 30000);
          this.getAllRacePlans();
          this.getAllBlogPosts();
        }else{
          alert('ALERT');
        }

      },
      ).catch(err => {
        alert('ALERTR');
      })
    },
    deleteRacePlan(racePlanId) {
      let URL = 'portal/deleteRacePlan';
      let promise = axios.delete(URL,{
        data: {
          racePlanId: racePlanId
        }
      })
      return promise.then((response) => {
        if(response.status == 200){
          this.makeToast("Blog Post Deleted", "success", response.data.message, 30000);
          this.getAllRacePlans();
          this.getAllBlogPosts();
        }else{
          alert('ALERT');
        }

      },
      ).catch(err => {
        alert('ALERTR');
      })
    },
    fillBlogPostModal(item){
      this.blogPostTitle = item.title;
      this.blogPostContent = item.content;
      this.blogPostId = item.id;
    },
    fillPlanModal(item){
      this.planTitle = item.title;
      this.planLat = item.latitude;
      this.planLng = item.longitude;
      this.planTo = item.to;
      this.planFrom = item.from;
      this.planContent = item.content;
      this.planPrice = item.price;
      this.planPhone = item.contactPhone;
      this.planEmail = item.contactEmail;
      this.planId = item.id;
    },
    getAllBlogPosts() {
      let URL = 'portal/getAllBlogPosts';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.status == '200'){
            this.allBlogPosts = response.data.blogPosts
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    getAllRacePlans() {
      let URL = 'portal/getAllRacePlans';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.status == '200'){
            this.allRacePlans = response.data.racePlans
            console.log(this.allRacePlans)
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    insertBlogPost(){
      let URL = 'portal/insertBlogPost';
      let promise = axios.post(URL,{
        topic: this.topic,
        blogContent: this.editorDataPost,
        userName: this.userName
      })
      return promise.then((response) => {
        if(response.status == 200){
          this.getAllRacePlans();
          this.makeToast("Topic Created", "success", response.data.message, 30000);
          this.getAllBlogPosts();
        }else{
          alert('ALERT');
        }

      },
      ).catch(err => {
        alert('ALERTR');
      })
    },
    insertRacePlan(){
      let URL = 'portal/insertRace';
      let promise = axios.post(URL,{
        title: this.raceTile,
        planDescription: this.editorDataRacePlan,
        planOwner: this.userName,
        price: this.price,
        from: this.selectedFromDate,
        to: this.selectedToDate,
        marker: this.markers,
        contactPhone: this.contactPhone,
        contactEmail: this.contactEmail
      })
      return promise.then((response) => {
        if(response.status == 200){
          this.getAllRacePlans();
          this.getAllBlogPosts();
          this.makeToast("Race Plan Created", "success", response.data.message, 30000);
          //this.getAllTopics();
        }else{
          alert('ALERT');
        }

      },
      ).catch(err => {
        alert('ALERTR');
      })
    },
    setPlace(place) {
      this.currentPlace = place;
      console.log('here2')
      console.log(this.currentPlace)
    },
    addMarker() {
      console.log('here')
      console.log(this.currentPlace)
      if (this.currentPlace) {
        console.log('here3')
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
      console.log(this.center)
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    clearPostModal(){
      this.topic = '';
      this.editorDataPost = '';
    },
    clearPlanModal(){
      this.raceTile= '';
      this.editorDataRacePlan= '';
      this.userName= '';
      this.price= '';
      this.selectedFromDate= '';
      this.selectedToDate= '';
      this.markers= [];
      this.contactPhone= '';
      this.contactEmail= '';
    },
    onContextFrom(ctx) {
      this.formattedFromDate = ctx.selectedFormatted
      this.selectedFromDate = ctx.selectedYMD
    },
    onContextTo(ctx) {
      this.formattedToDate = ctx.selectedFormatted
      this.selectedToDate = ctx.selectedYMD
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
    .modalButtons{
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    .blogRacePlanCard {
      border: none;
      background-color: #FCFCFC;
    }
    .blogRacePlanCard::before,
    .blogRacePlanCard::after {
      content: '';
      height: 14px;
      width: 14px;
      position: absolute;
      transition: all .35s ease;
      opacity: 0;
    }

    .blogRacePlanCard::before {
      content: '';
      right: 0;
      top: 0;
      border-top: 3px solid #3E8914;
      border-right: 3px solid #2E640F;
      transform: translate(-100%, 50%);
    }

    .blogRacePlanCard:after {
      content: '';
      left: 0;
      bottom: 0;
      border-bottom: 3px solid #2E640F;
      border-left: 3px solid #3E8914;
      transform: translate(100%, -50%)
    }

    .blogRacePlanCard:hover:before,
    .blogRacePlanCard:hover:after{
      transform: translate(0,0);
      opacity: 1;
    }

    .blogRacePlanCard:hover {
      border: none;
      box-shadow: 0 0 5px #3DA35D;
    }

    .forumDiv{
      width: 80%;
      margin: 0 auto;
    }
    .breadItem{
      background-color: white;
      box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
      margin-bottom: 3%;
      margin-top: 1%;
      font-size: 15px;
    }
    .pac-container { z-index: 10000 !important; }
    .raceParagraph{
      text-align: left;
      color: #6c757d
    }
    .raceDescDiv{
      width: 50%;
      float: left;
    }
    .cardFooter{
      clear: both;
    }

    .blogPostCard {
      border: none;
      background-color: #FCFCFC;
    }
    .blogPostCard::before,
    .blogPostCard::after {
      content: '';
      height: 14px;
      width: 14px;
      position: absolute;
      transition: all .35s ease;
      opacity: 0;
    }

    .blogPostCard::before {
      content: '';
      right: 0;
      top: 0;
      border-top: 3px solid #909920;
      border-right: 3px solid #909920;
      transform: translate(-100%, 50%);
    }

    .blogPostCard:after {
      content: '';
      left: 0;
      bottom: 0;
      border-bottom: 3px solid #909920;
      border-left: 3px solid #909920;
      transform: translate(100%, -50%)
    }

    .blogPostCard:hover:before,
    .blogPostCard:hover:after{
      transform: translate(0,0);
      opacity: 1;
    }

    .blogPostCard:hover {
      border: none;
      box-shadow: 0 0 5px #C7D700;
    }

    /*.breadcrumb-item+.breadcrumb-item::before{content:var(--bs-breadcrumb-divider,">") !important ;}*/


    * {box-sizing: border-box;}

    .container {
      display: block;
      margin:auto;
      text-align: center;
      border-radius: 5px;
      background-color: #f2f2f2;
      padding: 20px;
      width: 50%;
    }

    label {
      float: left;
    }

    input[type=text], [type=email], textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      margin-top: 6px;
      margin-bottom: 16px;
      resize: vertical;
    }

    input[type=submit] {
      background-color: #4CAF50;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    input[type=submit]:hover {
      background-color: #45a049;
    }
  </style>
