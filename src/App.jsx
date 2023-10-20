import { useCallback, useState,useEffect,useRef } from 'react'
 
function App() {
  const [length, setLength] = useState(8)
  const [character,setCharacter] =useState(false)
  const [number,setNumber] =useState(false)
  const [password,setPassword] =useState("")

  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let str = "ASDFGHJKLPOIUYTREWQZXCVBNMasdfghjklpoiuytrewqzxcvbnm"
    let pass = ""
    if (number) {
      str += "1234567890";
    }
    if(character){
      str += "~!@#$%^&*(){}][?></";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,number,character,setPassword])

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
passwordGenerator()
},[number,length,character,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md  mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'> Password Generator    </h1>
        <div className=' flex shadow rounded-lg overflow-hidden mb-4 py-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-3 py-2'>
          <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={number}
              id='numberInput'
              onChange={() =>{
                setNumber((prev) =>!prev);
              }}
              />
              <label htmlFor='numberInput'>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked={character}
              id='characterInput'
              onChange={() =>{
                setNumber((prev) =>!prev);
              }}
              />
              <label htmlFor='characterInput'>Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
