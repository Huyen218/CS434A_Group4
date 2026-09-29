<template>
  <component :is="layout">
    <router-view @login-success="onLoginSuccess"></router-view>
  </component>
</template>

<script>
const default_layout = "default";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("userLogin"))
    };
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    }
  },
  provide() {
    return {
      currentUser: () => this.user,
      setCurrentUser: (u) => (this.user = u)
    };
  }
};
</script>
<style></style>
