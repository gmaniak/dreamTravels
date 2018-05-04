<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/location.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare location object
$location = new Location($db);
 
// set ID property of location to be edited
$location->id = isset($_GET['id']) ? $_GET['id'] : "";
 
// read the details of location to be edited
$location->readOne();
 
if($location->town!=null){
// create array
$location_arr = array(
            "id" => $location->id,
            "town" => $location->town,
            "county" => $location->county,
            "country" => $location->country,
            "street" => $location->street,
            "no" => $location->no
);
 
	// make it json format
	echo(json_encode($location_arr));
}
else{
    echo json_encode(
        array("message" => "No reservations found.")
    );
}
?>
