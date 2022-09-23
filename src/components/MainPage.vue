<template>
  <div class="hello">
    <div>
      <b-jumbotron class="jumbotronDiv">
        <div class="mainNewsArticle centerDiv" >
          <h1>
            Welcome to Formula 1 Community Portal
          </h1>
          <b-button pill class="userButton" variant="outline-info" v-b-modal.modal-login v-on:click="clearLoginModal()">Login</b-button>
          <b-button pill class="userButton" variant="outline-info" v-b-modal.modal-signUp v-on:click="clearSignUpModal()">Sign Up</b-button>

          <b-modal id="modal-login" centered title="Login">
            <label for="loginUsername"><b>Username:</b></label>
            <b-form-input
              id="loginUsername"
              v-model="loginUsername"
              placeholder="Enter your username"
            ></b-form-input>
            <label for="loginPassword"><b>Password:</b></label>
            <b-form-input
              id="loginPassword"
              v-model="loginPassword"
              placeholder="Enter your password"
              type="password"
            ></b-form-input>

            <template #modal-footer="{ ok, cancel }">
              <b-button size="sm" variant="success" @click="ok();login()">
                Login
              </b-button>
              <b-button size="sm" variant="danger" @click="cancel()">
                Cancel
              </b-button>
            </template>
          </b-modal>

          <b-modal id="modal-signUp" centered title="SignUp">
            <label for="signUpEmail"><b>Email:</b></label>
            <b-form-input
              id="signUpEmail"
              v-model="signUpEmail"
              placeholder="Enter your E-mail"
            ></b-form-input>

            <label for="signUpUsername"><b>Username:</b></label>
            <b-form-input
              id="signUpUsername"
              v-model="signUpUsername"
              placeholder="Enter your username"
              autocomplete="off"
            ></b-form-input>
            
            <label for="signUpPassword"><b>Password:</b></label>
            <b-form-input
              id="signUpPassword"
              v-model="signUpPassword"
              placeholder="Enter your password"
              type="password"
              autocomplete="off"
            ></b-form-input>

            <label for="signUpPasswordRepeat"><b>Repeat Password:</b></label>
            <b-form-input
              id="signUpPasswordRepeat"
              v-model="signUpPasswordRepeat"
              placeholder="Enter your password"
              type="password"
              :state="repeatePasswordValidator"
            ></b-form-input>

            <label for="signUpFullName"><b>Full Name:</b></label>
            <b-form-input
              id="signUpFullName"
              v-model="signUpFullName"
              placeholder="Enter your Full Name"
            ></b-form-input>

            <template #modal-footer="{ ok, cancel }">
              <b-button size="sm" variant="success" @click="ok();signUp()">
                Register
              </b-button>
              <b-button size="sm" variant="danger" @click="cancel()">
                Cancel
              </b-button>
            </template>
          </b-modal>
        </div>
        <!--<div class="mainNewsArticle" :style="{ 'background-image': 'url(' + this.mainArticles[0].articleImage + ')' }">
          <h3>
            {{this.mainArticles[0].article}}
          </h3>

          <b-button variant="success" :href="this.mainArticles[0].articleUrl" target="_blank">Read More...</b-button>
        </div>-->
        <div class="mainNewsArticle" >
            <b-embed
              type="iframe"
              aspect="16by9"
              src="https://www.youtube.com/embed/hGIYpA2rBxw"
              allowfullscreen
            ></b-embed>
        </div>
      </b-jumbotron>
    </div>
    <hr/>
    <h3>Season</h3>
    <div class="tabsDiv">
      <b-card no-body>
        <b-tabs content-class="mt-3" fill active-nav-item-class="font-weight-bold text-uppercase text-danger" small>
          <b-tab title="Previous">
            <div class="tabDiv">
              <p>Race Name: {{this.currentSeason[12].raceName}}</p>
              <p>Location: {{this.currentSeason[12].circuit.circuitLocation.country}}</p>
              <p>Date: {{this.currentSeason[12].date}}</p>
              <p>Time: {{this.currentSeason[12].time}}</p>
            </div >
            <div class="tabDiv">
              <GmapMap
                :center="{lat:parseInt(this.currentSeason[12].circuit.circuitLocation.latitude), lng: parseInt(this.currentSeason[12].circuit.circuitLocation.longitude)}"
                :zoom="7"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
              >
              </GmapMap>
            </div>
          </b-tab>
          <b-tab title="Current" active>            
            <div class="tabDiv">
              <p>Race Name: {{this.currentSeason[13].raceName}}</p>
              <p>Location: {{this.currentSeason[13].circuit.circuitLocation.country}}</p>
              <p>Date: {{this.currentSeason[13].date}}</p>
              <p>Time: {{this.currentSeason[13].time}}</p>
            </div>
            <div class="tabDiv">
              <GmapMap
                :center="{lat: parseInt(this.currentSeason[13].circuit.circuitLocation.latitude), lng: parseInt(this.currentSeason[13].circuit.circuitLocation.longitude)}"
                :zoom="7"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
              >
              </GmapMap>
            </div>
          </b-tab>
          <b-tab title="Next">            
            <div class="tabDiv">
              <p>Race Name: {{this.currentSeason[14].raceName}}</p>
              <p>Location: {{this.currentSeason[14].circuit.circuitLocation.country}}</p>
              <p>Date: {{this.currentSeason[14].date}}</p>
              <p>Time: {{this.currentSeason[14].time}}</p>
            </div>
            <div class="tabDiv">
              <GmapMap
                :center="{lat:parseInt(this.currentSeason[14].circuit.circuitLocation.latitude), lng: parseInt(this.currentSeason[14].circuit.circuitLocation.longitude)}"
                :zoom="7"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
              >
              </GmapMap>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <hr/>
    <h3>News</h3>
    <div class="cardsDiv">
      <b-card-group deck>
        <b-card class="newsClass" v-for="article in secondaryArticles" :key="article.index" :img-src="article.articleImage" img-alt="Image" img-top>
          
          <p>{{article.article}}</p>
          <template #footer>
           <a :href="article.articleUrl" target="_blank"><b-button variant="outline-primary" class="readMoreButton" block>Read More...</b-button></a>
          </template>
        </b-card>
      </b-card-group>
    </div>
    <hr/>
    <div class="carouselDiv">
      <b-input-group size="md" class="mb-2 searchHashtag">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="search" placeholder="Search hashtag" v-model="hashtag"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-info" @click="getSocialMedia(hashtag)">Search</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          img-width="1024"
          img-height="400"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="../assets/White_background.png"
              alt="image slot"
            >
          </template>
          <iframe border=0 frameborder=0 height=400 width=400
            :src="this.twitterUrls[0]"></iframe>

          <iframe border=0 frameborder=0 height=400 width=400
            :src="this.twitterUrls[1]"></iframe>
        </b-carousel-slide>


        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="../assets/White_background.png"
              alt="image slot"
            >
          </template>
          <iframe border=0 frameborder=0 height=400 width=400
            :src="this.twitterUrls[2]"></iframe>

          <iframe border=0 frameborder=0 height=400 width=400
            :src="this.twitterUrls[3]"></iframe>
        </b-carousel-slide>

        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="../assets/White_background.png"
              alt="image slot"
            >
          </template>
          <iframe border=0 frameborder=0 height=400 width=400
            :src="this.twitterUrls[4]"></iframe>

          <iframe border=0 frameborder=0 height=400 width=400
            :src="this.twitterUrls[5]"></iframe>
        </b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import { required } from 'vuelidate/lib/validators'
