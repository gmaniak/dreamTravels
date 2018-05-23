function print() {
	var tbl = document.createElement('table');
	var body = document.getElementById("table_body");
	var user;


    get_users().done(function (data) {
      if(!('message' in data) ) {
        for (i in data.records) {
                user = data.records[i];

                var tr = document.createElement("tr");
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(user["id"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode(user["username"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode(user["firstname"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode(user["lastname"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode(user["email"]));

                var td = tr.insertCell();
                td.appendChild(document.createTextNode(user["phone"]));

                var td = tr.insertCell();
                if (parseInt(user["type"]) == 1) {
                    td.appendChild(document.createTextNode("administrator"));
                }
                else {
                    td.appendChild(document.createTextNode("receptionist"));
                }

                var td = tr.insertCell();
                var button = document.createElement('button');
                button.appendChild(document.createTextNode('Delete'));
                button.onclick = delete_user(i, user["id"]);
                button.classList.add("btn");
                button.classList.add("btn-primary");
                td.appendChild(button);

                var button = document.createElement('button');
                button.appendChild(document.createTextNode('Change'));
                button.onclick = change_user(JSON.stringify(user));
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
