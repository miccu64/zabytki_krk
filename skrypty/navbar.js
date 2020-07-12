//link to server :-)
//var server = 'https://polar-chamber-44010.herokuapp.com';
//var server = 'http://127.0.0.1:8090';
var server = 'http://192.168.2.8:8090';

function czyZalogowany() {
    var token = localStorage.getItem('token');
    if (token == null) {
        alert("Zaloguj się, aby wykonać tę czynność.");
        window.location.assign("/logowanie");
    }
}

function czyNiezalogowany() {
    var token = localStorage.getItem('token');
    if (token != null) {
        alert("Jesteś już zalogowany!");
        window.location.replace("/");
    }
}

function wyloguj() {
    localStorage.removeItem('token');
    alert('Wylogowano pomyślnie.');
}

if (localStorage.getItem('token') == null) {
    var link = document.getElementById('niezalogowany');
    link.style.display = 'none';    
    link = document.getElementById('niezalogowany2');
    link.style.display = 'none';
} else {
    var link2 = document.getElementById('zalogowany2');
    link2.style.display = 'none';
    link2 = document.getElementById('zalogowany3');
    link2.style.display = 'none';
}