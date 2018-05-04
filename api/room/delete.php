<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/room.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
echo '"message": "Unable to delete object."';
// prepare room object
$room = new Room($db);
 
// get room id
$data = json_decode(file_get_contents("php://input"));
 
// set room id to be deleted
$room->id = $data->id;
 
// delete the room
if($room->delete()){
    echo '{';
        echo '"message": "room was deleted."';
    echo '}';
}
 
// if unable to delete the room
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>
