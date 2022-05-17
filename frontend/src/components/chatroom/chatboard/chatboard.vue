<template>
    <div id="chatboard" class="w-75 p-3">
        <div id="chat-area" class="border rounded-2 chat-area">
            <Balloon v-for="(m, index) in messageBoard" :key="index" :message="m" :owned="isOwner(m.user.userId)" />
        </div>
        <div class="pt-3 message-area">
            <div class="input-group">
                <input type="text" class="form-control" v-model="message" v-on:keyup.enter="sendMessage">
                <a class="input-group-text" v-on:click="sendMessage"><i class="bi bi-send-fill fs-5"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
    import Balloon from "./balloon.vue";

    export default {
        name: 'Chatboard',
        props: {
            user: {},
        },
        data() {
            return {
                message: "",
                messageBoard: [],
            }
        },
        methods: {
            sendMessage: function () {

                if (this.message != null && this.message != '') {
                    this.$socket.emit('sendMessage', {
                        message: this.message,
                        user: this.user
                    })
                    this.message = ""
                }

            },
            isOwner: function (userId) {
                return userId === this.user.id;
            }
        },
        sockets: {
            updateMessageboard(data) {
                this.messageBoard = data;
            },
            updateMessage(data) {
                this.messageBoard.push(data)
            }
        },
        updated() {

            // auto scroll to bottom of chat board
            const ele = document.getElementById("chat-area");
            ele.scrollTo(0, ele.scrollHeight)
        },
        components: {
            Balloon
        }
    }
</script>