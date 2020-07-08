/* global chrome */



export default chrome

const getObject = (key, call_back) => {
    chrome.storage.sync.get(key, function(data) {
        let localStoragePages = data.pages
        if (localStoragePages === undefined || localStoragePages === null) {
            localStoragePages = []
        }
        call_back(localStoragePages);
        console.log('Result Data', localStoragePages)
    });
};

const setBadge = (counts) => {
    if (counts > 999) {
        counts = `999+`;
    } 
    chrome.browserAction.setBadgeText({
      'text': counts.toString(),
    });
}

const setObject = (key, data, call_back) => {
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({pages: data}, function() {
      // Notify that we saved.
      setBadge(data.length)
      getObject(key, call_back)
    });
}


export const chromeStorage = {
    setObject: setObject,
    getObject: getObject,
    setBadge: setBadge
}
