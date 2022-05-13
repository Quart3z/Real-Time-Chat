<template>
  <div id="chatroom" class="h-100 d-flex flex-column">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand">Chat</span>
        <a v-on:click="logout"><i class="bi bi-box-arrow-right fs-4"></i></a>
      </div>
    </nav>
    <div class="flex-grow-1 p-3 d-flex flex-column">
      <div class="h-100 row">
        <UserList :user="user" />
        <Chatboard :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
  import UserList from "./userList/userList.vue";
  import Chatboard from "./chatboard/chatboard.vue";

  export default {
    name: 'Chatroom',
    data() {
      return {
        user: {},
      }
    },
    methods: {
      // Submitting logout request
      logout: async function () {

        const result = await fetch("/authentication/logout")
          .then(response => response.json());

        if (result.status === "success") {

          this.$socket.emit("userDisconnect", this.user.id)

          localStorage.removeItem("token");
          window.dispatchEvent(new CustomEvent('token-localstorage-changed', {
            detail: {
              storage: localStorage.getItem('token')
            }
          }));

          this.$router.push("/authentication")

        } else {

          alert("Failed to logout")

        }

      }
    },
    async created() {

      // Get the user info from the logged in session token
      let userFromToken = await atob(localStorage.getItem("token").split(".")[1]);
      this.user = JSON.parse(userFromToken);

      //Initialize the handshake with SocketIO
      this.$socket.emit('initialization', this.user)

    },
    components: {
      UserList,
      Chatboard
    }
  }
</script>