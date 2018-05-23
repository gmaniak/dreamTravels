function print() {
    var tbl = document.createElement('table');
    var body = document.getElementById("table_body");
    var loc;

	get_locations().done(function (data) {
      if(!('message' in data) ) {
        for (j in data.records) {
            loc = data.records[j];
            var tr = document.createElement("tr");
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(loc["id"]));

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(loc["town"]));

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(loc["county"]));

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(loc["country"]));

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(loc["street"]));

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(loc["no"]));

            var td = tr.insertCell();
            var button = document.createElement('button');
            button.appendChild(document.createTextNode('Delete'));
            button.onclick = delete_loc(j, loc["id"]);
            button.classList.add("btn");
            button.classList.add("btn-primary");
            td.appendChild(button);

            var button = document.createElement('button');
            button.appendChild(document.createTextNode('Change'));
            button.onclick = change_loc(loc);
            button.classList.add("btn");
            button.classList.add("btn-primary");
            td.appendChild(button);

            body.appendChild(tr);
        }
        
      }
      else {
          console.log(data.message);
      }
    });
}

function delete_loc(row, id) {
	return function() {
			del_loc(id).done(function (data) {
				if (!(data.message == 'Unable to delete object.')) {
	                document.getElementById("my_table").deleteRow(row);
	                window.location.reload();
	            }
	            else {
	            	document.getElementById("demo").innerHTML = "You need to remove the \
                         hotel at this address first!";
	            }
		    });
		}
}

function change_loc(data) {
	return function() {
		window.location.href = "./change_location.html?" + encodeURIComponent(JSON.stringify(data));
	}
}

function add_loc() {
	window.location.href = "./add_location.html";
}

function del_loc(id) {
  	 return $.ajax({
	    type: "POST",
	    contentType: "application/json",
	    url: './api/location/delete.php',
	    dataType: 'json',
	    data: JSON.stringify({"id": id}),
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