function fill_in() {
 var params = window.location.search.substring(1).split("&");
  var date_in;
  var date_out;
  var hotel_id;
  var room_id;

  var months = ["January", "February", "March", "April", "May", 
  "June", "July", "August", "September", "October", "November", "December"];

  date_in = new Date(params[0].split("=")[1]);
  date_out = new Date(params[1].split("=")[1]);
  hotel_id = params[2].split("=")[1];
  room_id = params[3].split("=")[1];

  date_in = date_in.getDate() + " " + months[date_in.getMonth()] + " " + date_in.getFullYear();
  date_out = date_out.getDate() + " " + months[date_out.getMonth()] + " " + date_out.getFullYear();

  document.getElementById("in_date").innerHTML = date_in;
  document.getElementById("out_date").innerHTML = date_out;

  get_no_pers(room_id).done(function (data) {
    if(!('message' in data) ) {
       document.getElementById("no_pers").innerHTML = data.type;
    }
    else {
      console.log(data.message);
    }
  });

  get_hotel(hotel_id).done(function (data) {
    if(!('message' in data) ) {
       document.getElementById("hotel").innerHTML = data.name;
    }
    else {
      console.log(data.message);
    }
  });
}

function get_hotel(hotel_id) {
   return $.ajax({
    type: "POST",
    url: './api/hotel/read_one.php?id=' + hotel_id,
    dataType: 'json',
    async: false
    });
} 

function get_no_pers(room_id) {
   return $.ajax({
    type: "POST",
    url: './api/room/read_one.php?id=' + room_id,
    dataType: 'json',
    async: false
    });
}

function submit_it() {
  var firstname = document.getElementsByName("firstname")[0].value;
  var lastname = document.getElementsByName("lastname")[0].value;
  var e = document.getElementsByName("country")[0];
  var country = e.options[e.selectedIndex].text;
  var address = document.getElementsByName("address")[0].value;
  var phone = document.getElementsByName("phone")[0].value;
  var email = document.getElementsByName("email")[0].value;
  var in_date = document.getElementById("in_date").innerHTML;
  var out_date = document.getElementById("out_date").innerHTML;
  var no_pers = document.getElementById("no_pers").innerHTML;
  var hotel = window.location.search.substring(1).split("&")[2].split("=")[1];
  var room = window.location.search.substring(1).split("&")[3].split("=")[1];

  var params = "firstname=" + firstname + "&lastname=" + lastname + 
    "&country=" + country + "&address=" + address + "&phone=" +
    phone + "&email=" + email + "&in_date=" + in_date + "&out_date=" + 
    out_date + "&no_pers=" + no_pers + "&hotel=" + hotel + "&room=" + room;

  var subject = "Reservation confirmation"
  var msg = "Thank you for your reservation!\nPlease check the " +
    "reservation data below before confirming.\n" +
    "Firstname: " + firstname + "\nLastname: " + lastname +
    "\nCountry: " + country + "\nAddress: " + address + "\nPhone: " +
    phone + "\nEmail: " + email + "\nCheck-in date:" + in_date + 
    "\nCheck-out date: " + out_date + "\nNo. of persons: " + no_pers + 
    "\nHotel: " + hotel + "\nIf this data is correct, confirm by \
    clicking on the following link: \n \
    http://13.58.30.229/confirm.html?" + encodeURIComponent(params);

  document.location.href = "mailto:" + email + "?subject="
        + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(msg);

  document.body.innerHTML = "Thank you for the reservation!";

  setTimeout(function(){ window.location.href = "."; }, 5000);
}