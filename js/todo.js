import Component from "./component.js";
import store from "/store/index.js";
import Backend from "./backend.js";

export default class TodoComponent extends Component{
    
            constructor(app, settings){
        
                const template = document.getElementById('todo').content.cloneNode(true);
                app.append(template);

                super(store, 
                    document.querySelector('.js-items')
                );
                this.add(); 
            }

            render(){
                if(store.state.todo.length === 0){
                    this.anchor.innerHTML = "0 задач";
                    this.counts();
                    return;
                }
    
                this.anchor.innerHTML =  `
                <ul>
                    ${
                        store.state.todo.map(todoItem=>`
                            <li><span class ="todo_notdone">${todoItem}</span><button class="del" 
                            type="button">X</button><button class="done" type="button">V</button></li>
                        `).join('')
                    }
                </ul>
                `;

                this.view();
                this.delete();
                this.done();
                this.edit();
                this.counts();
                this.filter();
            }

            add(){
                    const input = document.querySelector('.inputtodo');
                    const submit = document.querySelector('.addtodo');
                    const handleClick = event =>{
                    event.preventDefault();
                    let value = input.value.trim();
            
                    if(value.length){
                            back.create(value);
                            back.get();
                            input.focus();
                            input.value = " ";
                    }   
                    }
                    submit.addEventListener('click', handleClick )  
            }

            delete(){
                    let count = 0;
                    this.anchor.querySelectorAll('button.del').forEach((button, id) =>{
                        count++;
                        button.style.display = "none";
                        button.addEventListener('click', ()=>{
                            store.dispatch('removeItem', { id })
                            back.delete('unic'+count);
                        })
                    })
            }

            done(){
                    let count = 0;
                    this.anchor.querySelectorAll('button.done').forEach((button, id)=>{
                        button.style.display = "none";
                        count++;
                        button.addEventListener('click', ()=>{
                        store.dispatch('doneItem', { id});
                        back.doneapi('unic'+count);
                    })
                })
            }
    
    
            edit(){
                    this.anchor.querySelectorAll('span').forEach((text, id)=>{

                        text.addEventListener('click', ()=>{

                        let input = document.createElement('input');
                        let but = document.createElement('button');
                        but.id = "edit";
                        but.innerText = "Edit";
                        text.parentNode.prepend(but);
                        text.parentNode.prepend(input);
                        input.focus();
                        text.remove();

                        but.addEventListener('click',()=>{
                    
                            let value = input.value.trim();
                            if(value.length)
                                store.dispatch('editItem', {value,id});         
                            })     
                        })
                    })
            }

            counts(){
                    let count_all = this.anchor.querySelectorAll('li').length;
                    let count_done = this.anchor.querySelectorAll('span.todo_done').length;
                    document.querySelector('#count_all').innerText = count_all;
                    document.querySelector('#count_done').innerText = count_done;
                    document.querySelector('#count_notdone').innerText = count_all-count_done;
            }

            view(){
                    this.anchor.querySelectorAll('li').forEach((li, id)=>{
    
                    li.addEventListener('mouseover',()=>{
                        li.querySelectorAll('button').forEach(button=>button.style.display = "inline")  
                    })
            
                    li.addEventListener('mouseout',()=>{

                        li.querySelectorAll('button').forEach(button=>button.style.display = "none")  
                    })

                    if(li.querySelector('span').innerText.substr(-1) == " "){
                    li.querySelector('span').style.textDecoration = "line-through";
                    li.querySelector('span').className = "todo_done";
                    }  
                })
            }

            filter(){
            
                    document.getElementById('show_all').addEventListener('click',(event)=>{
                        event.preventDefault();
                        document.querySelectorAll('li').forEach((elem)=>{
                        elem.style.display = "none";
                    })
                 
                    document.querySelectorAll('span').forEach((elem)=>{
                        elem.parentNode.style.display = "list-item"; 
                    });
                    })

                    document.getElementById('show_done').addEventListener('click',(event)=>{
                        event.preventDefault();
                        document.querySelectorAll('li').forEach((elem)=>{
                            elem.style.display = "none";
                        })
                     document.querySelectorAll('span.todo_done').forEach((elem)=>{
                        elem.parentNode.style.display = "list-item";
                    });        
                    })

                    document.getElementById('show_notdone').addEventListener('click',(event)=>{
                        event.preventDefault();
                        document.querySelectorAll('li').forEach((elem)=>{
                        elem.style.display = "none";
                    })
                    document.querySelectorAll('span.todo_notdone').forEach((elem)=>{
                    elem.parentNode.style.display = "list-item";
                     });  
                    })
            }
}

let back = new Backend(store);


    












        
    
    