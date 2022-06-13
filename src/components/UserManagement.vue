<template>
  <div class="hello">
    <div class="userTable">
      <b-table
        no-border-collapse
        small
        striped
        head-variant="light"
        responsive
        hover
        primary-key="id"
        :items="users"
        :fields="usersFields"
        ref="userTable"
        id="userTable"
        @row-clicked="item=>$set(item, '_showDetails', !item._showDetails)"
        >

        <template slot="row-details" slot-scope="row">
          <b-card class="userCards">
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Roles:</b></b-col>
              <b-col>{{ row.item.roles }}</b-col>
            </b-row>
            <b-button class="button" variant="outline-danger" @click="deleteUser(row.item.username)">Delete User</b-button>
            <b-button v-b-modal.editRoles class="button" variant="outline-info" @click="clearRoles();fillRoles(row.item.roles)">Edit Roles</b-button>
            <b-button class="button" variant="outline-info">Reset Password</b-button>

            <b-modal id="editRoles" @ok="updateUserRoles(row.item.id)">
              
              <b-form-select v-model="selectedRoles" :options="options" multiple :select-size="4"></b-form-select>

            </b-modal>
          </b-card>

        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
//import { required } from 'vuelidate/lib/validators'
export default {
  name: 'UserManagement',
  props: {
    msg: String
  },
  mounted (){
    this.getUsers();
  },
  data : function() {
    return {
      users: [],
      usersFields: [
        {key: 'id', label: 'ID', sortable: true},
        {key: 'username', label: 'Username', sortable: true},
        {key: 'email', label: 'Email' }
      ],
      selectedRoles: [],
      options: [
        { value: 1, text: 'ROLE_USER' },
        { value: 2, text: 'ROLE_MODERATOR' },
        { value: 3, text: 'ROLE_ADMIN' },
      ]
    } 
  },
  methods: {
    clearRoles(){
      this.selectedRoles = [];
    },
    fillRoles(roles){
      roles.forEach(element =>{
        console.log(element);
        console.log(element.name);
        this.selectedRoles.push(element.id)
      });

    },
    getUsers() {
      let URL = 'portal/listUsers';
      let promise = axios.get(URL)
      return promise.then((response) => {
          if(response.status == '200'){
            this.users = response.data.users
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    updateUserRoles(userID) {
      let URL = 'portal/updateUserRoles';
      let promise = axios.post(URL,{
        userid: userID,
        roles: this.selectedRoles
      })
      return promise.then((response) => {
          if(response.status == '200'){
            this.$root.$emit('bv::refresh::table', 'userTable');
            this.getUsers();
            this.makeToast("User Roles Edited Successfully", "success", response.data.message, 30000);
          }else{
            alert('ALERT');
          }

        },
        ).catch(err => {
          alert('ALERTR');
        })
    },
    deleteUser(username) {
      let URL = 'portal/deleteUser';
      let promise = axios.delete(URL,{
        data: {
          username: username
        }
      })

      return promise.then((response) => {
          if(response.status == '200'){
            this.$root.$emit('bv::refresh::table', 'userTable');
            this.getUsers();
            this.makeToast("User Deleted Successfully", "success", response.data.message, 30000);
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .userButtons{
    margin-top: 1%;
    margin-bottom: 1%;
    width: 97%;
  }
  .button{
    width: 20%;
    float: right;
  }
  .userTable{
    margin: 0 auto;
    width: 97%;
    font-size: 18px;
  }
  .userCards {
    border: none;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
  }
  .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
    background-color: #d7faf9;
  }
</style>
