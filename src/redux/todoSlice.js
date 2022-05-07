import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

//todo siice
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.data.push(action.payload)
        },
        updateTodo: (state, action) => {
            let updateData = [...state.data]
            let index = updateData.findIndex(todo => todo.id === action.payload.id)
            updateData[index] = { ...updateData[index], title: action.payload.title }
            state.data = updateData
        },
        deleteTodo: (state, action) => {
            let updateData = [...state.data]
            updateData = updateData.filter(todo => todo.id !== action.payload)
            state.data = updateData
        }

    }
})

//todo actions
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
//todo reducer
export default todoSlice.reducer;