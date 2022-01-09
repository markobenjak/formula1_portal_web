<template>
  <div class="hello">
    <div>
      <b-jumbotron class="jumbotronDiv">
        <div class="mainNewsArticle centerDiv" >
          <h1>
            Welcome to Formula 1 Community Portal
          </h1>
          <b-button pill class="userButton" variant="outline-info" >Login</b-button>
          <b-button pill class="userButton" variant="outline-info" >Sign Up</b-button>
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
            src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
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
              <p>Race Name: {{this.currentSeason[0].raceName}}</p>
              <p>Location: {{this.currentSeason[0].circuit.circuitLocation.country}}</p>
              <p>Date: {{this.currentSeason[0].date}}</p>
              <p>Time: {{this.currentSeason[0].time}}</p>
            </div >
            <div class="tabDiv">
              <GmapMap
                :center="{lat:parseInt(this.currentSeason[0].circuit.circuitLocation.latitude), lng: parseInt(this.currentSeason[0].circuit.circuitLocation.longitude)}"
                :zoom="7"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
              >
              </GmapMap>
            </div>
          </b-tab>
          <b-tab title="Current" active>            
            <div class="tabDiv">
              <p>Race Name: {{this.currentSeason[1].raceName}}</p>
              <p>Location: {{this.currentSeason[1].circuit.circuitLocation.country}}</p>
              <p>Date: {{this.currentSeason[1].date}}</p>
              <p>Time: {{this.currentSeason[1].time}}</p>
            </div>
            <div class="tabDiv">
              <GmapMap
                :center="{lat: parseInt(this.currentSeason[1].circuit.circuitLocation.latitude), lng: parseInt(this.currentSeason[1].circuit.circuitLocation.longitude)}"
                :zoom="7"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
              >
              </GmapMap>
            </div>
          </b-tab>
          <b-tab title="Next">            
            <div class="tabDiv">
              <p>Race Name: {{this.currentSeason[2].raceName}}</p>
              <p>Location: {{this.currentSeason[2].circuit.circuitLocation.country}}</p>
              <p>Date: {{this.currentSeason[2].date}}</p>
              <p>Time: {{this.currentSeason[2].time}}</p>
            </div>
            <div class="tabDiv">
              <GmapMap
                :center="{lat:parseInt(this.currentSeason[2].circuit.circuitLocation.latitude), lng: parseInt(this.currentSeason[2].circuit.circuitLocation.longitude)}"
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
           <a :href="article.articleUrl" target="_blank"><b-button variant="outline-primary" block>Read More...</b-button></a>
          </template>
        </b-card>
      </b-card-group>
    </div>
    <hr/>
    <div class="carouselDiv">
      <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="200"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>


          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
          </b-carousel-slide>

          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
            </p>
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
    } 
  },
   mounted (){
    this.getArticles();
    this.getCurrentSeason();
  },
  methods: {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  }
  hr{
    width: 80%;
  }
  .mainNewsArticle > h3{
    color: white;
  }
  .mainNewsArticle{
    float: left;
    width: 30%;
  }
  .tabDiv{
    float: left;
    width: 49%;
    margin-bottom: 2%;
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
    box-shadow: 10px 10px 5px #aaaaaa;
  }
  .card {
    background-color: white;
    border-top:    5px solid red;
    border-right:  5px solid red; 
    border-left: none !important;
    border-bottom: none !important;
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
    margin-top: 3%;
    margin-bottom: 10%;
  }
</style>
