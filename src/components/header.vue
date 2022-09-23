<template>
<div>
    <b-navbar type="light" variant="light">
        <b-navbar-brand href="#">
            <img src="../assets/f1_logo.png" class="d-inline-block align-top" alt="logo">
        </b-navbar-brand>

        <b-navbar-nav class="navigation">
            <b-nav-item class="navItem" to="/">Home</b-nav-item>
            <b-nav-item class="navItem" to="/archive">Archive</b-nav-item>
            <b-nav-item class="navItem" to="/userManagement" v-if="userRole != null && userRole.includes('ROLE_ADMIN')">User Management</b-nav-item>
            <b-nav-item class="navItem" to="/forum">Forum</b-nav-item>
            <b-nav-item class="navItem" to="/blog">Blog</b-nav-item>
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
        width:20%;
        margin-right: 42.3%;
    }
    .navItem{
        padding: 5%;
        font-size: 20px;
        font-family: "Bahnschrift Condensed";
    }
    .navItem:hover{
        border-bottom: 1px solid;
    }

    @media only screen and (max-width: 800px) {
        .navigation {
            width:5%;
            margin-right: 60%;
            font-size: 10px;
        }
         .navItem{
            font-size: 18px;        
        }
    }

    @media only screen and (max-width: 600px) {
        .navigation {
            width:1%;
            margin-right: 70%;
        }
        .navItem{
            font-size: 15px;        
        }

    }

</style>
