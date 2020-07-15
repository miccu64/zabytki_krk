function wstecz() {
    window.history.back();
}

function edycja() {
    location.href = "/edytuj/";
}
wyslij();

function wyslij() {
    var url2 = server + '/api/v1/artifacts/in_area?lat1=50&lat2=50.15&lon1=19.75&lon2=20.15';
    var http = new XMLHttpRequest();
    http.open('GET', url2, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            var myArr = this.responseText;
            myArr = JSON.parse(this.responseText);
            wypisz(myArr);
        } else if (http.readyState == 4) {
            alert('Błąd!');
        }
    }
    http.send();
}

function przekieruj() {
    var idw = localStorage.getItem("idw");
    window.location.assign("/szczegoly/?id=" + idw);
}

function wypisz(myArr) {
    var mymap = L.map('mapid').setView([50.0614, 19.9365], 14);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    customMarker = L.Marker.extend({
        options: {
            myID: 'Custom data!'
        }
    });

    for (var a = 0; a < (myArr.length); a++) {
        var lat = myArr[a].latitude;
        var lng = myArr[a].longitude;

        var marker = new customMarker([lat, lng], { myID: myArr[a].id }).on('click', onClick).addTo(mymap);

        var help = "<p class='myCss'><b>Nazwa:</b> " + myArr[a].name + "<br><b>Typ: </b>" + myArr[a].type + "<b><br>Ulica:</b> " + myArr[a].street;
        help += '<br><button type="button" onclick=przekieruj();>Szczegóły zabytku</button>';
        marker.bindPopup(help);
    }
}

function onClick(e) {
    localStorage.setItem("idw", this.options.myID);
}