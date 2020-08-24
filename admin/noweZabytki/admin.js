//do wyswietlania obrazow
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

$('#add-form').submit(function(e) {
    var numer = parseInt(document.getElementById("recznie2").value);
    wyslij(numer, 2);

    e.preventDefault();
});

var maps = new Array();

function akceptuj(el, add) {
    var tablica2 = JSON.parse(localStorage.getItem('tablica'));
    var url2 = server + '/api/v1/admin/acceptArtifact';
    var token = checkAndReturnToken();
    if (token == false) {
        alert("Musisz się zalogować.");
        document.location.href = "/admin/logowanie/";
        return;
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
    http.send('id=' + tablica2[el].id + '&accept=' + add);
}



$(window).on('popstate', function(e) {
    let par = new URLSearchParams(location.search);
    wyslij(parseInt(par.get('page')), true);
});


let par = new URLSearchParams(location.search);
wyslij(parseInt(par.get('page')), true);

function wyslij(oIle, czyRecznie) {
    let params = new URLSearchParams(location.search);
    var strona = params.get('page');
    if (czyRecznie == false) {
        strona = parseInt(strona);
        if ((oIle == -2) || (oIle == 0))
            strona = 0;
        else if (oIle == 2)
            strona = parseInt(document.getElementById("b3").textContent) - 1;
        else strona += oIle - 1;
    } else strona = oIle - 1;
    var token = checkAndReturnToken();
    if (token == false) {
        alert("Musisz się zalogować.");
        document.location.href = "/admin/logowanie/";
        return;
    }
    var rozmiar = '12';
    var url2 = server + '/api/v1/admin/newArtifactsRequests?page=' + strona + '&size=' + rozmiar;
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
            var iloscStron = myArr.totalPages;
            if (myArr.empty == true) {
                document.getElementById('pusto').style.display = 'initial';
            } else wypisz(myArr.content, strona + 1, iloscKart, iloscStron, czyRecznie);

        } else if (http.readyState == 4) {
            alert('Niewłaściwy numer strony lub błąd połączenia!');
        }
    }
    http.send();
}

//ukrywanie zbednych kart i przyciskow w zaleznosci od liczby elementow
function wypisz(myArr, strona, iloscKart, iloscStron, zapisHistorii) {
    var iloscKartNaStronie = iloscKart % 12;
    var link;

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

    for (i = 0; i < max; i++) {

       var nazwa = "Nazwa zabytku: " + myArr[i].name;
        var wypisz = "Typ: " + myArr[i].type + ", Miejscowość: " + myArr[i].city;
        wypisz += ", Ulica: " + myArr[i].street;
        var opis = "Opis: " + myArr[i].description[0].description;
        pomocnicza0[i].innerHTML = wypisz;
        pomocnicza1[i].innerHTML = opis;
        pomocnicza00[i].innerHTML = nazwa;
        var dodal = "Dodał: " + myArr[i].createdBy.name + ", data dodania: " + myArr[i].createdAt + ", ID zabytku: " + myArr[i].id;

        pomocnicza2[i].innerHTML = dodal;

        //ukrywanie zdjec
        var doZdj = server + '/request/assets/';
        var zdjArch = myArr[i].archivalPhoto;
        if (zdjArch != null) {
            zdjArch = zdjArch.imageName;
            zdjArch = doZdj + zdjArch;

            arch0[i].src = zdjArch;
            arch[i].href = zdjArch;
        }
        var zdj2 = myArr[i].recentPhotos[0];
        var zdj1 = myArr[i].recentPhotos[1];
        var zdj0 = myArr[i].recentPhotos[2];

        if (zdj0 != undefined) {
            zdj0 = zdj0.imageName;
            zdj0 = doZdj + zdj0;

            rec22[i].src = zdj0;
            rec2[i].href = zdj0;
        }

        if (zdj1 != undefined) {
            zdj1 = zdj1.imageName;
            zdj1 = doZdj + zdj1;

            rec11[i].src = zdj1;
            rec1[i].href = zdj1;
        }

        if (zdj2 != undefined) {
            zdj2 = zdj2.imageName;
            zdj2 = doZdj + zdj2;

            rec00[i].src = zdj2;
            rec0[i].href = zdj2;
        }
        console.log(myArr);
        if (zdjArch == null && zdj0 == zdj1 == zdj2 == undefined) {
            console.log("aaaa");
            brakZdjecNapis[i].innerHTML = 'Brak zdjęć!';
        }

        var lat = myArr[i].latitude;
        var lng = myArr[i].longitude;

        var mymap2 = L.map(mymap[i]).setView([lat, lng], 18);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap2);
        var marker = L.marker([lat, lng]).addTo(mymap2);

        maps.push(mymap2);

        karty[i].style.display = 'inherit';
    }

    if (max < 12) {
        for (max; i < 12; i++) {
            if (iloscKartNaStronie < 12) {
                for (var b = iloscKartNaStronie; b < 12; b++) {
                    karty[b].style.display = 'none';
                }
            }
        }
    }

    document.getElementById("b1").textContent = strona - 1;
    document.getElementById("b2").textContent = strona + 1;
    document.getElementById("b3").textContent = iloscStron;
    if (strona == 1) {
        document.getElementById("b0").style.display = "none";
        document.getElementById("b1").style.display = "none";
        document.getElementById("b2").style.display = "initial";
        document.getElementById("b3").style.display = "initial";
        document.getElementById("przerwa1").style.display = "none";
        document.getElementById("przerwa2").style.display = "none";
        document.getElementById("przerwa3").style.display = "initial";
    } else if (strona == iloscStron) {
        document.getElementById("b0").style.display = "initial";
        document.getElementById("b1").style.display = "initial";
        document.getElementById("b2").style.display = "none";
        document.getElementById("b3").style.display = "none";
        document.getElementById("przerwa1").style.display = "initial";
        document.getElementById("przerwa2").style.display = "none";
        document.getElementById("przerwa3").style.display = "none";
    } else {
        document.getElementById('b0').style.display = 'initial';
        document.getElementById('b1').style.display = 'initial';
        document.getElementById("b2").style.display = "initial";
        document.getElementById("b3").style.display = "initial";
        document.getElementById("przerwa1").style.display = "initial";
        document.getElementById("przerwa2").style.display = "initial";
        document.getElementById("przerwa3").style.display = "initial";
    }

    if (strona == iloscStron - 1) {
        document.getElementById("b2").style.display = "none";
        document.getElementById("przerwa2").style.display = "none";
    }

    if (strona == 2) {
        document.getElementById("b1").style.display = "none";
        document.getElementById("przerwa2").style.display = "none";
    }

    if (zapisHistorii == false || zapisHistorii == 2) {
        var str = '/admin/noweZabytki/?page=' + strona;
        document.getElementById("nrStrony").textContent = "Obecna strona: " + strona;
        window.history.pushState(null, '', str);
    }
    document.getElementById("recznie").textContent = "Wpisz numer strony (od 1 do " + iloscStron + "):";
    $("#recznie2").attr({
        "max": iloscStron,
        "min": 1
    });

    if (iloscStron < 2)
        document.getElementById("jednaStrona").style.display = 'none';

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