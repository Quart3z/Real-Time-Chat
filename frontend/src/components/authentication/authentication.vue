<template>
    <div id="authentication" class="authentication-container">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a v-bind:class="{'nav-link': true, 'active': currTab === 1}" v-on:click="currTab = 1" data-toggle="tab" role="tab" id="login-tab" aria-controls="login-tab" v-bind:aria-selected="currTab === 1">Login</a>
            </li>
            <li class="nav-item">
                <a v-bind:class="{'nav-link': true, 'active': currTab === 2}" v-on:click="currTab = 2" data-toggle="tab" role="tab" id="register-tab" aria-controls="register-tab"
                    v-bind:aria-selected="currTab == 2">Register</a>
            </li>
        </ul>
        <div class="tab-content">
            <div v-bind:class="{'tab-pane fade': true, 'show active': currTab === 1}" role="tabpanel" aria-labelledby="login-panel">
                <Login />
            </div>
            <div v-bind:class="{'tab-pane fade': true, 'show active': currTab === 2}" role="tabpanel" aria-labelledby="register-panel">
                <Registration @changeTab="(t) => currTab = t"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Login from "./login.vue"
    import Registration from "./registration.vue"

    export default {
        name: "Authentication",
        data() {
            return {
                currTab: 1
            }
        },
        components: {
            Login,
            Registration
        }
    }
</script>