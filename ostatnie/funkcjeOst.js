wyslij(0);

function wyslij(strona) {
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
            wypisz(myArr.content, strona + 1, iloscKart, iloscStron);

        } else if (http.readyState == 4) {
            alert('Błąd!');
        }
    }
    http.send();
}

//ukrywanie zbednych kart i przyciskow w zaleznosci od liczby elementow
function wypisz(myArr, strona, iloscKart, iloscStron) {
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

        document.getElementById(pomocnicza0).innerHTML = myArr[i].name;
        document.getElementById(pomocnicza1).innerHTML = myArr[i].street;
        document.getElementById(pomocnicza2).innerHTML = myArr[i].building;
        document.getElementById(pomocnicza3).innerHTML = myArr[i].type;

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

    for (var d = iloscStron; d < 20; d++) {
        link = document.getElementById('b' + d);
        link.style.display = 'none';
    }

    //pokazuje po wypelnieniu
    document.getElementById("ukryj").style.visibility = "visible";
}