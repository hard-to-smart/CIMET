import { useEffect, useReducer } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { nanoid } from 'nanoid'
import { FaCheck } from "react-icons/fa";



const Todo = () => {
    const initialState = {
        todos: [],
        isEditing: false,
        input:'',
        editingID: null,
    }

    function reducer(state, action){
        switch(action.type){
            case 'EDIT_INPUT':
                return {
                    ...state,
                    input: action.payload
                }
            case 'ADD_TASK': 
                return {
                    ...state,
                    todos: [...state.todos, {id: nanoid(), task: action.payload, isCompleted:false}],
                    input: ''
                }
            case 'DELETE_TASK':
                return {
                    ...state,
                    todos: state.todos.filter((todo)=> todo.id !== action.payload)
                }
            case 'SET_UPDATE_TASK':
                
                    const displayTaskInInput = state.todos.find(todo=>{
                        return todo.id === action.payload
                    })
                    return {
                    ...state,
                    isEditing: true, 
                    input: displayTaskInInput.task,
                    editingID: action.payload
                    }
            
            case 'UPDATE_TASK':
                return {
                    ...state,
                    todos: state.todos.map((todo)=>{
                        return todo.id === action.payload.id ? {...todo, task: action.payload.editedTask} :
                        todo
                    }),
                    isEditing: false,
                    editingID: null,
                    input:''
                }

            case 'COMPLETE_TASK':
                return {
                    ...state,
                    todos: state.todos.map((todo)=>{
                        return todo.id === action.payload ? {...todo, isCompleted: !todo.isCompleted} :
                        todo
                    }
                    )
                }

            default: return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(state.isEditing){
            dispatch({type: 'UPDATE_TASK', payload: {editedTask: state.input, id: state.editingID}})
        }
        else if(state.input.trim()){
            dispatch({type: "ADD_TASK", payload: state.input })
        }
    }

    const handleInputChange=(e)=>{
        dispatch({type: 'EDIT_INPUT', payload: e.target.value})
    }

    const handleTaskDelete=(id)=>{
        dispatch({type: 'DELETE_TASK', payload: id})
    }
    const handleTaskUpdate=(id)=>{
        dispatch({type: 'SET_UPDATE_TASK', payload: id})
    }

    const handleTaskComplete = (id) =>{
        dispatch({type: 'COMPLETE_TASK', payload: id})
    }

    useEffect(() => {
        console.log("all states", state);
    }, [state.todos]);

  return (
    <div className="container">
        <h3 className="todo-header">TODO LIST</h3>
        <div className="todo-body">
            <div className="input-box">
            <input type="text" placeholder="Enter task" value={state.input} onChange={handleInputChange}/>
        {/* { !state.isEditing ? */}
            <button type="submit" onClick={handleSubmit}>+</button>
            {/* : */}
            {/* <button onClick={handleSaveUpdatedTask}><FaCheck id="success-btn" className="todo-controls"/></button> */}
        {/* } */}
            </div>
        </div>
            <ul>
                {state.todos.map((todo)=>
                <li key={todo.id}>
                    <input type="checkbox" className="checkbox" checked={todo.isCompleted} onChange={()=> handleTaskComplete(todo.id)}/>
                    <label style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>{todo.task}</label>
                    <div>
                { !todo.isCompleted &&
                    <FaPencilAlt id="edit-btn" className="todo-controls" onClick={()=>handleTaskUpdate(todo.id)}/> }
                    <FaTrash id="delete-btn" className="todo-controls" onClick={()=>handleTaskDelete(todo.id)}/>
                    </div>
                </li>
                )}
            </ul>
    </div>
  )
}

export default Todo