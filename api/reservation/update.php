<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/reservation.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare reservation object
$reservation = new Reservation($db);
 
// get id of reservation to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of reservation to be edited
$reservation->id = $data->id;
 
// set reservation property values
$reservation->hotel_id = $data->hotel_id;
$reservation->room_id = $data->room_id;
$reservation->user_id = $data->user_id;
$reservation->start_date = $data->start_date;
$reservation->end_date = $data->end_date;
$reservation->type = $data->type;
$reservation->customer_name = $data->customer_name;
$reservation->total_price = $data->total_price;
 
// update the reservation
if($reservation->update()){
    echo '{';
        echo '"message": "reservation was updated."';
    echo '}';
}
 
// if unable to update the reservation, tell the user
else{
    echo '{';
        echo '"message": "Unable to update reservation."';
    echo '}';
}
?>
