export const BASE_URL = "https://api.weatherapi.com/v1";
export const API_KEY = "ba48d91a06d04c3195d14615242807";
chrome.runtime.onInstalled.addListener(function (object) {
    const internalUrl = chrome.runtime.getURL("installed.html");

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: internalUrl }, function (tab) {
            console.log("New tab launched with installed.html");
        });
    }
});

chrome.runtime.onMessage.addListener(async function (msg) {
    if (msg.type === "location") {
        const internalUrl = chrome.runtime.getURL("installed.html");
        chrome.tabs.create({ url: internalUrl });
    } else if (msg.type === "weather") {
        const activeId = await chrome.tabs.query({ active: true, currentWindow: true })
        const response = await getWeather()
        chrome.tabs.sendMessage(activeId[0]?.id ?? 0, response)
    }
})

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