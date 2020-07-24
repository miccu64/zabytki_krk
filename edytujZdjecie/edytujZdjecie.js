$('#add-form').submit(function () {
    document.getElementById("przyciski").style.display = "none";
    document.getElementById("czekaj").style.display = "initial";
    if (confirm('Jesteś pewien, że chcesz przesłać zdjęcie?') == false) {
        document.getElementById("przyciski").style.display = "initial";
        document.getElementById("czekaj").style.display = "none";
        return false;
    }
    edycja();
    return false;
});

//do wyswietlania obrazow
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

czyZalogowany();

function edycja() {
    var id = localStorage.getItem("id");
    let czyIstnieje = document.getElementById('recentPhotos').files.length;
    var czyArchiwalne = document.getElementById("archiwalne").checked;
    if (czyIstnieje > 0) {
        let formData = new FormData();
        formData.append('file', document.getElementById('recentPhotos').files[0]);
        var id = localStorage.getItem('id');
        $.ajax({
            type: 'POST',
            url: server + '/api/v1/artifacts/by_id/' + id + '/photo' + '?archival=' + czyArchiwalne,
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            success: function (data) {
                alert('Pomyślnie dodano zdjęcie. Pojawi się, gdy administrator je zaakceptuje.');
                window.history.back();
            },
            error: function (data) {
                alert('Błąd - nie dodano zdjęcia archiwalnego.');
            }
        });
    }
}

pobierz();

function pobierz() {
    var id = localStorage.getItem("id");
    var url2 = server + '/api/v1/artifacts/by_id/' + id;
    $.ajax({
        url: url2,
        type: "GET",
        success: function (response) {
            wypisz(response);
        },
        error: function (error) {
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
    document.getElementById('city').value = myArr.city;

    //ukrywanie zdjec
    var doZdj = server + '/assets/';
    var zdjArch = myArr.archivalPhoto;
    if (zdjArch == null) {
        document.getElementById('archNapis').style.display = 'none';
        document.getElementById('poleArch').style.display = 'none';
    } else {
        zdjArch = myArr.archivalPhoto.imageName;
        zdjArch = doZdj + zdjArch;
        document.getElementById('arch11').src = zdjArch;
        document.getElementById('arch1').href = zdjArch;
    }
    var zdj0 = myArr.recentPhotos[0];
    var zdj1 = myArr.recentPhotos[1];
    var zdj2 = myArr.recentPhotos[2];

    if (zdj0 == undefined) {
        document.getElementById('recent00').style.display = 'none';
        document.getElementById('recent0').style.display = 'none';
        document.getElementById('poleRec00').style.display = 'none';
    } else {
        zdj0 = myArr.recentPhotos[0].imageName;
        zdj0 = doZdj + zdj0;
        document.getElementById('recent00').src = zdj0;
        document.getElementById('recent0').href = zdj0;
    }

    if (zdj1 == undefined) {
        document.getElementById('recent1').style.display = 'none';
        document.getElementById('recent11').style.display = 'none';
        document.getElementById('poleRec11').style.display = 'none';
    } else {
        zdj1 = myArr.recentPhotos[1].imageName;
        zdj1 = doZdj + zdj1;
        document.getElementById('recent11').src = zdj1;
        document.getElementById('recent1').href = zdj1;
    }

    if (zdj2 == undefined) {
        document.getElementById('recent2').style.display = 'none';
        document.getElementById('recent22').style.display = 'none';
        document.getElementById('poleRec22').style.display = 'none';
    } else {
        zdj2 = myArr.recentPhotos[2].imageName;
        zdj2 = doZdj + zdj2;
        document.getElementById('recent22').src = zdj2;
        document.getElementById('recent2').href = zdj2;
    }

    if ((zdj0 == undefined) & (zdj1 == undefined) & (zdj2 == undefined)) {
        document.getElementById('recentNapis').style.display = 'none';
        document.getElementById('wszystkieRecent').style.display = 'none';
        if (myArr.archivalPhoto == null) {
            document.getElementById('opis').style.display = 'none';
        }
    }
}