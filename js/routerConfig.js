import TodoComponent from "./todo.js";
import LoginComponent from "./login.js";
import store from "/store/index.js";

  export default {

    
    'login': {
        data:{route: 'login'},
        url: 'login',
        component: LoginComponent,
        settings:{
            redirect: 'todo'
        }
    },

    'todo' :{
        data:{ route: 'todo'},
        url: 'todo',
        component: TodoComponent,
        settings:{}
    }
}

