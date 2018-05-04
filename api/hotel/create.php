<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate hotel object
include_once '../objects/hotel.php';
 
$database = new Database();
$db = $database->getConnection();
 
$hotel = new hotel($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set hotel property values
$hotel->name = $data->name;
$hotel->location_id = $data->location_id;
$hotel->phone = $data->phone;
$hotel->email = $data->email;
$hotel->no_rooms = $data->no_rooms;
 
// create the hotel
if($hotel->create()){
    echo '{';
        echo '"message": "hotel was created."';
    echo '}';
}
 
// if unable to create the hotel, tell the user
else{
    echo '{';
        echo '"message": "Unable to create hotel."';
    echo '}';
}
?>
