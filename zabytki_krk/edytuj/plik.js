function checkextension() {
    var file = document.querySelector("#recentPhotos");
    if (/\.(jpe?g|png|gif)$/i.test(file.files[0].name) === false) {
        alert("To nie jest zdjęcie lub niewłaściwy format!");
    }
}

$('.custom-file-input').on('change', function() {
    let fileName = $(this).val().split('\\').pop();
    $(this).next('.custom-file-label').addClass("selected").html(fileName);
});