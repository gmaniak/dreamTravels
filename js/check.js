function check_reserv() {
  	var hotel = document.getElementById('hotel2').value;
  	var date_in = document.getElementById('in2').value;
	var date_out = document.getElementById('out2').value;
	var today = new Date();
	if(document.getElementById('in2').value == ""){
		 document.getElementById("demo2").innerHTML = "Please select a date for Check In";
		 return;
	}
	if(document.getElementById('out2').value == ""){
		 document.getElementById("demo2").innerHTML = "Please select a date for Check Out";
		 return;
	}
	if(date_in <= today){
  		document.getElementById("demo2").innerHTML = "Please select a valid date for Check In";
  		return;
	}
	if(date_in > date_out){
  		document.getElementById("demo2").innerHTML = "Check In date higher than Check Out date";
  		return;
	}
	if(document.getElementById('hotel2').value == ""){
		 document.getElementById("demo2").innerHTML = "Please type a hotel name";
		 return;
	}
	if (/^[a-zA-Z]+$/.test(hotel) == false){
		document.getElementById("demo2").innerHTML = "Please give a valid hotel name";
		return;
	}
	hotel = hotel.charAt(0).toUpperCase() + hotel.slice(1).toLowerCase();

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
