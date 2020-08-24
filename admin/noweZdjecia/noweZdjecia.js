//do wyswietlania obrazow
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

$('#add-form').submit(function (e) {
    var numer = parseInt(document.getElementById("recznie2").value);
    wyslij();

    e.preventDefault();
});

var maps = new Array();

function wyslij() {
    var token = checkAndReturnToken();
    if (token == false) {
        alert("Musisz się zalogować.");
        document.location.href = "/admin/logowanie/";
        return;
    }
    var url2 = server + '/api/v1/admin/newPhotosRequests?page=0&size=1';
    var http = new XMLHttpRequest();
    http.open('GET', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Authorization', token);
    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var myArr = this.responseText;
            myArr = JSON.parse(this.responseText);
            localStorage.setItem('tablica', JSON.stringify(myArr.content));
            var iloscKart = myArr.totalElements;
            if (myArr.empty == true) {
                document.getElementById('pusto').style.display = 'initial';
            } else wypisz(myArr.content, iloscKart);

        } else if (http.readyState == 4) {
            alert('Niewłaściwy numer strony lub błąd połączenia!');
        }
    }
    http.send();
}

wyslij();

//ukrywanie zbednych kart i przyciskow w zaleznosci od liczby elementow
function wypisz(myArr, iloscKart) {

    for (a in maps) {
        maps[a].remove();
    }
    maps = [];

    var pomocnicza00 = document.getElementsByClassName('nazwa');
    var pomocnicza0 = document.getElementsByClassName('wypisz');
    var pomocnicza1 = document.getElementsByClassName('opis');
    var pomocnicza2 = document.getElementsByClassName('utworzyl');
    var arch = document.getElementsByClassName('arch');
    var arch0 = document.getElementsByClassName('arch0');
    var rec2 = document.getElementsByClassName('recent2');
    var rec1 = document.getElementsByClassName('recent1');
    var rec0 = document.getElementsByClassName('recent0');
    var rec22 = document.getElementsByClassName('recent22');
    var rec11 = document.getElementsByClassName('recent11');
    var rec00 = document.getElementsByClassName('recent00');
    var karty = document.getElementsByClassName('k');
    var mymap = document.getElementsByClassName('mapid');
    var brakZdjecNapis = document.getElementsByClassName('brakZdjecNapis');
    var zdjNowe00 = document.getElementsByClassName('zdjDoAkcept3');
    var zdjNowe0 = document.getElementsByClassName('zdjDoAkcept2');
    var zdjNoweInfo = document.getElementsByClassName('zdjDoAkceptDane');
    console.log(myArr);
    const i = 0;
    let max = myArr[i].requestPhotos.length;
    if (max > 12) max = 12;
    let k = 0;
    for (k; k < max; k++) {

        var nazwa = "Nazwa zabytku: " + myArr[i].name;
        var wypisz = "Typ: " + myArr[i].type + ", Miejscowość: " + myArr[i].city;
        wypisz += ", Ulica: " + myArr[i].street;
        var opis = "Opis: " + myArr[i].description[0].description;
        pomocnicza0[k].innerHTML = wypisz;
        pomocnicza1[k].innerHTML = opis;
        pomocnicza00[k].innerHTML = nazwa;
        var dodal = "Dodał: " + myArr[i].createdBy.name + ", data dodania: " + myArr[i].createdAt;

        pomocnicza2[k].innerHTML = dodal;

        var doZdj2 = server + '/request/assets/';
        var zdjNowe = myArr[i].requestPhotos[k];
        zdjNowe = zdjNowe.imageName;
        zdjNowe = doZdj2 + zdjNowe;
        zdjNowe00[k].src = zdjNowe;
        zdjNowe0[k].href = zdjNowe;
        zdjNoweInfo[k].innerHTML = "Dodał: " + myArr[i].requestPhotos[k].addedBy.name + ", data dodania: " + myArr[i].requestPhotos[k].createdAt;

        //ukrywanie zdjec
        var doZdj = server + '/assets/';
        var zdjArch = myArr[i].archivalPhoto;
        if (zdjArch != null) {
            zdjArch = zdjArch.imageName;
            zdjArch = doZdj + zdjArch;

            arch0[k].src = zdjArch;
            arch[k].href = zdjArch;
        }
        var zdj2 = myArr[i].recentPhotos[0];
        var zdj1 = myArr[i].recentPhotos[1];
        var zdj0 = myArr[i].recentPhotos[2];

        if (zdj0 != undefined) {
            zdj0 = zdj0.imageName;
            zdj0 = doZdj + zdj0;

            rec22[k].src = zdj0;
            rec2[k].href = zdj0;
        }

        if (zdj1 != undefined) {
            zdj1 = zdj1.imageName;
            zdj1 = doZdj + zdj1;

            rec11[k].src = zdj1;
            rec1[k].href = zdj1;
        }

        if (zdj2 != undefined) {
            zdj2 = zdj2.imageName;
            zdj2 = doZdj + zdj2;

            rec00[k].src = zdj2;
            rec0[k].href = zdj2;
        }
        if (zdjArch == null && zdj0 == zdj1 == zdj2 == undefined) {
            brakZdjecNapis[k].innerHTML = 'Brak zdjęć!';
        }

        var lat = myArr[i].latitude;
        var lng = myArr[i].longitude;

        var mymap2 = L.map(mymap[k]).setView([lat, lng], 18);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap2);
        var marker = L.marker([lat, lng]).addTo(mymap2);

        maps.push(mymap2);

        karty[k].style.display = 'inherit';
    }

    if (max < 12) {
        for (k; k < 12; k++) {
            karty[k].style.display = 'none';
        }
    }

    //pokazuje po wypelnieniu
    document.getElementById("ukryj").style.visibility = "visible";
    document.getElementById("oczekujace").innerText += ' ' + iloscKart;
    document.getElementById("idZabytku").innerText += ' ' + myArr[0].id;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function akceptuj(el, add) {
    var tablica2 = JSON.parse(localStorage.getItem('tablica'));
    var url2 = server + '/api/v1/admin/acceptPhotos';
    var token = checkAndReturnToken();
    if (token == false) {
        alert("Musisz się zalogować.");
        document.location.href = "/admin/logowanie/";
        return;
    }
    var http = new XMLHttpRequest();
    console.log(tablica2[0].id);
    console.log(tablica2[0].requestPhotos[el].id);
    http.open('POST', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Authorization', token);
    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.response);
            location.reload();
        } else if (http.readyState == 4) {
            alert(http.response);
        }
    }
    http.send('id=' + tablica2[0].id + '&idPhoto=' + tablica2[0].requestPhotos[el].id + '&accept=' + add);
}



function afterClick(wart2, i) {
    event.preventDefault();
    var widoczne = wart2.style.display;
    if (widoczne == 'none') {
        wart2.style.display = 'initial';
        maps[i].invalidateSize();
    } else wart2.style.display = 'none';
}

var list = document.getElementsByClassName("mapa");
var list2 = document.getElementsByClassName("pokaMapa");
var accept = document.getElementsByClassName("akceptuj");
var refuse = document.getElementsByClassName("odrzuc");
for (var i = 0; i < list.length; i++) {
    list[i].addEventListener("click", afterClick.bind(this, list2[i], i), false);
    accept[i].addEventListener("click", akceptuj.bind(this, i, true), false);
    refuse[i].addEventListener("click", akceptuj.bind(this, i, false), false);
}