document.getElementById("usun").addEventListener("click", function() {
    event.preventDefault();
    var widoczne = document.getElementById("usunWidoczne").style.display;
    if (widoczne == 'none')
        document.getElementById("usunWidoczne").style.display = 'initial';
    else document.getElementById("usunWidoczne").style.display = 'none';
}, false);

document.getElementById("zbanuj").addEventListener("click", function() {
    event.preventDefault();
    var widoczne = document.getElementById("zbanujWidoczne").style.display;
    if (widoczne == 'none')
        document.getElementById("zbanujWidoczne").style.display = 'initial';
    else document.getElementById("zbanujWidoczne").style.display = 'none';
}, false);

function usun() {
    var id = document.getElementById("idZabytku").value;
    var url2 = server + '/api/v1/admin/deleteArtifact';
    var token = checkAndReturnToken();
    var http = new XMLHttpRequest();
    http.open('DELETE', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Authorization', token);
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.status == 200 || http.status == 202 || http.status == 204) {
            alert('Pomyślnie usunięto zabytek!');
            window.location.reload();
        } else if (http.readyState == 4) {
            alert("Niepoprawne id lub błąd połączenia.");
            window.location.reload();
        }
    }
    http.send('artifactId=' + id);
}

function zbanuj() {
    var id = document.getElementById("nazwa").value;
    var url2 = server + '/api/v1/admin/banUser';
    var token = checkAndReturnToken();
    console.log(id);
    var http = new XMLHttpRequest();
    http.open('POST', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Authorization', token);
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.status == 200 || http.status == 202 || http.status == 204) {
            alert("Pomyślnie zbanowano użytkownika.");
            window.location.reload();
        } else if (http.readyState == 4) {
            alert("Niepoprawne id lub błąd połączenia.");
            window.location.reload();
        }
    }
    http.send('name=' + id);
}