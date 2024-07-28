import React, { useEffect, useState } from 'react'
import './styles.css';
export interface Weather {
    location: {
        name: string,
        region: string,
        country: string,
        lat: number,
        lon: number,
        tz_id: string,
    },
    current: {
        last_updated: string,
        temp_c: string,
        temp_f: string,
        condition: {
            text: string,
            icon: string,
            code: number
        }
    }
}

export default function Widget({ data }: {
    data: Weather | null
}) {
    const [useCel, setUseCel] = useState(true)
    if (data) {
        return <div>
            <span className='badge'>{data?.location.name}</span>
            <div className="container">
                <div className="details" title={data?.current.condition.text}>
                    <img src={`https://${data?.current.condition.icon.substring(2)}`} alt={data?.current.condition.text} width={16} height={16} />
                    <button onClick={() => setUseCel((prev) => !prev)} title={data?.current.condition.text}>
                        <p>{useCel ? `${data?.current.temp_c}°C` : `${data?.current.temp_f}°F`}</p>
                    </button>
                </div>

            </div>
        </div>
    }
    const [weather, setWeather] = useState<Weather | null>(null)

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            chrome.runtime.sendMessage({ type: "weather" })
            chrome.runtime.onMessage.addListener((response) => {
                console.log(response);
                if (response.message === "success") {
                    setWeather(response.data)
                    setLoading(false)
                }
            })
        })()

    }, [])
    return (
        <>
            {loading ? <div>loading...</div> : weather && <div>
                <span className='badge'>{weather?.location.name}</span>
                <div className="container">
                    <div className="details">
                        <img src={`https://${weather?.current.condition.icon.substring(2)}`} alt={weather?.current.condition.text} width={16} height={16} />
                        <button onClick={() => setUseCel((prev) => !prev)}>
                            <p>{useCel ? `${weather?.current.temp_c}°C` : `${weather?.current.temp_f}°F`}</p>
                        </button>
                    </div>
                    <div className="reload" onClick={() => chrome.runtime.sendMessage({ type: "weather" })}>
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M904.161882 587.294118c-13.733647 0-25.238588 9.456941-28.973176 22.708706C832.451765 761.976471 693.007059 873.411765 527.36 873.411765c-165.586824 0-305.091765-111.435294-347.828706-263.408941-3.704471-13.251765-15.239529-22.708706-28.973176-22.708706-19.968 0-34.304 19.184941-28.912942 38.4C171.188706 803.297882 333.914353 933.647059 527.299765 933.647059c193.475765 0 356.141176-130.349176 405.775059-307.952941a30.177882 30.177882 0 0 0-28.912942-38.4M150.528 436.705882c13.733647 0 25.268706-9.487059 28.973176-22.708706C222.238118 262.023529 361.743059 150.588235 527.36 150.588235c165.616941 0 305.121882 111.435294 347.858824 263.408941 3.704471 13.221647 15.209412 22.708706 28.943058 22.708706 19.998118 0 34.304-19.184941 28.912942-38.4C883.471059 220.702118 720.805647 90.352941 527.36 90.352941S171.218824 220.702118 121.615059 398.305882a30.177882 30.177882 0 0 0 28.912941 38.4" fill="#fff" /><path d="M86.949647 369.392941l138.691765 33.822118a12.047059 12.047059 0 0 1 5.180235 20.690823l-100.201412 89.840942a12.047059 12.047059 0 0 1-19.546353-5.421177L72.583529 384.692706a12.047059 12.047059 0 0 1 14.366118-15.269647zM972.077176 646.896941l-141.131294-21.62447a12.047059 12.047059 0 0 1-6.927058-20.148706l91.949176-98.213647a12.047059 12.047059 0 0 1 19.937882 3.644235l49.121883 119.868235a12.047059 12.047059 0 0 1-12.950589 16.474353z" fill="#fff" /></svg>
                    </div>
                </div>
            </div>}
        </>
    )
}
