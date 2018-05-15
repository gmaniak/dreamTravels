function print() {
	var tbl = document.createElement('table');
	tbl.id = "my_table";
	var body = document.body;
	var hotel;
	var location;

	get_hotels().done(function (data) {
      if(!('message' in data) ) {
        for (i in data.records) {
        	hotel = data.records[i];

	        var tr = tbl.insertRow();
	        var td = tr.insertCell();
	        td.appendChild(document.createTextNode("Hotel ID: " + hotel["id"]));

	        var td = tr.insertCell();
	        td.appendChild(document.createTextNode("Name: " + hotel["name"]));

	        get_location(hotel["location_id"]).done(function (data) {
	        	if(!('message' in data) ) {
		        	location = data["town"] + ", " + data["country"]; 
		        }
		        else {
		          console.log(data.message);
		        }
	        }); 

	        var td = tr.insertCell();
	        td.appendChild(document.createTextNode("Location: " + location));

	        var td = tr.insertCell();
	        td.appendChild(document.createTextNode("Email: " + hotel["email"]));

	        var td = tr.insertCell();
	        td.appendChild(document.createTextNode("Phone: " + hotel["phone"]));

	        var td = tr.insertCell();
	        td.appendChild(document.createTextNode("No. rooms: " + hotel["no_rooms"]));

	        var td = tr.insertCell();
	        var button = document.createElement('button');
	        button.appendChild(document.createTextNode('Delete'));
	        button.onclick = delete_hotel(i, hotel["id"]);
	        td.appendChild(button);

	        var td = tr.insertCell();
	        var button = document.createElement('button');
	        button.appendChild(document.createTextNode('Change'));
	        button.onclick = change_hotel(JSON.stringify(hotel));
	        td.appendChild(button);
	    }
	  }
	    else {
	      	console.log(data.message);
	    }
	 });

    body.appendChild(tbl);
}

function delete_hotel(row, id) {
	return function() {
			del_room(id).done(function (data) {
				if (!(data.message == 'Unable to delete object.')) {
	                document.getElementById("my_table").deleteRow(row);
	                window.location.reload();
	            }
	            else {
	            	document.getElementById("demo").innerHTML = "You need to delete all the \
	            		reservations for this hotel first.";
	            }
	        });

			del_hotel(id).done(function (data) {
				if (!(data.message == 'Unable to delete object.')) {
	                document.getElementById("my_table").deleteRow(row);
	                window.location.reload();
	            }
	            else {
	            	document.getElementById("demo").innerHTML = "You need to delete all the \
	            		reservations for this hotel first.";
	            }
		    });
		}
}


function change_hotel(data) {
	return function() {
		window.location.href = "./change_hotel.html?" + encodeURIComponent(data);
	}
}

function add_hotel() {
	window.location.href = "./add_hotel.html";
}

function del_hotel(id) {
  	 return $.ajax({
	    type: "POST",
	    contentType: "application/json",
	    url: './api/hotel/delete.php',
	    dataType: 'json',
	    data: JSON.stringify({"id": id}),
	    async: false
			});
	 }

function del_room(hotel_id) {
  	 return $.ajax({
	    type: "POST",
	    contentType: "application/json",
	    url: './api/room/delete.php',
	    dataType: 'json',
	    data: JSON.stringify({"hotel_id": hotel_id}),
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


function get_hotels() {
	 return $.ajax({
    type: "POST",
    url: './api/hotel/read.php',
    dataType: 'json',
    async: false
		});
 }