export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  data : function() {
    return {
      slide: 0,
      sliding: null,
      secondaryArticles: [],
      mainArticles: [],
      currentSeason: [],
      loginUsername: '',
      loginPassword: '',
      loginPasswordRepeat: '',
      signUpUsername: '',
      signUpPassword: '',
      signUpPasswordRepeat: '',
      signUpEmail: '',
      signUpFullName: '',
      twitterUrls: [],
      hashtag: "",
    } 
  },
  computed:{
      repeatePasswordValidator() {
        return this.signUpPasswordRepeat == this.signUpPassword ? true : false;
      }
  },
  mounted (){
    this.getArticles();
    this.getCurrentSeason();
    this.getSocialMedia("formula1");
  },
  methods: {
      clearLoginModal(){
        this.loginUsername = '';
        this.loginPassword = '';
      },
      clearSignUpModal(){
        this.signUpUsername = '';
        this.signUpPassword = '';
        this.signUpEmail = '';
        this.signUpFullName = '';
        this.signUpPasswordRepeat = '';
      },
      signUp(){
        let URL = 'portal/auth/signup';
        let promise = axios.post(URL, {
          username: this.signUpUsername,
          password: this.signUpPassword,
          email: this.signUpEmail
        })
        return promise.then((response) => {
            if(response.status == '200'){
              this.makeToast("SUCCESS", "success", response.data.message, 50000 )
              this.$root.$emit('bv::show::modal', 'modal-login', '#focusThisOnClose')
            }
          },
          ).catch(err => {
            this.makeToast(err.response.data.error, "info", err.response.data.message, 50000 )
                                    
          })
      },
      login(){
        let URL = 'portal/auth/signin';
        let promise = axios.post(URL, {
          username: this.loginUsername,
          password: this.loginPassword
        })
        return promise.then((response) => {
            if(response.status == '200'){
              this.$store.commit('setSessionID', response.data.accessToken);
              this.$store.commit('setUsername', response.data.username);
              this.$store.commit('setUserRole', response.data.roles);
              this.makeToast("SUCCESS", "success", "Login Complete", 50000 )
            }
          },
          ).catch(err => {
            this.makeToast(err.response.data.error, "info", err.response.data.message, 50000 )
                                    
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
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      getCurrentSeason() {
      let URL = 'portal/currentSeason';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            //this.drivers = response.data.drivers;
            this.currentSeason = response.data.currentSeason;
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    getArticles() {
      let URL = 'portal/news';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            //this.drivers = response.data.drivers;
            this.secondaryArticles = response.data.secondaryNews;
            this.mainArticles = response.data.mainNews;

          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    getSocialMedia(hashtag) {
      if(hashtag == null || hashtag == undefined || hashtag == ""){
        hashtag = "formula1"
      }
      let URL = 'portal/socialMedia?hashtag=' + hashtag;
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.status == '200'){
            this.twitterUrls = response.data.urls
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .readMoreButton{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
  .jumbotronDiv{
    border: 1px solid;
    background-image:url('../assets/animation.gif');
  
    height: 500px;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .cardsDiv{
    margin: 0 auto;
    width: 80%;
  }
  .tabsDiv{
    width: 80%;
    margin: 0 auto;
    margin-bottom:  3%;
    font-size: 20px;
  }
  hr{
    width: 80%;
  }
  .mainNewsArticle > h3{
    color: white;
  }
  .mainNewsArticle{
    float: left;
    width: 40%;
    opacity: 0.9;
  }
  .tabDiv{
    float: left;
    width: 49%;
    margin-bottom: 2%;
    font-size: 20px;
  }
  .tabDiv > p{
    text-align: center;

  }
  .hello{
    font-family: "Bahnschrift Condensed";
  }
  .centerDiv{
    margin-left: 20%;
  }
  .newsClass, .card-footer{
    border: none !important;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .card {
    background-color: white;

    border-left: none !important;
    border-bottom: none !important;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  h1{
    color:  white;
  }
  .userButton{
    width: 30%;
    margin-right: 2%;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }
  .card-header{
    background-color: white !important;
  }
  .carouselDiv{
    margin:  0 auto;
    width: 80%;
    margin-bottom: 1%;
  }
  iframe{
    float: left;
    margin-left: 1%;
  }
  .carousel-control-next-icon {
    background-image: url('../assets/next.png') !important;
  }
  .carousel-control-prev-icon {
    background-image: url('../assets/back.png') !important
  }
  .userButton {
    background-color: transparent;
    border: 3px solid #00d7c3;
    border-radius: 50px;
    -webkit-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
    color: #00d7c3;
  }
  .userButton:hover {
    box-shadow: 0 0 10px 0 #00d7c3 inset, 0 0 20px 2px #00d7c3;
    border: 3px solid #00d7c3;
  }
  .searchHashtag {
    width: 30%;
    margin-bottom: -10%;
  }

  @media only screen and (max-width: 800px) {
      .userButton {
          width: 100px;
      }
  }

</style>
