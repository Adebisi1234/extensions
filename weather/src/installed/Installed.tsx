import React, { useEffect, useRef, useState } from 'react'

export default function Installed() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [useGeoLocation, setUseGeoLocation] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (!useGeoLocation) return;

        navigator.geolocation.getCurrentPosition(async (position) => {
            await chrome.storage.local.set({ location: { type: "name", value: `${position.coords.latitude},${position.coords.longitude}` } })

            window.close()
        }, (error) => {
            alert("Error getting geolocation" + error.message)

        })

    }, [useGeoLocation])
    return (
        <div className='container'>
            <h4>Welcome to the weather widget</h4>
            <p>Please enter your location, so as to get accurate forecasts</p>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log("submitted")
                setLoading(true)
            }}>
                <fieldset>
                    <input type="text" placeholder='city name' ref={inputRef} />
                    <button type='submit' onClick={async () => {
                        if (!inputRef.current || inputRef.current.value.trim() === "") return;
                        await chrome.storage.local.set({ location: { type: "name", value: inputRef.current.value } })
                        window.close()
                    }}>Submit</button>
                </fieldset>
                <button type='submit' onClick={() => {
                    setUseGeoLocation(true)
                }} >Use Geolocation</button>
            </form>
            {loading && <p>Setting up...</p>}
        </div>
    )
}
