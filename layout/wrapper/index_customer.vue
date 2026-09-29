<template>
  <div class="wrapper">
    <TopRocker :auth="auth"></TopRocker>
    <MenuRocker :auth="auth"></MenuRocker>
    <router-view></router-view>
    <BotRocker></BotRocker>
  </div>
</template>
<script>
// import "../../assets/js/bootstrap.bundle.min.js";
// import "../../assets/js/jquery.min.js";
// import "../../assets/plugins/simplebar/js/simplebar.min.js";
// import "../../assets/plugins/metismenu/js/metisMenu.min.js";
// import "../../assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js";
// import "../../assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js";
// import "../../assets/plugins/chartjs/js/Chart.min.js";
// import "../../assets/plugins/chartjs/js/Chart.extension.js";
// import "../../assets/js/index.js";
// import "../../assets/js/app.js";

// import "../../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";
import TopRocker from "../components//TopRocker.vue";
import BotRocker from "../components/BotRocker.vue";
import MenuRocker from "../components/MenuRocker.vue";

export default {
  components: {
    TopRocker,
    BotRocker,
    MenuRocker,
  },
  data() {
    return {
      auth: null,
    };
  },
  created() {
    this.syncAuth();
    window.addEventListener("auth-change", this.syncAuth);
  },
  beforeUnmount() {
    window.removeEventListener("auth-change", this.syncAuth);
  },
  methods: {
    syncAuth() {
      const raw = localStorage.getItem("userLogin");
      this.auth = raw ? JSON.parse(raw) : null;
    },
  },
};
</script>
<style>
/* @import "../../assets/css/bootstrap.min.css";
@import "../../assets/images/favicon-32x32.png";
@import "../../assets/plugins/vectormap/jquery-jvectormap-2.0.2.css";
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";
@import "../../assets/css/dark-theme.css";
@import "../../assets/css/semi-dark.css";
@import "../../assets/css/header-colors.css"; */

@import "../../assets/css/bootstrap-extended.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css";

/* @import "../../assets/images/favicon-32x32.png"; */
</style>
