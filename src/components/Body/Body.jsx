import React from 'react'
import { useCallback, useState, useEffect, useRef } from 'react'

function Body() {


    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRefrence = useRef(null)

    const passwordGenrator = useCallback(() => {
        let password = "";
        let string = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuiopasdfghjklzxcvbnm";
        if (numberAllowed) string += "0123456789"
        if (specialCharAllowed) string += "!@#$%^&*?/;:`~"
        for (let i = 1; i <= length; i++) {
            let charIndex = Math.floor(Math.random() * string.length + 1)
            password += string.charAt(charIndex);
        }

        setPassword(password)
    }, [length, numberAllowed, specialCharAllowed, setPassword])


    const copyPassword = useCallback(() => {
        passwordRefrence.current?.select()
        passwordRefrence.curent?.setSelectionRange(0, { length })
        window.navigator.clipboard.writeText(password)
    }, [password])

    useEffect(() => {
        passwordGenrator()
    }, [length, numberAllowed, specialCharAllowed, passwordGenrator])


    return (
        <div className='bg-custom-primary-dark'>
            <div className="flex justify-center items-center h-screen ">
                <div className=" flex flex-col bg-white shadow-md rounded-md p-6">
                    <div className='flex flex-row rounded-md'>
                        <input
                            type="text"
                            value={password}
                            className="outline-none w-full py-1 px-3 bg-custom-primary-dark text-white"
                            placeholder="Password"
                            readOnly
                            ref={passwordRefrence}
                        />
                        <button
                            onClick={copyPassword}
                            className='outline-none bg-custom-secondary-dark text-white px-3 py-0.5 shrink-0'>
                            copy
                        </button>
                    </div>
                    <div className='flex mt-5 text-sm gap-x-2'>
                        <div className='flex items-center gap-x-1'>
                            <input
                                type="range"
                                min={6}
                                max={20}
                                value={length}
                                className='cursor-pointer'
                                onChange={(e) => { setLength(e.target.value) }}
                            />
                            <label>Length: {length}</label>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <input
                                type="checkbox"
                                defaultChecked={numberAllowed}
                                id="numberInput"
                                onChange={() => {
                                    setNumberAllowed((prev) => !prev);
                                }}
                            />
                            <label htmlFor="numberInput">Numbers</label>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <input
                                type="checkbox"
                                defaultChecked={specialCharAllowed}
                                id="characterInput"
                                onChange={() => {
                                    setSpecialCharAllowed((prev) => !prev)
                                }}
                            />
                            <label htmlFor="characterInput">Characters</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Body