import React, { useEffect, useState } from 'react'
import { API_KEY, BASE_URL } from '../../background'


export default function App() {
    const [location, setLocation] = useState("")
    const [data, setData] = useState<{ [key: string]: string }>({})
    useEffect(() => {
        async function getWeather() {
            const location = await chrome.storage.local.get("location")
            if (!location) {
                chrome.runtime.sendMessage({ type: "location", action: "installed.html" })
                chrome.runtime.onMessage.addListener(function (msg, sender, response) {
                    if (msg.type === "query") {
                        console.log(msg, "msg")
                        // setLocation(msg.value)
                    }
                })
                return;
            }
            const data = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}`)
            if (data.ok) {
                console.log(await data.json())
                setData(await data.json())
            }
        }
        getWeather()
    }, [])
    console.log("Hii")
    return (
        <div>App hello</div>
    )
}
