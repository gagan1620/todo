<template>
  <body>
    <Header />
    <the-loader v-if="showLoading"></the-loader>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <router-view />
        </div>
      </div>
    </div>

    <Footer />
  </body>
</template>
<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import TheLoader from "./components/TheLoader.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState({
      showLoading: (state) => state.showLoading,
    }),
  },
  components: {
    Header,
    Footer,
    TheLoader,
  },
};
</script>
<style scoped>
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
Footer {
  margin-top: auto;
}
</style>
