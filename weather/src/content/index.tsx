setTimeout(() => chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg)
}), 0)