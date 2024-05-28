import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {

  // using useState
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");
  let passwordRef = useRef(null)


  //using useCallback
  const passwordGenerator = useCallback(() => {
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed)
      alpha += "!@#$%^&*-_+=[]{}~`";
    if (numberAllowed)
      alpha += "0123456789";
    let pass = "";
    for (let i = 0; i < length; i++) {
      let randIndex = Math.floor(Math.random() * alpha.length + 1);
      pass += alpha[randIndex];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);


  //using useEffect
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  
  // copyToclipboard
  const copyToClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3 text-2xl">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">

        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600 " onClick={copyToClipboard}>
          copy
        </button>

      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={25}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>

      </div>
    </div>
  );
}
