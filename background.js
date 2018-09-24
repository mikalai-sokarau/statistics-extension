const INTERVAL = 15, // in minutes
      STORE_SHELF_LIFE = 1000 * 60 * 60 * 7, // 5 minutes
      STORE = 'STATISTICS_STORE';

localStorage.setItem(STORE, '{}'); // store initialization

function checkTimeForRequest() {
    const date = new Date(),
          minutes = date.getMinutes();

    if (minutes % INTERVAL === 0) {
        getQueueAds(date);
    }
    setTimeout(checkTimeForRequest, 58 * 1000);
}

function getQueueAds(date) {
    fetch('https://www2.kufar.by/controlpanel?m=adqueue&a=show_adqueues')
        .then(res => res.text())
        .then(str => {
            const dom = (new DOMParser).parseFromString(str, "text/html"),
                queue = dom.querySelector('a[href$="queue=medium"]').textContent,
                ads = queue.split(" ")[0],
                store = getStore(date),
                key = date.getTime();

            localStorage.setItem(STORE, JSON.stringify({...store, [key]: ads}));
        })
        .catch(e => {
            /*
                The main reason why we can get an exception here that
                user isn't loged in on controlpanel.
            */
            console.log(e);
        }) ;
}

function getStore(date) {
    let store = JSON.parse(localStorage.getItem(STORE));

    return Object.keys(store).reduce((acc, key) => {
        if (date.getTime() - ( new Date(+key) ).getTime() < STORE_SHELF_LIFE) {
            return {...acc, [key]: store[key]}
        };

        return acc;
    }, {})
}

chrome.runtime.onMessage.addListener(req => {
    if (req.msg === 'getStatistics') {
        try {
            chrome.runtime.sendMessage({ store: localStorage.getItem(STORE) });
        } catch (e) {
            /*
                There weren't any errors here, this try-catch is just to be sure.
            */
            console.log(e);
        }
    }
})

checkTimeForRequest();
