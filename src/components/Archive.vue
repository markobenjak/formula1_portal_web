<template>
  <div class="hello">
    <div class="collapseDiv">
      <b-card no-body class="mb-1 archiveCards">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block variant="info" v-b-toggle.driversCollapse>Drivers</b-button>
        </b-card-header>
        <b-collapse id="driversCollapse" accordion="driversCollapse" role="tabpanel" class="archiveCollapse">
          <b-card-body>
            <b-pagination
              v-model="currentPageDrivers"
              :total-rows="rowsDrivers"
              :per-page="perPageDrivers"
              align="fill"
              first-number
              last-number
              aria-controls="driversTable"
              pills
            ></b-pagination>
            <b-table
                caption-top
                sticky-header
                no-border-collapse
                small
                head-variant="light"
                responsive
                :items="getDrivers"
                :fields="driversFields"
                ref="driversTable"
                id="driversTable"
                :per-page="perPageDrivers"
                :current-page="currentPageDrivers"
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
            <b-pagination
              v-model="currentPageConstructors"
              :total-rows="rowsConstructors"
              :per-page="perPageConstructors"
              align="fill"
              first-number
              last-number
              aria-controls="constructorsTable"
              pills
            ></b-pagination>
            <b-table
                caption-top
                sticky-header
                no-border-collapse
                small
                head-variant="light"
                responsive
                :items="getConstructors"
                :fields="constructorsFields"
                ref="constructorsTable"
                id="constructorsTable"
                :per-page="perPageConstructors"
                :current-page="currentPageConstructors"
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
              <b-pagination
                v-model="currentPageCircuits"
                :total-rows="rowsCircuits"
                :per-page="perPageCircuits"
                align="fill"
                first-number
                last-number
                aria-controls="constructorsTable"
                pills
              ></b-pagination>
              <b-table
                caption-top
                sticky-header
                no-border-collapse
                small
                head-variant="light"
                responsive
                :items="getCircuits"
                :fields="circuitsFields"
                ref="circuitsTable"
                id="circuitsTable"
                :per-page="perPageCircuits"
                :current-page="currentPageCircuits"
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
  name: 'Archive',
  props: {
    msg: String
  },
  mounted() {
    this.$root.$on('bv::collapse::state', (driversCollapse, isJustShown) => {
      if(driversCollapse == 'driversCollapse' && isJustShown)
        console.log('here')
        //this.getDrivers();
      //else if(driversCollapse == 'constructorsCollapse' && isJustShown)
        //this.getConstructors();
      //else if(driversCollapse == 'circuitsCollapse' && isJustShown)
        //this.getCircuits();
    })
  },
  data : function() {
    return {
      perPageDrivers: 30,
      currentPageDrivers: 1,
      rowsDrivers: 0,
      currentPageConstructors: 1,
      rowsConstructors: 0,
      perPageConstructors: 30,
      currentPageCircuits: 1,
      rowsCircuits: 0,
      perPageCircuits: 30,
      slide: 0,
      sliding: null,
      //drivers: [],
      driversFields:[
        // {key: 'profileName', label: 'Profile Name' },
        {key: 'givenName', label: 'Name'},
        {key: 'familyName', label: 'Surname'},
        {key: 'dateOfBirth', label: 'Date of Birth' },
        {key: 'nationality', label: 'Nationality'},
        {key: 'url', label: 'Learn More...'},
      ],
      constructorsFields:[
        // {key: 'profileName', label: 'Profile Name' },
        {key: 'name', label: 'Name'},
        {key: 'nationality', label: 'Nationality'},
        {key: 'url', label: 'Learn More...'},
      ],
      circuitsFields:[
        // {key: 'profileName', label: 'Profile Name' },
        {key: 'name', label: 'Name'},
        {key: 'circuitLocation.locality', label: 'Locality'},
        {key: 'circuitLocation.country', label: 'Country'},
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
      let URL = 'portal/archive/drivers?offset=' + (this.currentPageDrivers - 1)*this.perPageDrivers + '&limit=' + this.perPageDrivers;
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            //this.drivers = response.data.drivers;
            //this.archiveDrivers = response.data.drivers;
            this.rowsDrivers = response.data.totalDrivers;
            return response.data.drivers;
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    getConstructors() {
      let URL = 'portal/archive/constructors?offset=' + (this.currentPageConstructors - 1)*this.perPageConstructors + '&limit=' + this.perPageConstructors;
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            //this.archiveConstructors = response.data.constructors;
            this.rowsConstructors = response.data.totalConstructors;
            return response.data.constructors;
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    getCircuits() {
      let URL = 'portal/archive/circuits?offset=' + (this.currentPageCircuits - 1)*this.perPageCircuits + '&limit=' + this.perPageCircuits;
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.data.status == 'SUCCESS'){
            //this.archiveCircuits = response.data.circuits;
            this.rowsCircuits = response.data.totalCircuits;
            return response.data.circuits;
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
  .seasonsButton{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  hr{
    width: 80%;
  }
  .archiveCollapse{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
</style>
