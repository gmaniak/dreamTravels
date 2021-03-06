function print_res() {
	var params = decodeURIComponent(window.location.search).substring(1).split("&");

  	var hotel = params[0].split("=")[1];
  	var date_in = new Date(params[1].split("=")[1]);
	var date_out = new Date(params[2].split("=")[1]);
  	var room_arr = [];
  	var no_pers;
	var hotel_id;
	var price;
	var i = 0;

	var body = document.getElementById("table_body");

  	get_hotel_id(hotel).done(function (data) {
	      if(!('message' in data) ) {
	        	hotel_id = data.records[0].id;
	        }
	        else {
	          console.log(data.message);
	        }
	 });

	 get_room_id(hotel_id).done(function (data) {
	      if(!('message' in data) ) {
	        for (k in data.records)
	        	room_arr.push(data.records[k].id);
	        }
	        else {
	          console.log(data.message);
	        }

	     for (k in room_arr) {
	      get_reserv_ids(room_arr[k]).done(function (data) {
	       if(!('message' in data) ) {
	        for (l in data.records) {
	      		var ok = 1;
	        	var start = new Date(data.records[l].start_date);
	        	var end = new Date(data.records[l].end_date);
				var price = data.records[l].total_price;

	        	if (start >= date_in && start <= date_out)
	        		ok = 0;

	        	if (end <= date_out && end >= date_in)
	        		ok = 0;

	        	if (ok == 0) {
	        		var tr = document.createElement("tr");
			        var td = tr.insertCell();
			        td.appendChild(document.createTextNode(room_arr[k]));        
			        var td = tr.insertCell();
			        td.appendChild(document.createTextNode(data.records[l].customer_name));
			        var td = tr.insertCell();
			        td.appendChild(document.createTextNode(data.records[l].id));
			        var td = tr.insertCell();
			        td.appendChild(document.createTextNode(start));
			        var td = tr.insertCell();
			        td.appendChild(document.createTextNode(end));

			        var td = tr.insertCell();
			        td.appendChild(document.createTextNode(price));

			        var td = tr.insertCell();
			        var button = document.createElement('button');
			        button.appendChild(document.createTextNode('Delete'));
			        button.onclick = delete_res(i, data.records[l].id);
			        button.classList.add("btn");
                	button.classList.add("btn-primary");
			        td.appendChild(button);

			        body.appendChild(tr);

			        i = i + 1;
	        	}
	          }
	        }
	      });
	    }
     });
}

function delete_res(row, id) {
	return function() {
			del_res(id).done(function (data) {
                if (!(data.message == 'Unable to delete object.')) {
                    document.getElementById("my_table").deleteRow(row);
                    window.location.reload();
                }
                else {
                    document.getElementById("demo").innerHTML = data.message;
                }
            });
        }
}

function del_res(id) {
  	 return $.ajax({
	    type: "POST",
	    contentType: "application/json",
	    url: './api/reservation/delete.php',
	    dataType: 'json',
	    data: JSON.stringify({"id": id}),
	    async: false
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

  function get_room_id(hot_id) {
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
