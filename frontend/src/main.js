// Initialization
import {
    createApp
} from 'vue'
import App from './components/App.vue'

// Initialization of bootstrap & css
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import "./css/authentication.css"
import "./css/chatroom.css"

// Router
import router from "./router.js";

// SocketIO
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

const socketConnection = SocketIO('http://localhost:8080');

createApp(App)
    .use(new VueSocketIO({
        debug: false,
        connection: socketConnection,
    }))
    .use(router)
    .mount('#app')