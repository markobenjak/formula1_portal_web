<template>
  <div class="hello">
    <div class="collapseDiv">
      <b-card no-body class="mb-1 archiveCards">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block variant="info" v-b-toggle.driversCollapse>Drivers</b-button>
        </b-card-header>
        <b-collapse id="driversCollapse" accordion="driversCollapse" role="tabpanel">
          <b-card-body>
            <b-table
                caption-top
                sticky-header
                no-border-collapse
                small
                head-variant="light"
                responsive
                :items="archiveDrivers"
                :fields="driversFields"
                ref="driversTable"
                id="driversTable"
              >
              </b-table>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1 archiveCards">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block variant="info" v-b-toggle.constructorsCollapse>Constructors</b-button>
        </b-card-header>
        <b-collapse id="constructorsCollapse" accordion="constructorsCollapse" role="tabpanel">
          <b-card-body>
            <b-table
                caption-top
                sticky-header
                no-border-collapse
                small
                head-variant="light"
                responsive
                :items="archiveConstructors"
                :fields="constructorsFields"
                ref="constructorsTable"
                id="constructorsTable"
              >
              </b-table>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1 archiveCards">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block variant="info" v-b-toggle.circuitsCollapse>Circuits</b-button>
          </b-card-header>
          <b-collapse id="circuitsCollapse" accordion="circuitsCollapse" role="tabpanel">
           <b-card-body>
              <b-table
                caption-top
                sticky-header
                no-border-collapse
                small
                head-variant="light"
                responsive
                :items="archiveCircuits"
                :fields="circuitsFields"
                ref="circuitsTable"
                id="circuitsTable"
              >
              </b-table>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card no-body class="mb-1 archiveCards">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block variant="info" v-b-toggle.seasonsCollapse>Seasons</b-button>
          </b-card-header>
          <b-collapse id="seasonsCollapse" accordion="seasonsCollapse" role="tabpanel">
            <b-card-body>
              <b-form-input v-model="seasonYear" placeholder="Enter a year"></b-form-input>
              <b-button class="seasonsButton" variant="outline-primary" block @click="getSeasons()">Search</b-button>
              <b-table
                caption-top
                sticky-header
                no-border-collapse
                small
                head-variant="light"
                responsive
                :items="archiveSeasons"
                :fields="seasonsFields"
                ref="seasonsTable"
                id="seasonsTable"
              >
              </b-table>
            </b-card-body>
          </b-collapse>
        </b-card>
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
  mounted() {
    this.$root.$on('bv::collapse::state', (driversCollapse, isJustShown) => {
      if(driversCollapse == 'driversCollapse' && isJustShown)
        this.getDrivers();
      else if(driversCollapse == 'constructorsCollapse' && isJustShown)
        this.getConstructors();
      else if(driversCollapse == 'circuitsCollapse' && isJustShown)
        this.getCircuits();
    })
  },
  data : function() {
    return {
      slide: 0,
      sliding: null,
      //drivers: [],
      driversFields:[
        // {key: 'profileName', label: 'Profile Name' },
        {key: 'givenName', label: 'Name', sortable: true},
        {key: 'familyName', label: 'Surname', sortable: true},
        {key: 'dateOfBirth', label: 'Date of Birth' },
        {key: 'nationality', label: 'Nationality', sortable: true},
        {key: 'url', label: 'Learn More...'},
      ],
      constructorsFields:[
        // {key: 'profileName', label: 'Profile Name' },
        {key: 'name', label: 'Name', sortable: true},
        {key: 'nationality', label: 'Nationality', sortable: true},
        {key: 'url', label: 'Learn More...'},
      ],
      circuitsFields:[
        // {key: 'profileName', label: 'Profile Name' },
        {key: 'name', label: 'Name', sortable: true},
        {key: 'circuitLocation.locality', label: 'Locality', sortable: true},
        {key: 'circuitLocation.country', label: 'Country', sortable: true},
        {key: 'circuitLocation.latitude', label: 'latitude'},
        {key: 'circuitLocation.longitude', label: 'latitude'},
        {key: 'url', label: 'Learn More...'},
      ],
      seasonsFields:[
        // {key: 'profileName', label: 'Profile Name' },
        {key: 'driver.givenName', label: 'Name', sortable: true},
        {key: 'driver.familyName', label: 'Surname', sortable: true},
        {key: 'driver.nationality', label: 'Nationality', sortable: true},
        {key: 'position', label: 'Position', sortable: true},
        {key: 'points', label: 'Points', sortable: true},
        {key: 'wins', label: 'Wins', sortable: true},
        {key: 'constructor.name', label: 'Constructor'},
      ],
      archiveDrivers: [],
      archiveConstructors: [],
      archiveCircuits: [],
      archiveSeasons: [],
      seasonYear: '2021',
    } 
  },
  methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      getDrivers() {

      let URL = 'portal/archive/drivers';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            //this.drivers = response.data.drivers;
            this.archiveDrivers = response.data.drivers;
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    getConstructors() {
      let URL = 'portal/archive/constructors';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            this.archiveConstructors = response.data.constructors;
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    getCircuits() {
      let URL = 'portal/archive/circuits';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            this.archiveCircuits = response.data.circuits;
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    getSeasons() {
      let URL = 'portal/archive/season/' + this.seasonYear;
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            this.archiveSeasons = response.data.seasons[0].driverStanding;
            console.log(response.data.seasons[0].driverStanding)
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
  .archiveCards {
    border: none;
  }
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
  .collapseDiv{
    margin: 0 auto;
    width: 80%;
  }
  .buttonGroup{
    margin: 0 auto;
    width: 80%;
  }
  .buttonGroup>b-button{
    margin-right: 1%;
  }
  .seasonsButton{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  hr{
    width: 80%;
  }
</style>
