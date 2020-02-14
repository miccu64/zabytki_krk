var lat = document.getElementById("wspx").value;
var lng = document.getElementById("wspy").value;

var mymap = L.map('mapid').setView([lat, lng], 18);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var marker = L.marker([lat, lng]).addTo(mymap);
marker.bindPopup(document.getElementById("nazwa").value).openPopup();