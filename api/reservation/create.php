<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate reservation object
include_once '../objects/reservation.php';
 
$database = new Database();
$db = $database->getConnection();
 
$reservation = new Reservation($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set reservation property values
$reservation->hotel_id = $data->hotel_id;
$reservation->room_id = $data->room_id;
$reservation->user_id = $data->user_id;
$reservation->start_date = $data->start_date;
$reservation->end_date = $data->end_date;
$reservation->type = $data->type;
$reservation->customer_name = $data->customer_name;
$reservation->total_price = $data->total_price;
 
// create the reservation
if($reservation->create()){
    echo '{';
        echo '"message": "reservation was created."';
    echo '}';
}
 
// if unable to create the reservation, tell the user
else{
    echo '{';
        echo '"message": "Unable to create reservation."';
    echo '}';
}
?>
