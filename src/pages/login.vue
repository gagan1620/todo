<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <h3 class="my-3">Login</h3>
      <hr />
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <form @submit.prevent="onLogin()" class="my-5">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model.trim="email" />
        </div>
        <div class="error" v-if="errors.email">{{ errors.email }}</div>
        <div class="form-group my-3">
          <label>Password</label>
          <input type="password" class="form-control" v-model.trim="password" />
        </div>
        <div class="error" v-if="errors.password">{{ errors.password }}</div>
        <div class="my-3">
          <button type="submit" class="btn btn-dark bg-primary">Login</button>
        </div>
        <div class="my-3">
          Need To Register? Click Here to
          <router-link to="/Signup">Signup</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import validations from "../services/validations";
import { LOGIN_ACTION,LOADING_SPINNER_SHOW_MUTATION } from "../store/storeconstants";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      error: "",
    };
  },
  methods: {
    ...mapActions("auth", {
      login: LOGIN_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onLogin() {
      let Validations = new validations(this.email, this.password);
      this.errors = Validations.checkvalidations();
      
      if ("email" in this.errors || "password" in this.errors) {
        return false;
      } else {
        
        this.showLoading(true)
        this.error="";
        try 
        {
          await this.login({
             email: this.email,
              password: this.password 
              })
        
        }
        catch(e)  
        {
            this.error = e;
          this.showLoading(false)}
      };
        this.showLoading(false)
        this.$router.push('/home')
      
    },
  },
};
</script>
