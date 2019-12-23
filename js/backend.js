import link from "./link.js";
import Component from "./component.js";
import store from "/store/index.js";

export default class Backend{



        constructor(store){
            this.store = store;
        }
        
        login(settings){
    
            fetch('https://todo-app-back.herokuapp.com/login', {
                method: 'POST',
                    body:
                    JSON.stringify({
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value,
                    }),
                headers: {
                'Content-Type': 'application/json'
                }
                }).then(res=>res.json()).then(res => {
                    localStorage.setItem('id',res.id);
                    localStorage.setItem('token', res.token); 
                    res.token ? link(settings.redirect):alert('Error')} )
        }


        create(value){
            fetch('https://todo-app-back.herokuapp.com/todos', {
                method: 'POST',
                body:
                JSON.stringify({
                text: value,
            }),
        headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
        }
        }).then(res=>res.json()).then(res=>{ this.store.dispatch('addItem', value)});
        }

        get(){
            fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'GET', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
            }
            }).then(res=>res.json()).then(res=>console.log(res));
        }

        doneapi(id){
            fetch('https://todo-app-back.herokuapp.com/todos/'+localStorage.getItem(id), {
                method: 'PUT',
                body:
                JSON.stringify({
                    completed: true,
        }),
        headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
        }
        }).then(res=>res.json());
        }

        delete(id){
            fetch('https://todo-app-back.herokuapp.com/todos/'+localStorage.getItem(id), {
                method: 'DELETE',
                headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        }).then(res=>res.json());
        }

}