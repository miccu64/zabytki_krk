$('#add-form').submit(function(e) {   
    var numer = parseInt(document.getElementById("recznie2").value);
    wyslij(numer, 2);

    e.preventDefault();
});

$(window).on('popstate', function (e) {
    let par = new URLSearchParams(location.search);
    wyslij(parseInt(par.get('page')), true);
});

function szczegoly(liczba) {
    var tablica2 = JSON.parse(localStorage.getItem('tablica'));
    location.href = "/szczegoly/?id=" + tablica2[liczba].id;
}

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
    var rozmiar = '12';
    var url2 = server + '/api/v1/artifacts?page=' + strona + '&size=' + rozmiar;
    var http = new XMLHttpRequest();
    http.open('GET', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var myArr = this.responseText;
            myArr = JSON.parse(this.responseText);
            localStorage.setItem('tablica', JSON.stringify(myArr.content));
            var iloscKart = myArr.totalElements;
            var iloscStron = myArr.totalPages;
            console.log(myArr);
            if(myArr.empty == true) {
                alert('Niewłaściwy numer strony!');
                window.history.back();
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

    for (i = 0; i < max; i++) {
        var pomocnicza0 = 'nazwa' + i;
        var pomocnicza1 = 'ulica' + i;
        var pomocnicza2 = 'numer' + i;
        var pomocnicza3 = 'typ' + i;
        var pomocnicza4 = 'p' + i;
        var pomocnicza5 = 'miasto' + i;

        document.getElementById(pomocnicza0).innerHTML = myArr[i].name;
        document.getElementById(pomocnicza1).innerHTML = myArr[i].street;
        document.getElementById(pomocnicza2).innerHTML = myArr[i].building;
        document.getElementById(pomocnicza3).innerHTML = myArr[i].type;
        document.getElementById(pomocnicza5).innerHTML = myArr[i].city;

        var iloscZdj = myArr[i].recentPhotos.length;
        if (iloscZdj != 0) {
            var zdj = myArr[i].recentPhotos[iloscZdj - 1].imageName;
            document.getElementById(pomocnicza4).src = server + '/assets/' + zdj;
        } else if (myArr[i].archivalPhoto != null) {
            var zdj = myArr[i].archivalPhoto.imageName;
            document.getElementById(pomocnicza4).src = server + '/assets/' + zdj;
        } else document.getElementById(pomocnicza4).src = "/zdjecia/brak.png";

        link = document.getElementById('k' + i);
        link.style.display = 'inherit';
    }

    if (max < 12) {
        for (max; i < 12; i++) {
            if (iloscKartNaStronie < 12) {
                for (var b = iloscKartNaStronie; b < 12; b++) {
                    link = document.getElementById('k' + b);
                    link.style.display = 'none';
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

    if(zapisHistorii == false || zapisHistorii == 2) {
        var str = '/ostatnie/?page=' + strona;
        document.getElementById("nrStrony").textContent = "Obecna strona: " + strona;
        window.history.pushState(null, '', str);
    }
    document.getElementById("recznie").textContent = "Wpisz numer strony (od 1 do " + iloscStron + "):";
    $("#recznie2").attr({
        "max" : iloscStron,
        "min" : 1
    });
    
    if(iloscStron<2)
        document.getElementById("jednaStrona").style.display = 'none';
     
    //pokazuje po wypelnieniu
    document.getElementById("ukryj").style.visibility = "visible";

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
