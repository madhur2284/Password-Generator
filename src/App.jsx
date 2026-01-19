import { useState, useCallback, useEffect, useRef } from 'react'
import {Slider, Checkbox} from '@mui/material'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu"; 


function App() {
  let [length, setlength] = useState(8);
  let [NumAllowed, setNumAllowed] = useState(false);
  let [CharAllowed, setCharAllowed] = useState(false);
  let [Password, setPassword] = useState("");

  let passwordref = useRef(null);

  let passwordGenerator = useCallback(()=>{
    let pass= "";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(NumAllowed) str+= "0123456789";
    if(CharAllowed) str += "!@#$%^&*?/\|+=`~<,>.;";
    for(let i = 0; i < length; i++){
      pass += str[Math.floor(Math.random()*str.length)];
    }
    setPassword(pass);
  }, [length, NumAllowed, CharAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator();
  }, [length, NumAllowed, CharAllowed])

  let copiedPassword = async ()=>{
    passwordref.current?.select();
    await navigator.clipboard.writeText(Password);

  };
  let [openEye, setOpenEye] = useState(true);
  let fn = ()=>{
      setOpenEye(prev => !prev);
  }
  return (
    <>
    <div className="flex justify-center h-screen">
      <div className="bg-fuchsia-300 h-fit px-7 py-4 mt-8 rounded-bl-2xl rounded-tr-2xl flex-col justify-center w-3xl items-center">
        <div className="mr-2 ml-2 flex">
          {openEye? 
          <div className="flex">
            <input className="bg-cyan-100 rounded-l-lg h-8 px-2 py-0.5 w-lg relative" name="password" type="text" value={Password} placeholder='Password' readOnly ref={passwordref}></input> <button onClick={fn} className="absolute mt-2.5 ml-120"><LuEye /></button>
          </div>
          :
          <div className="flex">
            <input className="bg-cyan-100 rounded-l-lg h-8 px-2 py-0.5 w-lg relative" name="password" type="password" value={Password} placeholder='Password' readOnly ref={passwordref}></input>
            <button onClick={fn} className="absolute mt-2.5 ml-120"><LuEyeClosed /></button>
          </div>
          }
          
          <button className="text-white bg-indigo-600 rounded-r-lg p-1 hover:bg-indigo-800 duration-200 shrink-0" onClick={()=>{
            copiedPassword();
          }}>Copy</button>
        </div>
        <div className="flex">
          <div className="flex mt-4">
            {/* <Slider
              aria-label="Temperature"
              defaultValue={8}
              // getAriaValueText={length}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              marks
              min={8}
              max={16}
              onChange={(e)=>{
                setlength(e.target.value);
              }}
            /> */}
            <input type="range" name="length" id='length' min={8} max={16} value={length} className="accent-indigo-600 mb-4" onChange={(e)=>{
              setlength(e.target.value);
            }}></input>
            <label htmlFor="length" className="pr-5 pl-2 mb-2">Length({length})</label>
          </div>
          <div className="flex">
            <Checkbox onChange={()=>{
              setNumAllowed(prev => !prev);

            }} />
            {/* <input type="checkbox" name="Number" id="Number" className="mt-4 accent-indigo-600" onChange={()=>{
              setNumAllowed(prev => !prev);

            }}></input> */}
            <label htmlFor="Number" className="mt-4 pr-5 pl-2 mb-4">Number</label>
            <Checkbox onChange={()=>{
              setCharAllowed(prev => !prev);
            }} />
            {/* <input type="checkbox" name="Character" id="Character" className="mt-4 accent-indigo-600" onChange={()=>{
              setCharAllowed(prev => !prev);
            }}></input> */}
            <label htmlFor="Character" className="mt-4 pl-2 mb-4">Character</label>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
