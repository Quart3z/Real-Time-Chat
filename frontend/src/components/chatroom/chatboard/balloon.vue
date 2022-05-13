<template>
    <div id="balloon" v-bind:class="{'d-flex p-2': true, 'justify-content-end': owned}">
        <div class="d-flex flex-column" style="max-width: 40rem">
            <span class="p-1 text-secondary" v-if="!owned">{{ message.user.username }}</span>
            <div class="text-break p-3 bg-light" style="border-radius: 10px">{{ message.message }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Balloon',
        props: {
            message: {},
            owned: null
        },
        data() {
            return {}
        },
        methods: {

        }
    }
</script>