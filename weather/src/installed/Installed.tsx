import React, { useRef } from 'react'

export default function Installed() {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div>
            <h4>Welcome to the weather widget</h4>
            <p>Please enter your location, so as to get accurate forecasts</p>
            <input type="text" placeholder='Nigeria' ref={inputRef} />
            <button onClick={() => {
                if (!inputRef.current || inputRef.current.value.trim() === "") return;
                chrome.runtime.sendMessage({
                    type: "query",
                    value: inputRef.current.value
                })
                chrome.storage.local.set({ location: inputRef.current.value })
            }}>Submit</button>
        </div>
    )
}
