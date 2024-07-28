export const BASE_URL = "https://api.weatherapi.com/v1";
export const API_KEY = "my_secret";
chrome.runtime.onInstalled.addListener(function (object) {
    const internalUrl = chrome.runtime.getURL("installed.html");

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: internalUrl }, function (tab) {
            console.log("New tab launched with installed.html");
        });
    }
});

chrome.runtime.onMessage.addListener(async function (msg, sender, response) {
    if (msg.type === "location") {
        const internalUrl = chrome.runtime.getURL("installed.html");
        chrome.tabs.create({ url: internalUrl }, function (tab) {
            console.log("New tab launched with installed.html");
        });
    }
})