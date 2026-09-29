<template>
  <div class="container">
    <main class="flex-fill p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
};
</script>
<style>
body {
  padding-top: 125px;
}
</style>

