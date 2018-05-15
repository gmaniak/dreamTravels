
var prices = [];

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

	var div;
	var cardBody
	var hotel;
	var location_id;
	var location;
    var room;
    var price;
	var next_params = {};

	for(i = 0; i < hotel_ids.length; i++) {
        
        /*Get Data*/
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
        });

        get_room(room_ids[i]).done(function (data) {
            if(!('message' in data) ) {
                room = data; 
            }
            else {
              console.log(data.message);
            }
        });

        price = room["price"] * parseInt((date_out - date_in) / (24 * 3600 * 1000));
        prices.push(price);

        /*Create Card Element*/
        div = document.createElement("div");
        div.classList.add("card");
        div.classList.add("hotel-card");
        div.onclick = reserve(hotel_ids[i]);

        /*Create Img for card*/
        var img = document.createElement('img');
        img.src = './img/' + hotel.name.replace(/ /g, '_') + ".jpg";
        img.alt = hotel.name.replace(/ /g, '_') + ".jpg";
        img.classList.add("card-img-top");
        img.classList.add("img-fluid");
        div.appendChild(img);

        /*Create div for inner content*/
        cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.classList.add("custom-container");
        
      	
        next_params["town"] = location["town"];
        next_params["county"] = location["county"];
        next_params["country"] = location["country"];
        next_params["street"] = location["street"];
        next_params["no"] = location["no"];
        next_params["phone"] = hotel["phone"];
        next_params["email"] = hotel["email"];


        /*Create Hotel Name*/
        var hotelName;
        hotelName = document.createElement("h3");
        hotelName.classList.add("card-title");
        hotelName.innerHTML = hotel.name;
        cardBody.appendChild(hotelName);

        var totalPrice;
        totalPrice = document.createElement("p");
        totalPrice.classList.add("card-text");
        totalPrice.innerHTML = "Total price: " + price + " lei (" + 
                                room["price"] + " lei per night)";
        cardBody.appendChild(totalPrice);

        /*Create discover BTN*/
        var discoverContainer = document.createElement("div");

        var discoverButton;
        discoverButton = document.createElement("a");
        discoverButton.innerHTML = "Discover Hotel";
        discoverButton.classList.add("btn-danger");
        discoverButton.classList.add("btn");
        discoverButton.classList.add("custom-btn");
        discoverButton.href = './hotel_pages/' + hotel.name.replace(/ /g, '_') + 
        						".html?" + encodeURIComponent(JSON.stringify(next_params));
        
        discoverContainer.appendChild(discoverButton);
        cardBody.appendChild(discoverContainer);

        div.appendChild(cardBody);
        /*Append card to container*/
        $("#hotel-container").append(div);
    }

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

    function get_room(id) {
     return $.ajax({
        type: "POST",
        url: './api/room/read_one.php?id=' + id,
        dataType: 'json',
        async: false
            });
     }

	 function reserve(hotel_id) {
	 	return function() {
	 		link_params = "?" + params[0] + "&" + params[1];

	 		for (i = 2; i < params.length; i += 2) {
				if (parseInt(params[i].split("=")[1]) == hotel_id) {
					link_params = link_params + "&" + params[i] + "&" + params[i + 1] + 
                            "&price=" + prices[(i - 2) / 2];
					break;
				}
			}
			window.location.href = "./finish_reservation.html" + link_params;
	 	}
	 }
}

$(document).ready(load_page);
