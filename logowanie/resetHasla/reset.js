$('#add-form').submit(function() {
    klik();
    return false;
});

czyNiezalogowany();

function klik() {
    var noweHaslo = document.getElementById("noweHaslo").value;
    var noweHaslo2 = document.getElementById("noweHaslo2").value;
    if(noweHaslo!=noweHaslo2) {
        alert("Nowe hasło i jego potwierdzenie są różne, wpisz je ponownie.");
        return;
    }
    let params = new URLSearchParams(location.search);
    var id = params.get('id');
    var url2 = server + '/api/v1/user/resetPass';
    var http = new XMLHttpRequest();
    http.open('POST', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
            window.location.assign("/");
        } else if (http.readyState == 4) {
            alert('Nieprawidłowy link lub hasło zostało już zresetowane.');
        }
    }
    http.send('id=' + id + '&newPassword=' + noweHaslo);
}