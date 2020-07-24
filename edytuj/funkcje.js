$('#add-form').submit(function() {
    document.getElementById("przyciski").style.display = "none";
    document.getElementById("czekaj").style.display = "initial";
    if (confirm('Jesteś pewien, że chcesz przesłać poprawkę?') == false) {
        document.getElementById("przyciski").style.display = "initial";
        document.getElementById("czekaj").style.display = "none";
        return false;
    }
    edycja();
    return false;
});

czyZalogowany();

function edycja() {
    var obj = $('#add-form').serializeJSON();
    var id = localStorage.getItem("id");
    var url2 = server + '/api/v1/artifacts/by_id/' + id;
    $.ajax({
        url: url2,
        dataType: 'json',
        type: "PUT",
        headers: {
            'content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function(response) {
            alert('Pomyślnie edytowano zabytek. Edytowane wartości pojawią się po akceptacji przez administratora.');
            window.history.back();
        },
        error: function(error) {
            document.getElementById("przyciski").style.display = "initial";
            document.getElementById("czekaj").style.display = "none";
            alert('Wystąpił błąd w edycji!');
        }
    });
}

pobierz();

function pobierz() {
    var id = localStorage.getItem("id");
    var url2 = server + '/api/v1/artifacts/by_id/' + id;
    $.ajax({
        url: url2,
        type: "GET",
        success: function(response) {
            wypisz(response);
        },
        error: function(error) {
            alert('Błąd połączenia!');            
        }
    });
}

function wypisz(myArr) {
    document.getElementById('street').value = myArr.street;
    document.getElementById('latitude').value = myArr.latitude;
    document.getElementById('longitude').value = myArr.longitude;
    document.getElementById('building').value = myArr.building;
    document.getElementById('name').value = myArr.name;
    document.getElementById('type').value = myArr.type;
    document.getElementById('description').value = myArr.description[0].description;
    document.getElementById('city').value = myArr.city;
}