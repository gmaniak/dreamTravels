<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/reservation.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare reservation object
$reservation = new Reservation($db);
 
// get reservation id
$data = json_decode(file_get_contents("php://input"));
 
// set reservation id to be deleted
$reservation->id = $data->id;
 
// delete the reservation
if($reservation->delete()){
    echo '{';
        echo '"message": "reservation was deleted."';
    echo '}';
}
 
// if unable to delete the reservation
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>
