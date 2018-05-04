<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/reservation.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare reservation object
$reservation = new Reservation($db);
 
// set ID property of reservation to be edited
$reservation->id = isset($_GET['id']) ? $_GET['id'] : "";
 
// read the details of reservation to be edited
$reservation->readOne();

if($reservation->hotel_id>0){
// create array
$reservation_arr = array(
            "id" => $reservation->id,
            "hotel_id" => $reservation->hotel_id,
            "room_id" => $reservation->room_id,
            "user_id" => $reservation->user_id,
            "start_date" => $reservation->start_date,
            "end_date" => $reservation->end_date,
            "type" => $reservation->type,
            "customer_name" => $reservation->customer_name
 
);
 
	// make it json format
	echo(json_encode($reservation_arr));
}
else{
    echo json_encode(
        array("message" => "No reservations found.")
    );
}
?>
