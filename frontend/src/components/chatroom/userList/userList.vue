<template>
    <div id="user-list" class="col-3">
        <h4><u>Active Users</u></h4>
        <div>
            <UserItem v-for="(u, index) in activeUsers" :key="index" :user="u" :owned="isOwner(u.id)" />
        </div>
    </div>
</template>

<script>
    import UserItem from "./userItem.vue";

    export default {
        name: 'UserList',
        props: {
            user: {},
        },
        data() {
            return {
                activeUsers: null
            }
        },
        methods: {
            isOwner: function (userId) {
                return userId === this.user.id;
            }
        },
        sockets: {
            updateUserList(users) {
                this.activeUsers = users
            },
        },
        components: {
            UserItem,
        }
    }
</script>