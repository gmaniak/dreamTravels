function print() {
	var params = decodeURIComponent(window.location.search).substring(1).split(",");

    var firstname = params[1].split(":")[1];
    document.getElementsByName("firstname")[0].value = firstname.substring(1, firstname.length - 1);

    var lastname = params[2].split(":")[1];
    document.getElementsByName("lastname")[0].value = lastname.substring(1, lastname.length - 1);

    var username = params[3].split(":")[1];
    document.getElementsByName("username")[0].value = username.substring(1, username.length - 1);

    var password = params[4].split(":")[1];
    document.getElementsByName("password")[0].value = password.substring(1, password.length - 1);

    var email = params[5].split(":")[1];
    document.getElementsByName("email")[0].value = email.substring(1, email.length - 1); 

    var phone = params[6].split(":")[1];
    document.getElementsByName("phone")[0].value = phone.substring(1, phone.length - 1);

    var type = params[7].split(":")[1];
    type = type.substring(1, type.length - 2);
    
    if (parseInt(type) == 1) {
        document.getElementsByName("type")[0].checked = "checked";
    }
    else {
        document.getElementsByName("type")[1].checked = "checked";
    }
}

function format_string(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    var re = /^\d{10}$/;
    return re.test(phone);
}

function validate(firstname, lastname, username, password, email, phone){
    if(firstname == ""){
         document.getElementById("demo").innerHTML = "Please type the user's First name";
         return false;
    }
    if (/^[a-zA-Z]+$/.test(firstname) == false){
        document.getElementById("demo").innerHTML = "Please give a valid First name";
        return false;
    }
    if(lastname == ""){
         document.getElementById("demo").innerHTML = "Please type the user's Last name";
         return false;
    }
    if (/^[a-zA-Z]+$/.test(lastname) == false){
        document.getElementById("demo").innerHTML = "Please give a valid Last name";
        return false;
    }
    if(username == ""){
         document.getElementById("demo").innerHTML = "Please type the User name";
         return false;
    }
    if(password == ""){
         document.getElementById("demo").innerHTML = "Please type the user's password";
         return false;
    }
    if(email == ""){
         document.getElementById("demo").innerHTML = "Please type the user's email";
         return false;
    }
    if(validateEmail(email) == false){
         document.getElementById("demo").innerHTML = "Please type a valid email";
         return false;
    }
    if(phone == ""){
         document.getElementById("demo").innerHTML = "Please type the user's phone number";
         return false;
    }
    if(validatePhone(phone) == false){
         document.getElementById("demo").innerHTML = "Please type a valid phone number";
         return false;
    }
    return true;
}

function submit_it() {
    var params = {};
    var par = decodeURIComponent(window.location.search).substring(1).split(",");
    var id = par[0].split(":")[1];

    params["id"] = id.substring(1, id.length - 1);
    params["firstname"] = document.getElementsByName("firstname")[0].value;
    params["lastname"] = document.getElementsByName("lastname")[0].value;
    params["username"] = document.getElementsByName("username")[0].value;
    params["password"] = document.getElementsByName("password")[0].value;
    params["email"] = document.getElementsByName("email")[0].value;
    params["phone"] = document.getElementsByName("phone")[0].value;
    radios = document.getElementsByName("type");

    if(validate(params["firstname"], params["lastname"], params["username"], params["password"], params["email"], params["phone"]) == false)
        return;

    params["firstname"] = format_string(params["firstname"]);
    params["lastname"] = format_string(params["lastname"]);

    for (j in radios)
     if (radios[j].checked) {
      params["type"] = radios[j].value;
      break;
     }

    change_it(params).done(function (data) {
        if (data.message == "user was updated." ) {
            alert("Update done!");
            window.location.href = "./admin.html";
        }
        else 
            document.getElementById("demo").innerHTML = data.message;
    });
}

function change_it(params) {
    return $.ajax({
        type: "POST",
        contentType: "application/json",
        url: './api/user/update.php',
        dataType: 'json',
        data: JSON.stringify(params),
        async: false
    });
}

function add_it() {
    var params = {};

    params["firstname"] = document.getElementsByName("firstname")[0].value;
    params["lastname"] = document.getElementsByName("lastname")[0].value;
    params["username"] = document.getElementsByName("username")[0].value;
    params["password"] = document.getElementsByName("password")[0].value;
    params["email"] = document.getElementsByName("email")[0].value;
    params["phone"] = document.getElementsByName("phone")[0].value;
    radios = document.getElementsByName("type");

    if(validate(params["firstname"], params["lastname"], params["username"], params["password"], params["email"], params["phone"]) == false)
        return;
    
    params["firstname"] = format_string(params["firstname"]);
    params["lastname"] = format_string(params["lastname"]);

    var ok = 0;

    for (j in radios)
     if (radios[j].checked) {
      params["type"] = radios[j].value;
      ok = 1;
      break;
     }

    if(ok == 0){
        document.getElementById("demo").innerHTML = "Please select user's type";
        return;
    }

    add_user(params).done(function (data) {
        if (data.message == "user was created." ) {
            alert("Add done!");
            window.location.href = "./admin.html";
        }
        else 
            document.getElementById("demo").innerHTML = data.message;
    });
}

function add_user(params) {
    return $.ajax({
        type: "POST",
        contentType: "application/json",
        url: './api/user/create.php',
        dataType: 'json',
        data: JSON.stringify(params),
        async: false
    });
}