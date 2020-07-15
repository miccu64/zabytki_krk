$('#add-form').submit(function() {
    document.getElementById("przyciski").style.display = "none";
    document.getElementById("czekaj").style.display = "initial";
    dodaj();
    return false;
});

czyZalogowany();

function wstecz() {
    window.history.back();
}

function dodaj() {
    var obj = $('#add-form').serializeJSON();
    var url2 = server + '/api/v1/artifacts/';
    $.ajax({
        url: url2,
        dataType: 'json',
        type: "POST",
        headers: {
            'content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function(response) {
            localStorage.setItem('idDodane', response.id);

            let czyIstnieje = document.getElementById('archivalPhoto').files.length;
            if (czyIstnieje > 0) {
                let formData = new FormData();
                formData.append('file', document.getElementById('archivalPhoto').files[0]);
                var id = localStorage.getItem('idDodane');
                $.ajax({
                    type: 'POST',
                    url: server + '/api/v1/artifacts/by_id/' + id + '/photo' + '?archival=true',
                    data: formData,
                    contentType: false,
                    processData: false,
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    success: function(data) {},
                    error: function(data) {
                        alert('Błąd - nie dodano zdjęcia archiwalnego.');
                    }
                });
            }

            let czyIstnieje2 = document.getElementById('recentPhotos').files.length;
            if (czyIstnieje2 > 0) {
                let formData2 = new FormData();
                formData2.append('file', document.getElementById('recentPhotos').files[0]);
                var id = localStorage.getItem('idDodane');
                $.ajax({
                    type: 'POST',
                    url: server + '/api/v1/artifacts/by_id/' + id + '/photo' + '?archival=false',
                    data: formData2,
                    contentType: false,
                    processData: false,
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    },
                    success: function(data) {},
                    error: function(data) {
                        alert('Błąd - nie dodano zdjęcia.');
                    }
                });
            }

            var id = localStorage.getItem('idDodane');
            localStorage.removeItem('idDodane');
            alert('Pomyślnie dodano zabytek.');
            window.location.replace("/szczegoly/?id=" + id);
        },
        error: function(error) {
            document.getElementById("przyciski").style.display = "initial";
            document.getElementById("czekaj").style.display = "none";
            alert('Wystąpił błąd!');
        },
    });
}