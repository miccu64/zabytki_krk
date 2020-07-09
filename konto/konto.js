$('#add-form').submit(function() {
    klik();
    return false;
});

czyZalogowany();

function klik() {
    var stareHaslo = document.getElementById("stareHaslo").value;
    var noweHaslo = document.getElementById("noweHaslo").value;
    var url2 = server + '/api/v1/user/changePass?';
    var token = localStorage.getItem('token');
    var http = new XMLHttpRequest();
    http.open('POST', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Authorization', token);
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            if(http.responseText == token) {
                alert('Pomyślnie zmieniono hasło!');
                window.location.replace("/");
            }
        } else if (http.readyState == 4) {
            alert('Niewłaściwe stare hasło!');
        }
    }
    http.send('oldPassword=' + stareHaslo + '&newPassword=' + noweHaslo);
}