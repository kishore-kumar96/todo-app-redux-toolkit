import { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from './redux/todoSlice';
import uuid from 'react-uuid';


function App() {
  const { data = [] } = useSelector(state => state.todos)
  const [title, setTitle] = useState("")
  const [isEditId, setIsEditId] = useState(null)
  const dispatch = useDispatch()

  const handleAdd = () => {
    const id = uuid()
    dispatch(addTodo({ title, id }))
    setTitle("")
  }
  const handleUpdate = () => {
    dispatch(updateTodo({ title, id: isEditId }))
    setTitle("")
    setIsEditId(null)
  }
  const handleEdit = (title, id) => {
    setTitle(title)
    setIsEditId(id)

  }
  const handleDelete = (index) => {
    dispatch(deleteTodo(index))
  }
  const handleCancel = () => {
    setIsEditId(null)
    setTitle("")
  }
  return (
    <div className="App">
      <div className='app-wrapper'>
        <div className='app-header'>
          <h1>Welcome to Todo</h1>
          <input
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button className='btn-black' onClick={isEditId ? handleUpdate : handleAdd}>{isEditId ? 'Update' : "Add"}</button>
          {isEditId ? <button className='btn-red' onClick={handleCancel}>Cancel</button> : null}
        </div>
        <div className='todo-list'>
          <ul>
            {
              data.map(({ title = '', id = '' }) => {
                return (
                  <li key={id}>
                    <p>{title}</p>
                    <div className='todo-actions'>
                      <button
                        className='btn-green'
                        onClick={() => handleEdit(title, id)}>
                        Edit
                      </button>
                      <button
                        className='btn-red'
                        onClick={() => handleDelete(id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
