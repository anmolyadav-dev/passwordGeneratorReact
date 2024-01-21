import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [allowedNumber, setAllowedNumber] = useState("false");
  const [allowedChar, setAllowedChar] = useState("false");
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null); //using this for refering to input field of password for selecting the text when copied to clipboard
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowedChar) str += "@#$*&/";
    if (allowedNumber) str += "0123456789";

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length + 1); //random value in given string (str)

      pass += str.charAt(charIndex); //appending the random character ar password
    }
    setPassword(pass);
  }, [length, allowedNumber, allowedChar]); //  these three should not change much

  useEffect(() => {
    generatePassword();
  }, [length, allowedChar, allowedNumber]); //as soon as one of  these 3 changes run the generate password  & as soon as page load
  return (
    <>
      <div className="w-[100%] h-[100vh] flex justify-center items-center text-orange-500 ">
        <div className="text-center w-full max-w-lg bg-gray-700 p-4 mx-auto">
          <h1 className="uppercase text-1xl text-slate-100 p-4">
            password generator
          </h1>
          <div className="rounded-lg overflow-hidden w-full flex my-2">
            <input
              type="text"
              placeholder="password"
              readOnly
              value={password}
              ref={passwordRef} //now anywhere in application we can access this input field
              className="w-full px-2 py-2"
            />
            <button
              className="bg-blue-500 text-white  outline-none px-3 py-1 "
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          {/* content below password input field */}
          <div className="flex gap-4 items-center">
            {/*-----slider-------*/}
            <div className="flex gap-1">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="cursor-pointer"
              />
              <label htmlFor="length" className="">
                length: {length}
              </label>
            </div>
            {/* Number allowed  checkbox */}
            <div className="flex gap-1 ">
              <input
                type="checkbox"
                value={allowedNumber}
                onChange={(e) => setAllowedNumber((prev) => !prev)}
                className="cursor-pointer"
                defaultChecked={allowedNumber}
              />
              <label htmlFor="Numbers" className="">
                Numbers
              </label>
            </div>
            {/* character allowed  checkbox */}
            <div className="flex gap-1 ">
              <input
                type="checkbox"
                value={allowedChar}
                onChange={(e) => setAllowedChar((prev) => !prev)}
                className="cursor-pointer"
                defaultChecked={allowedChar}
              />
              <label htmlFor="Characters" className="">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
