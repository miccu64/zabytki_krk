$('#add-form').submit(function() {
    var button = document.getElementById("przycisk");
    button.style.display = 'none';
    button = document.getElementById("czekaj");
    button.style.display = 'initial';
    klik();
    return false;
});

czyNiezalogowany();

function klik() {
    var poczta = document.getElementById("poczta").value;
    var haslo = document.getElementById("haslo").value;
    var url2 = server + '/api/v1/user/login';

    var http = new XMLHttpRequest();
    http.open('POST', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem('token', http.responseText);
            alert('Zalogowano pomyślnie!');
            window.location.assign("/");
        } else if (http.readyState == 4) {
            var button = document.getElementById("przycisk");
            button.style.display = 'initial';
            button = document.getElementById("czekaj");
            button.style.display = 'none';
            alert(http.responseText);
        }
    }
    http.send('email=' + poczta + '&password=' + haslo);
}