czyNiezalogowany();

//zdobadz id z linku
let params = new URLSearchParams(location.search);
var id = params.get('id');

var url2 = server + '/api/v1/user/confirm';
var http = new XMLHttpRequest();
http.open('POST', url2, true);
//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
http.onreadystatechange = function() { //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
        document.getElementById("potwierdz").innerText = http.responseText;
    } else {
        document.getElementById("potwierdz").innerText = "Wprowadzono niepoprawny link potwierdzający rejestrację.";
    }
}
http.send('id=' + id);