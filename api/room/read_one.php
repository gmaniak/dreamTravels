<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/room.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$room = new Room($db);
 
// set ID property of user to be edited
$room->id = isset($_GET['id']) ? $_GET['id'] : "";
 
// read the details of user to be edited
$room->readOne();
 
if($room->type>0){
// create array
$room_arr = array(
            "id" => $room->id,
            "hotel_id" => $room->hotel_id,
            "type" => $room->type,
			"price" => $room->price
); 
	
	// make it json format
	echo(json_encode($room_arr));
}
else{
    echo json_encode(
        array("message" => "No room found.")
    );
}
?>
