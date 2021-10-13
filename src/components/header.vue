<template>
  
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: powderblue;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">TodoList</a>
    <button class="navbar-toggler" 
    type="button"
     data-bs-toggle="collapse" 
     data-bs-target="#navbarNav"
     aria-controls="navbarNav" 
     aria-expanded="false" 
     aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
           <router-link class="nav-link" v-if="! isAuthenticated" to="/">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" v-if="! isAuthenticated" to="/Signup">Signup</router-link>
        </li>
        <li class="nav-item">
           <router-link class="nav-link" v-if="isAuthenticated" to="/Home">Home</router-link>
        </li>
        
        <li class="nav-item" v-if="isAuthenticated">
           
           <a href="#"
           class="nav-link"
           @click.prevent="onLogout()">Logout</a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import {IS_USER_AUTHENTICATE_GETTER, LOGOUT_ACTION, } from "../store/storeconstants"
export default {
  computed:{
  ...mapGetters('auth',{
    isAuthenticated:IS_USER_AUTHENTICATE_GETTER,
  })
},
methods:{
  ...mapActions('auth',{
    logout:LOGOUT_ACTION,
  }),
  onLogout(){
    this.logout();
    this.$router.replace('/')
  }
},
};
</script>

