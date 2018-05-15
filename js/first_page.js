function set_preferences() {
  	var location = document.getElementById('location').value;
  	var loc_arr = [];
  	var hot_arr = [];
  	var room_arr = [];
  	var no_pers = 0;
  	var date_in = new Date(document.getElementById('in').value);
	var date_out = new Date(document.getElementById('out').value);
  	var params = "?";
  	var radios = document.getElementsByName('no');
	        
    for (j in radios)
	 if (radios[j].checked) {
	  no_pers = radios[j].value;
	  break;
	 }

	params = params + "in=" + date_in.getFullYear() + "-" + (date_in.getMonth() + 1) +
			"-" + date_in.getDate() + "&";
	params = params + "out=" + date_out.getFullYear() + "-" + (date_out.getMonth() + 1) +
			"-" + date_out.getDate() + "&";
	var ok = 1;
  	get_loc_ids(location).done(function (data) {
      if(!('message' in data) ) {
          for (i in data.records)
          	loc_arr.push(data.records[i].id);
      }
      else {
          document.getElementById("demo3").innerHTML = "Sorry, we can provide no accomodation in this location."
		  ok = 0;
      }
	});

    for (i in loc_arr) {
 	 get_hotel_ids(loc_arr[i]).done(function (data) {
      if(!('message' in data) ) {
        for (j in data.records)
        	hot_arr.push(data.records[j].id);
        }
        else {
          console.log(data.message);
        }
      });
	}
	for (j in hot_arr) {
	  get_room_ids(hot_arr[j]).done(function (data) {
	      if(!('message' in data) ) {
	        for (k in data.records)
	          if (parseInt(data.records[k].type) == no_pers)
	        	room_arr.push(data.records[k].id);
	        }
	        else {
	          console.log(data.message);
	        }

	     for (k in room_arr) {
	      var ok = 1;
	      get_reserv_ids(room_arr[k]).done(function (data) {
	       if(!('message' in data) ) {
	        for (l in data.records) {
	        	var start = new Date(data.records[l].start_date);
	        	var end = new Date(data.records[l].end_date);

	        	if (start < date_in && end > date_in)
	        		ok = 0;

	        	if (start < date_out && end > date_out)
	        		ok = 0;

	        	if (start > date_in && end < date_out)
	        		ok = 0;

	        	if (ok == 1) {
	        		params = params + "hotel=" + hot_arr[j] + "&room=" + room_arr[k] + "&";
	        		break;
	        	}
	          }
	        }
	       
	        else {
	       	   params = params + "hotel=" + hot_arr[j] + "&room=" + room_arr[k] + "&";
	        }
	      });
	      if (ok == 1)
	      	break;
	    }
     });
	 room_arr = [];
    }
	     
	if (ok == 1) {
		params = params.slice(0, params.length - 1);
		window.location.href = "./choose_hotel.html" + params;
	}
  }

  function get_loc_ids(location) {
  	 return $.ajax({
	    type: "POST",
	    url: './api/location/search.php?s=' + location,
	    dataType: 'json',
	    async: false
			});
	 }

  function get_hotel_ids(loc_id) {
  	 return $.ajax({
	    type: "POST",
	    url: './api/hotel/search.php?s=' + loc_id,
	    dataType: 'json',
	    async: false
			});
	 }  

  function get_room_ids(hot_id) {
  	 return $.ajax({
	    type: "POST",
	    url: './api/room/search.php?s=' + hot_id,
	    dataType: 'json',
	    async: false
			});
	 }

  function get_reserv_ids(room_id) {
  	 return $.ajax({
	    type: "POST",
	    url: './api/reservation/search.php?s=' + room_id,
	    dataType: 'json',
	    async: false
			});
	 }
