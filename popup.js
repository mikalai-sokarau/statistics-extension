document.addEventListener('DOMContentLoaded', function () {
    var forms = document.getElementsByTagName("form");
    for (var i = 0; i < forms.length; i++) {
        (function () {
            var fr = forms[i];
            var location = fr.action;
            fr.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
    var inputs = document.getElementsByTagName("input");
    var savedLgn = localStorage.getItem("chrExtLogin");
    var savedPss = localStorage.getItem("chrExtPassword");
    if(savedLgn !== "null"){
        document.getElementsByName("username")[0].value = savedLgn;
    }
    if(savedPss !== "null"){
        document.getElementsByName("cpasswd")[0].value = savedPss;
    }
    inputs[2].onclick = function(){
        if(document.getElementsByName("username")[0].value !== "" && savedLgn !== document.getElementsByName("username")[0].value){
            localStorage.setItem("chrExtLogin", document.getElementsByName("username")[0].value);
        } 
        
        if(document.getElementsByName("cpasswd")[0].value !== "" && savedPss !== document.getElementsByName("cpasswd")[0].value){
            localStorage.setItem("chrExtPassword", document.getElementsByName("cpasswd")[0].value);
        }
        
        if(document.getElementsByName("username")[0].value == "" || document.getElementsByName("cpasswd")[0].value == ""){
            alert("Сначала введите логин/пароль!");
        } else {
            window.close();
        }
    }
    
    
        
});
