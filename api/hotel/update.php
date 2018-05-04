<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/hotel.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare hotel object
$hotel = new hotel($db);
 
// get id of hotel to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of hotel to be edited
$hotel->id = $data->id;
 
// set hotel property values
$hotel->name = $data->name;
$hotel->location_id = $data->location_id;
$hotel->phone = $data->phone;
$hotel->email = $data->email;
$hotel->no_rooms = $data->no_rooms;
 
// update the hotel
if($hotel->update()){
    echo '{';
        echo '"message": "hotel was updated."';
    echo '}';
}
 
// if unable to update the hotel, tell the user
else{
    echo '{';
        echo '"message": "Unable to update hotel."';
    echo '}';
}
?>
