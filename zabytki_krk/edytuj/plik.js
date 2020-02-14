function checkextension() {
    var file = document.querySelector("#plik");
    if (/\.(jpe?g|png|gif)$/i.test(file.files[0].name) === false) {
        alert("To nie jest zdjęcie lub niewłaściwy format!");
    }
}