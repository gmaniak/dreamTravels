function print() {
	var tbl = document.createElement('table');
	tbl.id = "my_table";
	var body = document.body;
	var user;


    get_users().done(function (data) {
      if(!('message' in data) ) {
        for (i in data.records) {
                user = data.records[i];

                var tr = tbl.insertRow();
                var td = tr.insertCell();
                td.appendChild(document.createTextNode("User ID: " + user["id"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode("Username: " + user["username"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode("Firstname: " + user["firstname"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode("Lastname: " + user["lastname"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode("Email: " + user["email"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode("Phone: " + user["phone"]));

                var td = tr.insertCell();
                if (parseInt(user["type"]) == 1) {
                    td.appendChild(document.createTextNode("Type: administrator"));
                }
                else {
                    td.appendChild(document.createTextNode("Type: receptionist"));
                }

                var td = tr.insertCell();
                var button = document.createElement('button');
                button.appendChild(document.createTextNode('Delete'));
                button.onclick = delete_user(i, user["id"]);
                td.appendChild(button);

                var td = tr.insertCell();
                var button = document.createElement('button');
                button.appendChild(document.createTextNode('Change'));
                button.onclick = change_user(JSON.stringify(user));
                td.appendChild(button);
            }
         }
        else {
          console.log(data.message);
        }
      });
    body.appendChild(tbl);
}

function delete_user(row, id) {
    return function() {
            del_user(id).done(function (data) {
                if (!(data.message == 'Unable to delete object.')) {
                    document.getElementById("my_table").deleteRow(row);
                    window.location.reload();
                }
                else {
                    document.getElementById("demo").innerHTML = "You need to delete all the \
                        reservations done by this user first.";
                }
            });
        }
}
function change_user(data) {
	return function() {
		window.location.href = "./change_user.html?" + encodeURIComponent(data);
	}
}

function add_user() {
	window.location.href = "./add_user.html";
}

function del_user(id) {
  	 return $.ajax({
	    type: "POST",
	    contentType: "application/json",
	    url: './api/user/delete.php',
	    dataType: 'json',
	    data: JSON.stringify({"id": id}),
	    async: false
			});
	 }


function get_users() {
     return $.ajax({
    type: "POST",
    url: './api/user/read.php',
    dataType: 'json',
    async: false
        });
 }
