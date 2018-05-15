
function load_page() {
	var params = window.location.search.substring(1).split("&");
	var hotel_ids = [];
	var room_ids = [];
	var date_in;
	var date_out;

	date_in = new Date(params[0].split("=")[1]);
	date_out = new Date(params[1].split("=")[1]);

	for (i = 2; i < params.length; i++) {
		if (i % 2 == 0)
			hotel_ids.push(params[i].split("=")[1]);
		else
			room_ids.push(params[i].split("=")[1]);
	}

	var tbl = document.createElement('table');
	var body = document.body;
	var hotel;
	var location_id;
	var location;
	var next_params = {};

	for(i = 0; i < hotel_ids.length; i++) {
        var tr = tbl.insertRow();
        var td = tr.insertCell();
        td.onclick = reserve(hotel_ids[i]);
        
        get_hotel(hotel_ids[i]).done(function (data) {
        	if(!('message' in data) ) {
        		location_id = data["location_id"];
	        	hotel = data; 
	        }
	        else {
	          console.log(data.message);
	        }
        });

        get_location(location_id).done(function (data) {
        	if(!('message' in data) ) {
	        	location = data; 
	        }
	        else {
	          console.log(data.message);
	        }
        })

        td.appendChild(document.createTextNode(hotel.name));

        var img = document.createElement('img');
        img.src = './img/' + hotel.name.replace(/ /g, '_') + ".jpg";
        img.height = 150;
        img.width = 200;
        img.alt = hotel.name.replace(/ /g, '_') + ".jpg";
        td.appendChild(img);

        next_params["town"] = location["town"];
        next_params["county"] = location["county"];
        next_params["country"] = location["country"];
        next_params["street"] = location["street"];
        next_params["no"] = location["no"];
        next_params["phone"] = hotel["phone"];
        next_params["email"] = hotel["email"];

        var td = tr.insertCell();
        var a = document.createElement('a');
        a.appendChild(document.createTextNode('Discover the hotel!'));
        a.title = 'Discover the hotel!';
        a.href = './hotel_pages/' + hotel.name.replace(/ /g, '_') + 
        						".html?" + encodeURIComponent(JSON.stringify(next_params));
        a.target = '_blank';

        td.appendChild(a);
    }
    body.appendChild(tbl);

    function get_hotel(id) {
  	 return $.ajax({
	    type: "POST",
	    url: './api/hotel/read_one.php?id=' + id,
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

	 function reserve(hotel_id) {
	 	return function() {
	 		link_params = "?" + params[0] + "&" + params[1];

	 		for (i = 2; i < params.length; i += 2) {
				if (parseInt(params[i].split("=")[1]) == hotel_id) {
					link_params = link_params + "&" + params[i] + "&" + params[i + 1];
					break;
				}
			}
			window.location.href = "./finish_reservation.html" + link_params;
	 	}
	 }
}