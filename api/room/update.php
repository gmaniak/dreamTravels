<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/room.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare room object
$room = new Room($db);
 
// get id of room to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of room to be edited
$room->id = $data->id;
 
// set room property values
$room->hotel_id = $data->hotel_id;
$room->type = $data->type;
$room->price = $data->price;
 
// update the room
if($room->update()){
    echo '{';
        echo '"message": "room was updated."';
    echo '}';
}
 
// if unable to update the room, tell the user
else{
    echo '{';
        echo '"message": "Unable to update room."';
    echo '}';
}
?>
