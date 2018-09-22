chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.runtime.sendMessage({ action: 'give1' });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var xNum = request.htmlanswer;

  //логика поиска и вставки в нужное место таблицы
  function searchAndPaste() {
    for (var i = 0; i < xNum.length; i++) {
      if (typeof xNum[i] !== 'undefined' && xNum[i] !== null) {
        var split = xNum[i].split('-');
        //chrExtData:2016-3-1-0-100
        var sDate = split[2];
        var sAmount = split[4];
        var sHour = split[3];

        if (document.getElementById('date' + sDate)) {
          //существует ли такая дата в таблице
          addTd(sAmount, sDate + ':' + sHour);
        } else {
          var newtd = document.createElement('td');
          
          newtd.innerHTML = sDate; //дата вверху статистики
          newtd.id = 'date' + sDate; //id даты
          document.getElementById('dateLine').appendChild(newtd);
          for (var n = 0; n < 24; n++) {
            var ntd = document.createElement('td');
            ntd.id = sDate + ':' + n;
            document.getElementById('tr' + n).appendChild(ntd);
          }
          addTd(sAmount, sDate + ':' + sHour);
        }
      }
    }
  }

  if (typeof xNum !== 'undefined' && xNum !== null) {
    searchAndPaste();
  }
});

//добавляет новый td в таблицу first.html
function addTd(amount, id) {
  const newtd = document.getElementById(id);
  newtd.innerHTML = amount;
}
