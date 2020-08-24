//link to server :-)
//var server = 'https://polar-chamber-44010.herokuapp.com';
var server = 'http://127.0.0.1:8090';
//var server = 'http://192.168.2.10:8090';

function wstecz() {
    window.history.back();
}

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

function checkAndReturnToken(redirect) {
    let token = "";
    const name = 'ZglosZabytekToken=';
    const all = document.cookie.split(';');
    for (let i = 0; i < all.length; i++) {
      let el = all[i];
      while (el.charAt(0) == ' ') {
        el = el.substring(1, el.length);
      }
      if (el.indexOf(name) == 0) {
        token = atob(el.substring(name.length, el.length));
      }
    }

    if (token == "") {
      return false;
    } else return token;
  }

if (checkAndReturnToken() == false) {
    var link = document.getElementById('niezalogowany');
    link.style.display = 'none';
    link = document.getElementById('niezalogowany2');
    link.style.display = 'none';
}