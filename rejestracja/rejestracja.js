czyNiezalogowany();
$('#add-form').submit(function () {
    klik();
    return false;
});

function klik() {

    var poczta = document.getElementById("poczta").value; 
    var login = document.getElementById("login").value;
    var haslo = document.getElementById("haslo").value;
    var haslo2 = document.getElementById("haslo2").value;
    if(haslo!=haslo2) {
        alert("Nowe hasło i jego potwierdzenie są różne, wpisz je ponownie.");
        return;
    }
    var url2 = server + '/api/v1/user/register?email=' + poczta + '&password=' + haslo + '&name=' + login;
    console.log(url2);
    $.ajax({
        url: url2,
        type: "POST",
        success: function (response) {
            alert('Zarejestrowano! Teraz możesz się zalogować.');
            window.location.replace("/logowanie/");
        },
        error: function (error) {
            var err = error.responseText;
            if(err == 'mail')
                alert('Taki e-mail jest już zarejestrowany. Podaj inny.');
            else if(err == 'name')
                alert('Taki login jest już zarejestrowany. Podaj inny.');
            else alert('Taki login lub email jest już zarejestrowany. Podaj inny.');
        }
    });
}