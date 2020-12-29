import './App.css'
import { useEffect, useState } from 'react'
const axios = require('axios')

function App() {
  const [imageSrc, setImageSrc] = useState('')
  const [toDos, setToDos] = useState([])
  const [todoItem, setTodoItem] = useState('')

  useEffect(() => {
    getImage()
    getTodos()
  }, [])

  const getTodos = async () => {
    const res = await axios.get('http://localhost:3001/todos')
    await setToDos(res.data)
  }

  const getImage = async () => {
    const res = await axios.get('http://localhost:3001/image')
    await setImageSrc(res.data)
  }

  const saveItem = async (e) => {
    e.preventDefault()
    const payload = { item: todoItem }
    const res = await axios.post('http://localhost:3001/todos', payload)
    setToDos(res.data)
    setTodoItem('')
  }
  
  return (
    <div className="App">
      <h1>ToDo list</h1>
      <img src={imageSrc} alt="todo-illustration" />
      <form onSubmit={(e) => saveItem(e)}>
        <input value={todoItem} onChange={(e) => setTodoItem(e.target.value)}/>
        <button type="submit">Save item</button>
      </form>
      <div className="list-container">
      <ul>
        {toDos.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      </div>
    </div>
  );
}

export default App;
