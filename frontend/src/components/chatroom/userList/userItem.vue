<template>
  <div id="user-item">
    <div class="p-1 d-flex align-items-center">
      {{ user.username }}<i class="bi bi-person-fill mx-2" v-if="owned"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserItem',
    props: {
      user: {},
      owned: null
    },
    data() {
      return {}
    },
    methods: {},
    created() {},
  }
</script>