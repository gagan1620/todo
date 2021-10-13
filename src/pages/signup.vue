<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <h3 class="my-3">Signup</h3>
      <hr />
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <form @submit.prevent="onSignup()" class="my-5">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="email" />
        </div>
        <div class="error" v-if="errors.email">{{ errors.email }}</div>
        <div class="form-group my-3">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="error" v-if="errors.password">{{ errors.password }}</div>
        <div class="my-3">
          <button type="submit" class="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import validations from "../services/validations";
import { mapActions, mapMutations } from "vuex";
import {
  SIGNUP_ACTION,
  LOADING_SPINNER_SHOW_MUTATION,
} from "../store/storeconstants";

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
      signup: SIGNUP_ACTION,
    }),
    ...mapMutations({
      showLoading: LOADING_SPINNER_SHOW_MUTATION,
    }),
    async onSignup() {
      let Validations = new validations(this.email, this.password);
      this.errors = Validations.checkvalidations();
      if ("email" in this.errors || "password" in this.errors) {
        return false;
      } else {
        this.showLoading(true);
        try {
          await this.signup({
            email: this.email,
            password: this.password,
          });
        } catch (error) {
          this.error = error;
          this.showLoading(false);
        }

        this.showLoading(false);
        //this.$router.push('/');
      }
    },
  },
};
</script>

