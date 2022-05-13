import {
    createRouter,
    createWebHistory
} from "vue-router"

import Authentication from "./components/authentication/authentication.vue";
import Chatroom from "./components/chatroom/chatroom.vue";

const routes = [{
        path: '/',
        name: Chatroom,
        component: Chatroom
    },
    {
        path: '/authentication',
        name: Authentication,
        component: Authentication,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router