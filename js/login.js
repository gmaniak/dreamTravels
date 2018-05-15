
function submit_it() {
  var name = document.getElementsByName("username")[0].value;
  var pass = document.getElementsByName("password")[0].value;

  get_user(name).done(function (data) {
    if(!('message' in data) ) {
       if (pass != data.records[0].password) {
          document.getElementById("error").innerHTML = "Incorrect username or password."
       }
       else {
          if (parseInt(data.records[0].type) == 2)
            window.location.href = "./receptionist.html";
          else if (parseInt(data.records[0].type) == 1)
            window.location.href = "./admin.html";
		  else {
          document.getElementById("error").innerHTML = "Incorrect username or password."
       		}	
       }
    }
    else {
      document.getElementById("error").innerHTML = "Incorrect username or password."
    }
  });
}

function get_user(name) {
   return $.ajax({
    type: "POST",
    url: './api/user/search.php?s=' + name,
    dataType: 'json',
    async: false
    });
} 

