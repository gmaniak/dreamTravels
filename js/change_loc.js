function print() {
    var params = decodeURIComponent(window.location.search).substring(1).split(",");

    var town = params[1].split(":")[1];
    document.getElementsByName("town")[0].value = town.substring(1, town.length - 1);

    var county = params[2].split(":")[1];
    document.getElementsByName("county")[0].value = county.substring(1, county.length - 1);

    var country = params[3].split(":")[1];
    document.getElementsByName("country")[0].value = country.substring(1, country.length - 1);

    var street = params[4].split(":")[1];
    document.getElementsByName("street")[0].value = street.substring(1, street.length - 1);

    var no = params[5].split(":")[1];
    document.getElementsByName("no")[0].value = no.substring(1, no.length - 2);
}

function submit_it() {
    var params = {};
    var par = decodeURIComponent(window.location.search).substring(1).split(",");
    var id = par[0].split(":")[1];

    params["id"] = id.substring(1, id.length - 1);
    params["town"] = document.getElementsByName("town")[0].value;
    params["county"] = document.getElementsByName("county")[0].value;
    params["country"] = document.getElementsByName("country")[0].value;
    params["street"] = document.getElementsByName("street")[0].value;
    params["no"] = document.getElementsByName("no")[0].value;

    change_it(params).done(function (data) {
        if (data.message == "location was updated." ) {
            alert("Update done!");
            history.go(-2);
        }
        else 
            document.getElementById("demo").innerHTML = data.message;
    });
}

function change_it(params) {
    return $.ajax({
        type: "POST",
        contentType: "application/json",
        url: './api/location/update.php',
        dataType: 'json',
        data: JSON.stringify(params),
        async: false
    });
}

function add_it() {
    var params = {};

    params["town"] = document.getElementsByName("town")[0].value;
    params["county"] = document.getElementsByName("county")[0].value;
    params["country"] = document.getElementsByName("country")[0].value;
    params["street"] = document.getElementsByName("street")[0].value;
    params["no"] = document.getElementsByName("no")[0].value;

    add_loc(params).done(function (data) {
        if (data.message == "location was created." ) {
            alert("Add done!");
            history.go(-2);
        }
        else 
            document.getElementById("demo").innerHTML = data.message;
    });
}

function add_loc(params) {
    return $.ajax({
        type: "POST",
        contentType: "application/json",
        url: './api/location/create.php',
        dataType: 'json',
        data: JSON.stringify(params),
        async: false
    });
}