import React, { useEffect, useState } from 'react'
// import { API_KEY, BASE_URL } from '../../background'
import Widget, { Weather } from '../../content/Widget'


export default function App() {
    const [data, setData] = useState<Weather | null>(null)


    useEffect(() => {
        const port = chrome.runtime.connect({
            name: "Sample Communication"
        });
        port.postMessage({ type: "weather" });
        port.onMessage.addListener(function (msg) {
            if (msg.message === "success") {
                setData(msg.data)
            }
        });
    }, [])
    return (
        <Widget data={data} />
    )
}
