<template>
    <div id="chatboard" class="col-9">
        <div id="chat-area" class="border chat-area">
            <Balloon v-for="(m, index) in messageBoard" :key="index" :message="m" :owned="isOwner(m.user.userId)" />
        </div>
        <div class="py-3 message-area">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="message" v-on:keyup.enter="sendMessage">
                <button class="btn btn-outline-secondary" type="button" v-on:click="sendMessage">Send</button>
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