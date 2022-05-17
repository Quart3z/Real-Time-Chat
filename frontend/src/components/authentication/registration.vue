<template>
    <div id="registration" class="p-2">
        <form id="registration_form" v-on:submit.prevent="register">
            <div class="form-group mb-2">
                <label class="form-label">Username</label>
                <input type="text" v-bind:class="{'form-control': true, 'is-invalid': feedbacks[0] !== ''}" v-model="credentials[0]">
                <div class="invalid-feedback">{{ feedbacks[0] }}</div>
            </div>
            <div class="form-group mb-2">
                <label class="form-label">Email</label>
                <input type="text" v-bind:class="{'form-control': true, 'is-invalid': feedbacks[1] !== ''}" v-model="credentials[1]">
                <div class="invalid-feedback">{{ feedbacks[1] }}</div>
            </div>
            <div class="form-group mb-2">
                <label class="form-label">Password</label>
                <input type="password" v-bind:class="{'form-control': true, 'is-invalid': feedbacks[2] !== ''}" v-model="credentials[2]">
                <div class="invalid-feedback">{{ feedbacks[2] }}</div>
            </div>
            <div class="form-group mb-2">
                <label class="form-label">Repeat Password</label>
                <input type="password" v-bind:class="{'form-control': true, 'is-invalid': feedbacks[3] !== ''}" v-model="credentials[3]">
                <div class="invalid-feedback">{{ feedbacks[3] }}</div>
            </div>
            <div class="form-group mt-3">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Registration",
        data() {
            return {
                credentials: ["", "", "", ""],
                feedbacks: ["", "", "", ""]
            }
        },
        methods: {
            // Submitting registration form
            register: async function () {

                // Check for input validation
                if (this.validation()) {
                    const request = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: this.credentials[0],
                            email: this.credentials[1],
                            password: this.credentials[2]
                        })
                    };

                    const result = await fetch("/authentication/register", request)
                        .then(response => response.json());

                    if (result.status === "success") {
                        this.credentials = this.feedbacks = ["", "", "", ""];
                        this.$emit("changeTab", 1);

                    } else {
                        // Displaying error message accordingly
                        if (result.data === "username") {
                            this.feedbacks[0] = "The username already exists!";
                        } else if (result.data === "email") {
                            this.feedbacks[1] = "The email already exists!";
                        }

                    }

                }
            },
            // Perform validation on user inputs
            validation: function () {

                let validate = true;

                // Check if empty input
                for (let i = 0; i < this.credentials.length; i++) {
                    if (this.credentials[i] === "") {
                        this.feedbacks[i] = "Input required";
                        validate = false;
                    } else {
                        this.feedbacks[i] = "";
                    }
                }

                // Check if email is valid
                if (validate) {
                    let expression =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if (!expression.test(this.credentials[1])) {
                        this.feedbacks[1] = "Email is invalid";
                        validate = false;
                    } else {
                        this.feedbacks[1] = "";
                    }
                }

                // Check if password is equal with repeated password
                if (validate) {
                    if (this.credentials[2] != this.credentials[3]) {
                        this.feedbacks[3] = "The passwords do not match";
                        validate = false;
                    } else {
                        this.feedbacks[3] = "";
                    }
                }

                return validate;

            }
        },
    }
</script>