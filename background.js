var answr = [];

//в начале нового часа отправляет запрос на количество объявлений в medium
function start() {
    var tDate = new Date();
    if (localStorage.getItem('requestStatus') == 1){
        doRequest();
        localStorage.setItem('requestStatus', 0);
    }
    if (tDate.getMinutes() == 0){
        localStorage.setItem('requestStatus', 1);
    }
    setTimeout( function() { start(); }, 30 * 1000);
}

function doRequest(){
    var nDate = new Date();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www2.kufar.by/controlpanel?m=adqueue&a=show_adqueues', true);
    var formData = new FormData();
    var login = localStorage.getItem("chrExtLogin");
    var password = localStorage.getItem("chrExtPassword");
    formData.append("username", login);
    formData.append("cpasswd", password)
    formData.append("login", "Login")
    xhr.send(formData);
    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4) return;
        if(this.status != 200){}
        var data = xhr.responseText;
        var split = data.split('<a href="?lock=1&m=adqueue&a=show_adqueues&queue=medium">');
        var sptit2 = split[1].split(' Medium');
        var mediumAmount = sptit2[0];
        console.log(mediumAmount);
        localStorage.setItem('chrExtData:' + nDate.getFullYear() + "-" + (nDate.getMonth() + 1) + "-" + nDate.getDate() + "-" + nDate.getHours(), mediumAmount);
    }
}

//формирование массива с ответом.
function makingAnswer(nmbr){
    var massiveNmbr = 0;
    var tDate = new Date();
    tDate.setDate(1);
    Date.prototype.daysInMonth = function() {
        return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
    };
    daysNumber = tDate.daysInMonth();
    for(var i = 1; i <= daysNumber; i++){ //дней в месяце
        tDate.setDate(i);
        for(var n = 0; n < 24; n++){ //часов в дне
            tDate.setHours(n);
            var tmp = 'chrExtData:' + tDate.getFullYear() + "-" + (tDate.getMonth() + nmbr) + "-" + tDate.getDate() + "-" + tDate.getHours();
            var lstmp = localStorage.getItem(tmp);
            if(typeof lstmp !== 'undefined' && lstmp !== null){
                answr[massiveNmbr++] = tmp + '-' + localStorage.getItem(tmp);
            } 
            
        }
    }
    chrome.runtime.sendMessage({htmlanswer: answr});
    answr = [];
        
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      var cmd = request.action;
      switch(cmd) {
            case "give1":
                makingAnswer(1);
                break;
            case "give2":
                makingAnswer(0);
                break;
      }
  });

start();

