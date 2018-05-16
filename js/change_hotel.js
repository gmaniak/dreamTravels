function print() {
    write();

	var params = decodeURIComponent(window.location.search).substring(1).split(",");

    var name = params[1].split(":")[1];
    document.getElementsByName("name")[0].value = name.substring(1, name.length - 1);

    var loc_id = params[2].split(":")[1];
    loc_id = loc_id.substring(1, loc_id.length - 1);
    var e = document.getElementsByName("location")[0];
    e.options[parseInt(loc_id) - 1].selected = "selected";

    var phone = params[3].split(":")[1];
    document.getElementsByName("phone")[0].value = phone.substring(1, phone.length - 1);

    var email = params[4].split(":")[1];
    document.getElementsByName("email")[0].value = email.substring(1, email.length - 1); 
}

function write() {
    var locations;

     get_locations().done(function (data) {
            if(!('message' in data.records) ) {
                locations = data.records; 
            }
            else {
              console.log(data.message);
            }
        })
    var elem = document.getElementsByName("location")[0];
    var opt;
    for (i in locations) {
        opt = document.createElement("option");
        opt.value = locations[i]["id"];
        opt.text = locations[i]["street"] + 
            " street, no. " + locations[i]["no"] + ", " + 
            locations[i]["town"] + " town, " + locations[i]["county"] + " county, " + 
            locations[i]["country"];
        elem.add(opt);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    var re = /^\d{10}$/;
    return re.test(phone);
}

function isNormalInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

function validate1(name, email, phone){
    if(name == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's name";
         return false;
    }
    if (/^[a-zA-Z]+$/.test(name) == false){
        document.getElementById("demo").innerHTML = "Please give a valid hotel name";
        return false;
    }
    if(email == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's email";
         return false;
    }
    if(validateEmail(email) == false){
         document.getElementById("demo").innerHTML = "Please type a valid email";
         return false;
    }
    if(phone == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's phone number";
         return false;
    }
    if(validatePhone(phone) == false){
         document.getElementById("demo").innerHTML = "Please type a valid phone number";
         return false;
    }
    return true;
}

function validate(name, email, phone, room1, room2, room3, room4, price1, price2, price3, price4){
    if(name == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's name";
         return false;
    }
    if (/^[a-zA-Z]+$/.test(name) == false){
        document.getElementById("demo").innerHTML = "Please give a valid hotel name";
        return false;
    }
    if(email == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's email";
         return false;
    }
    if(validateEmail(email) == false){
         document.getElementById("demo").innerHTML = "Please type a valid email";
         return false;
    }
    if(phone == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's phone number";
         return false;
    }
    if(validatePhone(phone) == false){
         document.getElementById("demo").innerHTML = "Please type a valid phone number";
         return false;
    }
    if(room1 == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's number of rooms for 1 person";
         return false;
    }
    if(isNormalInteger(room1) == false){
         document.getElementById("demo").innerHTML = "Please type a valid number of rooms for 1 person";
         return false;
    }
    if(room2 == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's number of rooms for 2 persons";
         return false;
    }
    if(isNormalInteger(room2) == false){
         document.getElementById("demo").innerHTML = "Please type a valid number of rooms for 2 persons";
         return false;
    }
    if(room3 == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's number of rooms for 3 persons";
         return false;
    }
    if(isNormalInteger(room3) == false){
         document.getElementById("demo").innerHTML = "Please type a valid number of rooms for 3 persons";
         return false;
    }
    if(room4 == ""){
         document.getElementById("demo").innerHTML = "Please type the hotel's number of rooms for 4 persons";
         return false;
    }
    if(isNormalInteger(room4) == false){
         document.getElementById("demo").innerHTML = "Please type a valid number of rooms for 4 persons";
         return false;
    }
    if(price1 == ""){
         document.getElementById("demo").innerHTML = "Please type the price for 1 person room";
         return false;
    }
    if(isNormalInteger(price1) == false){
         document.getElementById("demo").innerHTML = "Please type a valid price for 1 person room";
         return false;
    }
    if(price2 == ""){
         document.getElementById("demo").innerHTML = "Please type the price for 2 persons room";
         return false;
    }
    if(isNormalInteger(price2) == false){
         document.getElementById("demo").innerHTML = "Please type a valid price for 2 persons room";
         return false;
    }
    if(price3 == ""){
         document.getElementById("demo").innerHTML = "Please type the price for 3 persons room";
         return false;
    }
    if(isNormalInteger(price3) == false){
         document.getElementById("demo").innerHTML = "Please type a valid price for 3 persons room";
         return false;
    }
    if(price4 == ""){
         document.getElementById("demo").innerHTML = "Please type the price for 4 persons room";
         return false;
    }
    if(isNormalInteger(price4) == false){
         document.getElementById("demo").innerHTML = "Please type a valid price for 4 persons room";
         return false;
    }
    return true;
}

function submit_it() {
    var params = {};
    var par = decodeURIComponent(window.location.search).substring(1).split(",");
    var id = par[0].split(":")[1];
    var no_rooms = par[5].split(":")[1];

    params["id"] = id.substring(1, id.length - 1);
    params["name"] = document.getElementsByName("name")[0].value;
    var e = document.getElementsByName("location")[0];
    var location = e.options[e.selectedIndex].value;
    
    params["location_id"] = location;
    params["email"] = document.getElementsByName("email")[0].value;
    params["phone"] = document.getElementsByName("phone")[0].value;
    params["no_rooms"] = parseInt(no_rooms.substring(1, no_rooms.length - 2));

    if(validate1(params["name"], params["email"], params["phone"]) == false)
        return;

    params["name"] = params["name"].charAt(0).toUpperCase() + params["name"].slice(1).toLowerCase();

    change_it(params).done(function (data) {
        if (data.message == "hotel was updated." ) {
            alert("Update done!");
            window.location.href = "./admin.html";
        }
        else 
            document.getElementById("demo").innerHTML = data.message;
    });
}

function change_it(params) {
    return $.ajax({
        type: "POST",
        contentType: "application/json",
        url: './api/hotel/update.php',
        dataType: 'json',
        data: JSON.stringify(params),
        async: false
    });
}

function add_it() {
    var params = {};

    params["name"] = document.getElementsByName("name")[0].value;

    var e = document.getElementsByName("location")[0];
    var location = e.options[e.selectedIndex].value;
    
    params["location_id"] = location;
    params["email"] = document.getElementsByName("email")[0].value;
    params["phone"] = document.getElementsByName("phone")[0].value;
    var r1 = document.getElementsByName("no_rooms1")[0].value;
    var r2 = document.getElementsByName("no_rooms2")[0].value;
    var r3 = document.getElementsByName("no_rooms3")[0].value;
    var r4 = document.getElementsByName("no_rooms4")[0].value;
    var p1 = document.getElementsByName("price1")[0].value;
    var p2 = document.getElementsByName("price2")[0].value;
    var p3 = document.getElementsByName("price3")[0].value;
    var p4 = document.getElementsByName("price4")[0].value;

    if(validate(params["name"], params["email"], params["phone"],
        r1, r2, r3, r4, p1, p2, p3, p4) == false)
        return;

    params["name"] = params["name"].charAt(0).toUpperCase() + params["name"].slice(1).toLowerCase();

    var room1 = parseInt(r1);
    var room2 = parseInt(r2);
    var room3 = parseInt(r3);
    var room4 = parseInt(r4);

    params["no_rooms"] = room1 + room2 + room3 + room4;



    add_hotel(params).done(function (data) {
        if (data.message == "hotel was created." ) {

            get_hotel_id(params["name"]).done(function (data2) {
                if (!("message" in data2)) {

                    var room_params = {};
                    for (var i = 0; i < room1; i++) {
                        room_params["hotel_id"] = data2.records[0].id;
                        room_params["type"] = "1";
                        room_params["price"] = document.getElementsByName("price1")[0].value;
                        add_room(room_params).done(function (data3) {console.log(data3)});
                    }


                    for (var i = 0; i < room2; i++) {
                        room_params["hotel_id"] = data2.records[0].id;
                        room_params["type"] = "2";
                        room_params["price"] = document.getElementsByName("price1")[0].value;
                        add_room(room_params).done(function (data3) {console.log(data3)});
                    }


                    for (var i = 0; i < room3; i++) {
                        room_params["hotel_id"] = data2.records[0].id;
                        room_params["type"] = "3";
                        room_params["price"] = document.getElementsByName("price1")[0].value;
                        add_room(room_params).done(function (data3) {console.log(data3)});
                    }

                    for (var i = 0; i < room2; i++) {
                        room_params["hotel_id"] = data2.records[0].id;
                        room_params["type"] = "4";
                        room_params["price"] = document.getElementsByName("price1")[0].value;
                        add_room(room_params).done(function (data3) {console.log(data3)});
                    }
                }
            });
            alert("Add done!");
            window.location.href = "./admin.html";
        }
        else 
            document.getElementById("demo").innerHTML = data.message;
    });
}

function manage_loc() {
    window.location.href = "./locations.html";
}

function add_hotel(params) {
    return $.ajax({
        type: "POST",
        contentType: "application/json",
        url: './api/hotel/create.php',
        dataType: 'json',
        data: JSON.stringify(params),
        async: false
    });
}

function add_room(params) {
    return $.ajax({
        type: "POST",
        contentType: "application/json",
        url: './api/room/create.php',
        dataType: 'json',
        data: JSON.stringify(params),
        async: false
    });
}

function get_locations() {
     return $.ajax({
        type: "POST",
        url: './api/location/read.php',
        dataType: 'json',
        async: false
            });
}

function get_location(id) {
     return $.ajax({
        type: "POST",
        url: './api/location/read_one.php?id=' + id,
        dataType: 'json',
        async: false
            });
}

function get_hotel_id(hotel_name) {
     return $.ajax({
        type: "POST",
        url: './api/hotel/search.php?s=' + hotel_name,
        dataType: 'json',
        async: false
            });
}
