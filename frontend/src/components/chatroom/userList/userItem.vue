<template>
  <div id="user-item" class="my-3">
    <div class="d-flex align-items-center">
      <i class="bi bi-circle-fill user-status me-2 text-online" v-if="user.status === 1"></i>{{ user.username }}
    </div>
    <span class="text-secondary user-title">{{ user.signature }}</span>
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