<template>
  <div class="hello">
    <div class="jumbotronDiv">
      <b-jumbotron class="jumbotronDiv">
        <template #header>BootstrapVue</template>

        <template #lead>
          This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
          featured content or information.
        </template>

        <hr class="my-4">

        <p>
          It uses utility classes for typography and spacing to space content out within the larger
          container.
        </p>

        <b-button variant="primary" href="#">Do Something</b-button>
        <b-button variant="success" href="#">Do Something Else</b-button>
      </b-jumbotron>
    </div>
    <hr/>
    <h3>Season</h3>
    <div class="tabsDiv">
      <b-card no-body>
        <b-tabs card content-class="mt-3" fill active-nav-item-class="font-weight-bold text-uppercase text-danger" small>
          <b-tab title="Previous"><p>I'm the first tab</p></b-tab>
          <b-tab title="Current" active><p>I'm the second tab</p></b-tab>
          <b-tab title="Next"><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
      </b-card>
    </div>
    <hr/>
    <h3>Community</h3>
    <div class="carouselDiv">
      <b-card-group deck>
        <b-card class="newsClass" v-for="article in articles" :key="article.index" :title="article.article" :img-src="article.articleImage" img-alt="Image" img-top>
          <template #footer>
           <a :href="article.articleUrl" target="_blank"><b-button variant="outline-primary" block>Read More...</b-button></a>
          </template>
        </b-card>
      </b-card-group>
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
      articles: [],
    } 
  },
  created() {
    this.getArticles();
  },
  methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      getArticles() {
      let URL = 'portal/news';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            //this.drivers = response.data.drivers;
            this.articles = response.data.news;
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
    background-image:url('../assets/mainImage.jpg');
  
    height: 500px;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .carouselDiv{
    margin: 0 auto;
    width: 80%;
  }
  .tabsDiv{
    width: 80%;
    margin: 0 auto;
  }
  hr{
    width: 80%;
  }
</style>
