import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'
import cycle from './assets/cycle.jpg'

function App() {
  const [length , setLength] = useState(5)
  const [Number , setNumber] = useState(false)
  const [character , setCharacter] = useState(false)
  const [password , setpassword] = useState("")

  const passRef = useRef(null)

  const passwordGenerator = ()=>{
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCBVNMqwertyuioplkjhgfdsazxcvbnm"
    
    if(character) str += "~!@#$%^&*()_+}{|}"
    if(Number) str += '0123456789'

    for(let i =1 ; i<= length ; i++){
      let randomNo = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randomNo)
  }
  
  setpassword(pass)
}


const copyToClickBoard = useCallback(() => {
  passRef.current?.select();
  passRef.current?.setSelectionRange(0, 9);
  window.navigator.clipboard.writeText(password)
}, [password , length])

useEffect(()=>{
  passwordGenerator()
},[length])
  return (
    <>
      <div className='bg'>
        <h1>Password Generator</h1>

        <div >
          <input  className='inputt' 
        type="text"
        value={password}
        placeholder="Password"
        readOnly
        ref={passRef}
        />
          <button
          onClick={copyToClickBoard}
          
          >Copy</button>
        </div>
        <div className='content'>
          <div><input type="range" 
          min={5} 
          max={70} 
          value={length}
          onChange={(e)=>{setLength(e.target.value)}}
          className='cursor-pointer'

          /> <label>Length : {length}</label></div>


          <div><input type="checkbox"
          id="numberInput"
          onChange={() => {
              setNumber((prev) => !prev);
          }} /> <label>Numbers</label></div>


          <div><input type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                  setCharacter((prev) => !prev )
              }} /> <label>Character</label></div>

          
        </div>
      </div>
    </>
  )
}

export default App
