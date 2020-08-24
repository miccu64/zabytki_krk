//do wyswietlania obrazow
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

$('#add-form').submit(function(e) {
    wyslij();
    e.preventDefault();
});

var maps = new Array();

function akceptuj(el, add) {
    var tablica2 = JSON.parse(localStorage.getItem('tablica'));
    var url2 = server + '/api/v1/admin/acceptDescription';
    var token = checkAndReturnToken();
    if (token == false) {
        alert("Musisz się zalogować.");
        document.location.href = "/admin/logowanie/";
        return;
    }
    let info;
    if (add == true) {
        info = 'Jesteś pewien, że chcesz ZAAKCEPTOWAĆ opis?';
    } else info = 'Jesteś pewien, że chcesz ODRZUCIĆ opis?';
    if (confirm('Jesteś pewien, że chcesz zaakceptować zabytek?') == false) {
        return false;
    }
    var http = new XMLHttpRequest();
    http.open('POST', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Authorization', token);
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.response);
            location.reload();
        } else if (http.readyState == 4) {
            alert(http.response);
        }
    }
    http.send('id=' + tablica2[0].id + "&idDesc=" + tablica2[0].descriptionRequest[el].id + '&accept=' + add);
}

wyslij();

function wyslij() {
    let params = new URLSearchParams(location.search);
    var strona = params.get('page');
    var url2 = server + '/api/v1/admin/newDescriptionsRequests?page=0&size=1';
    var token = checkAndReturnToken();
    if (token == false) {
        alert("Musisz się zalogować.");
        document.location.href = "/admin/logowanie/";
        return;
    }
    var http = new XMLHttpRequest();
    http.open('GET', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Authorization', token);
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var myArr = this.responseText;
            myArr = JSON.parse(this.responseText);
            localStorage.setItem('tablica', JSON.stringify(myArr.content));
            var iloscKart = myArr.totalElements;
            if (myArr.empty == true) {
                document.getElementById('pusto').style.display = 'initial';
            } else wypisz(myArr.content, strona + 1, iloscKart);

        } else if (http.readyState == 4) {
            alert('Niewłaściwy numer strony lub błąd połączenia!');
        }
    }
    http.send();
}

//ukrywanie zbednych kart i przyciskow w zaleznosci od liczby elementow
function wypisz(myArr, strona, iloscKart) {
    var iloscKartNaStronie = iloscKart % 12;

    if (strona * 12 <= iloscKart) {
        var max = 12;
    } else var max = iloscKartNaStronie;

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
    var nowyOpis = document.getElementsByClassName('nowyOpis');
    var nowyOpis2 = document.getElementsByClassName('nowyOpis2');

    const i = 0;
    let k = 0;
    let mymax = myArr[i].descriptionRequest.length;
    if (mymax > 12) mymax = 12;
    for (k; k < mymax; k++) {

       var nazwa = "Nazwa zabytku: " + myArr[i].name;
        var wypisz = "Typ: " + myArr[i].type + ", Miejscowość: " + myArr[i].city;
        wypisz += ", Ulica: " + myArr[i].street;
        var opis = "Obecny opis: " + myArr[i].description[0].description;
        pomocnicza0[k].innerHTML = wypisz;
        pomocnicza1[k].innerHTML = opis;
        pomocnicza00[k].innerHTML = nazwa;
        var dodal = "Dodał: " + myArr[i].createdBy.name + ", data dodania: " + myArr[i].createdAt;

        pomocnicza2[k].innerHTML = dodal;

        nowyOpis[k].textContent = 'Dodał: ' + myArr[i].descriptionRequest[k].createdBy.name + ", data dodania: " + myArr[i].descriptionRequest[k].createdAt;
        nowyOpis2[k].textContent = myArr[i].descriptionRequest[k].description;

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
        console.log(myArr);
        if (zdjArch == null && zdj0 == zdj1 == zdj2 == undefined) {
            console.log("aaaa");
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
        for (max; k < 12; k++) {
            if (iloscKartNaStronie < 12) {
                for (var b = iloscKartNaStronie; b < 12; b++) {
                    karty[b].style.display = 'none';
                }
            }
        }
    }

    document.getElementById("oczekujace").innerText += ' ' + iloscKart;
    document.getElementById("idZabytku").innerText += ' ' + myArr[0].id;
    //pokazuje po wypelnieniu
    document.getElementById("ukryj").style.visibility = "visible";

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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