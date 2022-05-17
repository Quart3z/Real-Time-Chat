<template>
    <div id="user-list" class="w-25 p-3 border">
        <input class="form-control me-2" type="text" placeholder="Search the users" aria-label="Search" v-model="keyword">
        <hr>
        <div class="">
            <p v-if="matchedUsers.length === 0">No users're found</p>
            <UserItem v-else v-for="(u, index) in matchedUsers" :key="index" :user="u" :owned="isOwner(u._id)" />
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
                allUsers: {},
                matchedUsers: {},
                keyword: ""
            }
        },
        watch: {
            keyword() {

                // Search the userlists whenver the serach keyword changes
                this.searchUsers()

            }
        },
        methods: {
            // Check if user item belongs to logged in user
            isOwner: function (userId) {

                return userId === this.user.id;
            },
            // Search the user list
            searchUsers: function () {

                // Search by commands
                if (this.keyword.startsWith("/")) {

                    if (this.keyword === "/online") {
                        this.matchedUsers = this.allUsers.filter(u => {
                            return u.status === 1
                        })
                    } else if (this.keyword === "/offline") {
                        this.matchedUsers = this.allUsers.filter(u => {
                            return u.status === 0
                        })
                    }

                }
                // Search by username
                else {


                    this.matchedUsers = this.allUsers.filter(u => {
                        return u.username.startsWith(this.keyword)
                    })
                }

            }
        },
        sockets: {
            updateUserList(users) {
                this.matchedUsers = this.allUsers = users
            },
        },
        components: {
            UserItem,
        }
    }
</script>