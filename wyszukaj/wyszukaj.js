document.addEventListener("DOMContentLoaded", function() {
    document.
    getElementById('but')
        .addEventListener('click', e => {
            e.preventDefault();
            var name = document.getElementById("name").value;
            var street = document.getElementById("street").value;
            var type = document.getElementById("type").value;
            var building = document.getElementById("building").value;
            var city = document.getElementById("city").value;
            if ((name=="") && (street=="") && (type=="") && (building=="") && (city=="")) {
                alert("Proszę wypełnić przynajniej jedno kryterium.");
            } else location.href = "znalezione/?name=" + name + "&city=" + city + "&type=" + type + "&street=" + street + "&building=" + building;
        });
});