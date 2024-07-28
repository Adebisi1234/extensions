import React, { useEffect, useState } from 'react'
import { API_KEY, BASE_URL } from '../../background'
import Widget, { Weather } from '../../content/Widget'

export default function App() {
    const [data, setData] = useState<Weather | null>(null)

    useEffect(() => {
        (async () => setData((await getWeather()).data))()
    }, [])
    return (
        <>{data ? <Widget data={data} /> : <p>Loading...</p>}</>
    )
}

async function getWeather() {
    const cache = await chrome.storage.local.get("weather")
    // Same Day
    if (cache?.weather?.date === new Date().toDateString() && cache.weather.data) {
        return { message: "success", data: cache.weather.data }
    } else {
        const loc = await chrome.storage.local.get("location")
        console.log(loc.location)
        const data = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${loc.location.value}`)
        const res = await data.json()
        console.log(res)

        if (data.ok) {
            chrome.storage.local.set({ "weather": { data: res, date: new Date().toDateString() } })
            return { message: "success", data: res }

        } else {
            return { message: "failed", data: res }
        }
    }
}