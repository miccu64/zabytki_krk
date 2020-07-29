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

function akceptuj (el, add) {
    var tablica2 = JSON.parse(localStorage.getItem('tablica'));
    var url2 = server + '/api/v1/admin/acceptArtifact';
    var token = localStorage.getItem('token');
    var http = new XMLHttpRequest();
    http.open('POST', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Authorization', token);
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.response);
        } else if (http.readyState == 4) {
            alert(http.response);
        }
    }
    http.send('id=' + tablica2[el].id + '&accept=' + add);
}

function afterClick(i) {
    event.preventDefault();
            var wart2 = 'pokaZdj' + i;
            var widoczne = document.getElementById(wart2).style.display;
            if (widoczne == 'none')
                document.getElementById(wart2).style.display = 'initial';
            else document.getElementById(wart2).style.display = 'none';
}

for(var i=0; i<1; i++) {
    
        var wart = 'zdj' + i;
        document.getElementById(wart).addEventListener("click", afterClick.bind(this, i), false);
    
}


$(window).on('popstate', function (e) {
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
    var rozmiar = '12';
    var url2 = server + '/api/v1/admin/newArtifactsRequests?page=' + strona + '&size=' + rozmiar;
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

    for (i = 0; i < 1; i++) {
        var pomocnicza00 = 'nazwa' + i;
        var pomocnicza0 = 'wypisz' + i;
        var pomocnicza1 = 'opis' + i;
        var nazwa = "Nazwa: " + myArr[i].name + ", ID zabytku: " + myArr[i].id;
        var wypisz = "Typ: " + myArr[i].type + ", Miejscowość: " + myArr[i].city;
        wypisz += ", Ulica: " + myArr[i].street + ", Numer budynku: " + myArr[i].building;
        var opis = "Opis: " + myArr[i].description[0].description;
        document.getElementById(pomocnicza0).innerHTML = wypisz;
        document.getElementById(pomocnicza1).innerHTML = opis;
        document.getElementById(pomocnicza00).innerHTML = nazwa;
        var dodal = "Dodał: " + myArr[i].createdBy.name + ", data dodania: " + myArr[i].createdAt;
        var pomocnicza2 = 'utworzyl' + i;
        document.getElementById(pomocnicza2).innerHTML = dodal;

        //ukrywanie zdjec
        var doZdj = server + '/admin/assets/';
        var zdjArch = myArr[i].archivalPhoto;
        if (zdjArch != null) {
            zdjArch = zdjArch.imageName;
            zdjArch = doZdj + zdjArch;
            var arch = 'arch';
            console.log(zdjArch);
            document.getElementById(arch + i + i).src = zdjArch;
            document.getElementById(arch + i).href = zdjArch;
        }
        var zdj0 = myArr[i].recentPhotos[0];
        var zdj1 = myArr[i].recentPhotos[1];
        var zdj2 = myArr[i].recentPhotos[2];

        if (zdj0 != undefined) {
            zdj0 = zdj0.imageName;
            zdj0 = doZdj + zdj0;
            var rec = 'recent2'
            document.getElementById(rec + i + i).src = zdj0;
            document.getElementById(rec + i).href = zdj0;
        }

        if (zdj1 != undefined) {
            zdj1 = zdj1.imageName;
            zdj1 = doZdj + zdj1;
            var rec = 'recent1'
            document.getElementById(rec + i + i).src = zdj1;
            document.getElementById(rec + i).href = zdj1;
        }

        if (zdj2 != undefined) {
            zdj2 = zdj2.imageName;
            zdj2 = doZdj + zdj2;
            var rec = 'recent0'
            document.getElementById(rec + i + i).src = zdj1;
            document.getElementById(rec + i).href = zdj1;
        }


        
        var lat = myArr[i].latitude;
        var lng = myArr[i].longitude;

        var mymap = L.map('mapid').setView([lat, lng], 18);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        var marker = L.marker([lat, lng]).addTo(mymap);



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