chrome.runtime.sendMessage({ msg: 'getStatistics' });

chrome.runtime.onMessage.addListener(req => {
    const store = req.store;

    if (store) {
        createTemplate(JSON.parse(store));
    }
})

function createTemplate(store) {
    const table = document.querySelector('table'),
        tableHeader = document.querySelector('.table-header'),
        keys = Object.keys(store),
        intervals = getIntervals(keys),
        headers = getHeaders(keys, store);

    console.log(headers)
    renderIntervals(intervals, table);
    renderHeaders(headers, tableHeader);
    renderAmount(store, keys);
}

function getIntervals(keys) {
    return keys.reduce((acc, key) => {
        const date = new Date(+key),
            hours = date.getHours();
        let minutes = date.getMinutes();

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        
        acc[`${hours}_${minutes}`] = `${hours}:${minutes}`;
        return acc;
    }, {});
}

function renderIntervals(intervals, table) {
    Object.keys(intervals).forEach(key => {
        const tr = document.createElement('tr'),
            td = document.createElement('td');

        tr.classList.add(`interval-${key}`);
        td.textContent = intervals[key];

        tr.appendChild(td);
        table.appendChild(tr);        
    })
}

function getHeaders(keys, store) {
    return Object.keys(
        keys.reduce((acc, key) => {
            const day = (new Date(+key)).getDate();
            
            !acc[day] ? acc[day] = [store[key]] : acc[day].push(store[key]);
            
            return acc;
        }, {})
    );
}

function renderHeaders(headers, tableHeader) {
    /*
        empty 'th' element for the first place in the table headers
    */
    tableHeader.appendChild(document.createElement('th')); 

    headers.forEach(item => {
        const th = document.createElement('th');

        th.textContent = item;
        tableHeader.appendChild(th);
    });
};

function renderAmount(store, keys) {
    keys.forEach(key => {
        const date = new Date(+key),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            td = document.createElement('td'),
            trClass = `.interval-${hours}_${minutes < 10 ? '0' + minutes : minutes}`,
            tr = document.querySelector(trClass);
        
        td.textContent = store[key];
        tr.appendChild(td);
    })
};
