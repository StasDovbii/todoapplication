export default function createReducers(){

    return {

        addItem: (payload,state) =>({

            
                ...state,
                todo:[ payload, ...state.todo]
            
        }),
        removeItem: (payload, state)  =>({

            ...state,
            todo :[
                ...state.todo.slice(0, payload.id),
                ...state.todo.slice(payload.id+1, state.todo.length)
            ]

        }),
        doneItem:(payload,state) =>({

            ...state,
            
            todo : [ ...state.todo].map((element,id) => {
                if(id == payload.id){
                    element +=" ";
                }
                return element;
            }) 
        }),

        editItem:(payload,state) =>({

            ...state,
            
            todo : [ ...state.todo].map((element, id) => {
                if(id == payload.id){
                    element = payload.value;
                }
                return element;
            }) 
        }),

        login:(payload,state)=>({

            ...state,
            userInfo:{
                authorized: true,
                ...payload
            }
        }),

        logout:(payload,state)=>({

            ...state,
            userInfo:{}
        })
    }
} 