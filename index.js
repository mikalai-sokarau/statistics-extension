// document.addEventListener('DOMContentLoaded', function () {
//     var forms = document.getElementsByTagName("form");
//     for (var i = 0; i < forms.length; i++) {
//         (function () {
//             var fr = forms[i];
//             var location = fr.action;
//             fr.onclick = function () {
//                 chrome.tabs.create({active: true, url: location});
//             };
//         })();
//     }
//     var inputs = document.getElementsByTagName("input");
//     var savedLgn = localStorage.getItem("chrExtLogin");
//     var savedPss = localStorage.getItem("chrExtPassword");
//     if(savedLgn !== "null"){
//         document.getElementsByName("username")[0].value = savedLgn;
//     }
//     if(savedPss !== "null"){
//         document.getElementsByName("cpasswd")[0].value = savedPss;
//     }
//     inputs[2].onclick = function(){
//         if(document.getElementsByName("username")[0].value !== "" && savedLgn !== document.getElementsByName("username")[0].value){
//             localStorage.setItem("chrExtLogin", document.getElementsByName("username")[0].value);
//         } 
        
//         if(document.getElementsByName("cpasswd")[0].value !== "" && savedPss !== document.getElementsByName("cpasswd")[0].value){
//             localStorage.setItem("chrExtPassword", document.getElementsByName("cpasswd")[0].value);
//         }
        
//         if(document.getElementsByName("username")[0].value == "" || document.getElementsByName("cpasswd")[0].value == ""){
//             alert("Сначала введите логин/пароль!");
//         } else {
//             window.close();
//         }
//     }
// });


chrome.runtime.sendMessage({ msg: 'getStatistics' });

chrome.runtime.onMessage.addListener(req => {
    const store = req.store;

    if (store) {
        createTemplate(JSON.parse(store));
    }
})

/* 
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>Peter</td>
    <td>Griffin</td>
    <td>$100</td>
  </tr> 
*/

function createTemplate(store) {
    const table = document.querySelector('table'),
        tableHeader = document.querySelector('.table-header'),
        keys = Object.keys(store),
        intervals = getTime(keys)
        headers = getHeaders(store, keys);

    addIntervalsToTable(intervals, table);
    addHeadersToTable(headers, table);

    // keys.forEach(key => {
    //     const date = new Date(+key),
    //         hours = date.getHours(),
    //         minutes = date.getMinutes(),
    //         timeNode = document.createElement('td'),
    //         adsNode = document.createElement('td');

    //     let dayNode = document.querySelector(`.day-${day}`);

    //     if (!dayNode) {
    //         dayNode = document.createElement('th');
    //         dayNode.classList.add(`day-${day}`);
    //         dayNode.textContent = day;
    //         tableHeader.appendChild(dayNode);
    //     }

    //     timeNode.textContent = `${hours}:${minutes}`;
    //     adsNode.textContent = store[key];

    //     dayNode.appendChild(timeNode);
    //     dayNode.appendChild(adsNode);
    //     // table.appendChild(tr);
    // })
}

function getTime(keys) {
    return keys.reduce((acc, key) => {
        const date = new Date(+key),
            hours = date.getHours(),
            minutes = date.getMinutes();
        
        acc[`${hours}_${minutes}`] = `${hours}:${minutes}`;
        
        return acc;
    }, {});
}

function addIntervalsToTable(intervals, table) {
    Object.keys(intervals).forEach(key => {
        const tr = document.createElement('tr'),
            td = document.createElement('td');

        tr.classList.add(`interval-${key}`);
        td.textContent = intervals[key];

        tr.appendChild(td);
        table.appendChild(tr);        
    })
}

function getHeaders(store, keys) {
    return keys.filter(key => {
        
    })
}
