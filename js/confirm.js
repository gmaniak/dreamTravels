
function store() {
  var params = decodeURIComponent(window.location.search.substring(1)).split("&");
  var name = params[0].split("=")[1] + " " + params[1].split("=")[1];
  var hotel_id = params[9].split("=")[1];
  var room_id = params[10].split("=")[1];
  var price = params[11].split("=")[1];
  price = price.slice(0, price.length - 4);
  var user_id = 1;
  var type = 2;
  var start_date = new Date(params[6].split("=")[1]);
  var end_date = new Date(params[7].split("=")[1]);
  var end_date = new Date(params[7].split("=")[1]);


  var json = {"id": "default", "hotel_id": hotel_id, "room_id": room_id, "user_id": user_id,
          "start_date": start_date.getFullYear() +"-"+(start_date.getMonth()+1) +"-"+start_date.getDate(),
          "end_date": end_date.getFullYear() +"-"+(end_date.getMonth()+1) +"-"+end_date.getDate(),
          "type": type, "customer_name": name, "total_price": price};

  set_reservation(json).done(function(data) {
    console.log(data.message);
  });

  setTimeout(function(){ window.location.href = "."; }, 5000);
}

function set_reservation(json) {
   return $.ajax({
    type: "POST",
    contentType: "application/json",
    url: './api/reservation/create.php?',
    dataType: 'json',
    data: JSON.stringify(json),
    async: false
    });
} 
