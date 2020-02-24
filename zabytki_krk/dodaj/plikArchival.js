function checkextensionArch() {
    var file = document.querySelector("#archivalPhoto");
    if (/\.(jpe?g|png|gif)$/i.test(file.files[0].name) === false) {
        alert("To nie jest zdjęcie lub niewłaściwy format!");
        return false;
    } else return true;
}

$('.yy').on('change', function() {
    if (checkextensionArch() == true) {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    } else {
        $(this).next('.custom-file-label').addClass("selected").html('Wybierz plik...');
        document.getElementById("archivalPhoto").value = null;
    }
});