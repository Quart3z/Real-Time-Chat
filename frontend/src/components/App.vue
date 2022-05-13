<template>
    <router-view />
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        token: localStorage.getItem("token")
      }
    },
    created() {

      // Reactively fetching session from localstorage
      window.addEventListener('token-localstorage-changed', (event) => {
        this.token = event.detail.storage;
      });

      // Redirection based on whether user's logged in
      if (this.token !== null) {
        this.$router.push("/")
      } else {
        this.$router.push("/authentication")
      }

    },
  }
</script>