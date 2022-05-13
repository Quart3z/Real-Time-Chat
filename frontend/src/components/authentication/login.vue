<template>
    <div id="login" class="p-3">
        <form id="login_form" v-on:submit.prevent>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" v-bind:class="{'form-control': true, 'is-invalid': feedback !== ''}" v-model="credentials[0]">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" v-bind:class="{'form-control': true, 'is-invalid': feedback !== ''}" v-model="credentials[1]">
            </div>
            <div class="mb-3">
                <div class="invalid-feedback d-block mb-3">{{ feedback }}</div>
                <button class="btn btn-primary" v-on:click="login">Log in</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                credentials: ["", ""],
                feedback: ""
            }
        },
        methods: {
            // Submitting login form
            login: async function () {

                // Check for input validation
                if (this.validation()) {

                    const request = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: this.credentials[0],
                            password: this.credentials[1]
                        })
                    };

                    const result = await fetch("/authentication/login", request)
                        .then(response => response.json());

                    if (result.status === "success") {
                        this.credentials = this.feedbacks = ["", ""];

                        // Save the session token at localstorage
                        let token = result.data;
                        localStorage.setItem("token", token);

                        window.dispatchEvent(new CustomEvent('token-localstorage-changed', {
                            detail: {
                                storage: localStorage.getItem('token')
                            }
                        }));

                        // Redirection to chatroom
                        this.$router.push("/")

                    } else {

                        // Display the error message accordingly
                        this.feedback = result.data;

                    }


                }

            },
            // Perform validation on user inputs
            validation: function () {

                let validate = true;

                // Check if empty input
                for (let i = 0; i < this.credentials.length; i++) {
                    if (this.credentials[i] === "") {
                        this.feedback = "Please fill in the username/password";
                        validate = false;
                    } else {
                        this.feedback = "";
                    }
                }

                return validate;

            }
        },
    }
</script>