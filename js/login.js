import Component from "./component.js";
import store from "/store/index.js";
import Backend from "./backend.js"
import link from "./link.js";


export default class LoginComponent extends Component{

    constructor(app ,settings){
        const template = document.getElementById('login').content.cloneNode(true);
        app.appendChild(template);
        
        super(store,    
            app
        );
        let back = new Backend(store);
        app.querySelector('#signIn').addEventListener('click',()=>{
        back.login(settings);
        });    
    }

    render(){
        console.log("LogIn!");
    }
    }