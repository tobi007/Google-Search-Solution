export const getItem = key => window.localStorage.getItem(key);
export const setItem = (key, value) => window.localStorage.setItem(key, value);



const getObject = (key, call_back) => {
  const result = getItem(key);
  try {
    let localStoragePages = JSON.parse(result);
    if (localStoragePages === undefined || localStoragePages === null) {
        localStoragePages = []
    }
    call_back(localStoragePages);
  } catch (e) {
    call_back([]);
  }
};

const setObject = (key, object, call_back) => {
  const value = JSON.stringify(object);
  setItem(key, value);
  getObject(key, call_back)
};

const setBadge = (counts) => {
    console.log('Batch Text')
}


export const localStorage = {
    setObject: setObject,
    getObject: getObject,
    setBadge: setBadge
}