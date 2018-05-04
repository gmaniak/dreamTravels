<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/hotel.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare hotel object
$hotel = new hotel($db);
 
// get hotel id
$data = json_decode(file_get_contents("php://input"));
 
// set hotel id to be deleted
$hotel->id = $data->id;
 
// delete the hotel
if($hotel->delete()){
    echo '{';
        echo '"message": "hotel was deleted."';
    echo '}';
}
 
// if unable to delete the hotel
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>
