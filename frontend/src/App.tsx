import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p> Test {count} </p>
    </>
  )
}

export default App
