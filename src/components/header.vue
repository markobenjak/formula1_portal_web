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
            <b-nav-item to="/forum">Forum</b-nav-item>
            <b-nav-item to="/blog">Blog</b-nav-item>
        </b-navbar-nav>

        <b-dropdown id="dropdown-right" right text="Right align" variant="light" class="m-2">
            <template v-slot:button-content>
                <b-icon-person-circle scale="1.2"></b-icon-person-circle>
            </template>
            <b-dropdown-item v-if="userName != ''">{{userName}}</b-dropdown-item>
            <b-dropdown-item class="userName" v-if="userName == ''">Please Log In on Main Page
                <b-icon icon="person-fill"></b-icon> 
            </b-dropdown-item>
            <b-dropdown-item class="userName" v-b-modal.modal-login @click="logout()" v-if="userName != ''">Log out
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
        userName () {
            return this.$store.state.user.username
        },
    },

    validations: {

    },

    methods: {
        logout(){
            this.$store.commit('logoutUser');
            this.makeToast("SUCCESS", "success", "Logout Successful", 50000 )
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

<style scoped>
    .navigation{
        margin: 0 auto;
    }

</style>
