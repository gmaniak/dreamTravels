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

    var room1 = parseInt(document.getElementsByName("no_rooms1")[0].value);
    var room2 = parseInt(document.getElementsByName("no_rooms2")[0].value);
    var room3 = parseInt(document.getElementsByName("no_rooms3")[0].value);
    var room4 = parseInt(document.getElementsByName("no_rooms4")[0].value);

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
