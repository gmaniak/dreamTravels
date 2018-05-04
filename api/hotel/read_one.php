<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/hotel.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare hotel object
$hotel = new Hotel($db);
 
// set ID property of hotel to be edited
$hotel->id = isset($_GET['id']) ? $_GET['id'] : "";
 
// read the details of hotel to be edited
$hotel->readOne();
 
if($hotel->location_id>0){
// create array
$hotel_arr = array(
    "id" =>  $hotel->id,
    "name" => $hotel->name,
    "location_id" =>  $hotel->location_id,
    "phone" => $hotel->phone,
    "email" =>  $hotel->email,
    "no_rooms" => $hotel->no_rooms
 
);
 
	// make it json format
	echo(json_encode($hotel_arr));
}
else{
    echo json_encode(
        array("message" => "No reservations found.")
    );
}
?>
