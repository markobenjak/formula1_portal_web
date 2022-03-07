<template>
<div>
    <b-navbar type="light" variant="light">
        <b-navbar-brand href="#">
            <img src="../assets/f1_logo.png" class="d-inline-block align-top" alt="logo">
        </b-navbar-brand>

        <b-navbar-nav class="navigation">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/archive">Archive</b-nav-item>
            <b-nav-item to="/userManagement" v-if="userRole != null && userRole.includes('ROLE_ADMIN')">UserManagement</b-nav-item>
            <b-nav-item to="/userManagement" >User Management</b-nav-item>
            <b-nav-item to="/forum" >Forum</b-nav-item>
            <b-nav-item to="/blog" >Blog</b-nav-item>
        </b-navbar-nav>

        <b-dropdown id="dropdown-right" right text="Right align" variant="light" class="m-2">
            <template v-slot:button-content>
                <b-icon-person-circle scale="1.2"></b-icon-person-circle>
            </template>
            <b-dropdown-item class="userName" @click="login()">Log in
                <b-icon icon="person-fill"></b-icon> 
            </b-dropdown-item>

        </b-dropdown>
    </b-navbar>
</div>
</template>

<script>
//import axios from 'axios';
export default {
    name: "Header",
    data() {
        return {

        }
    },
    computed: {
        userRole () {
            return this.$store.state.user.userRole
        },
    },

    validations: {

    },

    methods: {
       login(){
        
       }
    }
}

</script>

<style scoped>
    .navigation{
        margin: 0 auto;
    }

</style>
