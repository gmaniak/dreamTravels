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

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function format_string(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function format_street(street){
    var words = street.split(" ");
    var formated = "";
    for(var i = 0; i < words.length - 1; i++)
        formated += format_string(words[i]) + " ";
    formated += format_string(words[words.length - 1]);
    return formated; 
}

function validate(town, county, country, street, no){
    if(town == ""){
         document.getElementById("demo").innerHTML = "Please type the town";
         return false;
    }
    if (/^[a-zA-Z]+$/.test(town) == false){
        document.getElementById("demo").innerHTML = "Please give a valid town";
        return false;
    }
    if(county == ""){
         document.getElementById("demo").innerHTML = "Please type the county";
         return false;
    }
    if (/^[a-zA-Z]+$/.test(county) == false){
        document.getElementById("demo").innerHTML = "Please give a valid county";
        return false;
    }
    if(country == ""){
         document.getElementById("demo").innerHTML = "Please type the country";
         return false;
    }
    if (/^[a-zA-Z]+$/.test(country) == false){
        document.getElementById("demo").innerHTML = "Please give a valid country";
        return false;
    }
    if(street == ""){
         document.getElementById("demo").innerHTML = "Please type the street";
         return false;
    }
    if (/^[a-zA-Z\s]*$/.test(street) == false){
        document.getElementById("demo").innerHTML = "Please give a valid street";
        return false;
    }
    if(no== ""){
         document.getElementById("demo").innerHTML = "Please type the number of the street";
         return false;
    }
    if (isNormalInteger(no) == false){
        document.getElementById("demo").innerHTML = "Please give a valid number";
        return false;
    }
    return true;
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

    if(validate(params["town"], params["county"], params["country"], params["street"], params["no"]) == false)
        return;

    params["town"] = format_string(params["town"]);
    params["county"] = format_string(params["county"]);
    params["country"] = format_string(params["country"]);
    params["street"] = format_street(params["street"]);
    
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

    if(validate(params["town"], params["county"], params["country"], params["street"], params["no"]) == false)
        return;

    params["town"] = format_string(params["town"]);
    params["county"] = format_string(params["county"]);
    params["country"] = format_string(params["country"]);
    params["street"] = format_street(params["street"]);

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
