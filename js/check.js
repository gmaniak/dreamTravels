function check_reserv() {
  	var hotel = document.getElementById('hotel2').value;
  	var date_in = document.getElementById('in2').value;
	var date_out = document.getElementById('out2').value;

  	var params = "hotel=" + hotel + "&date_in=" + date_in + 
  		"&date_out=" + date_out;

	get_hotel_id(hotel).done(function (data) {
	      if(!('message' in data) ) {
	        	window.location.href = "./reservations.html?" + encodeURIComponent(params);
	        }
	        else {
	          document.getElementById("demo2").innerHTML = "Hotel is not in our database."
	        }
	 });

	
}

function get_hotel_id(hotel) {
  	 return $.ajax({
	    type: "POST",
	    url: './api/hotel/search.php?s=' + hotel,
	    dataType: 'json',
	    async: false
			});
	 } 
