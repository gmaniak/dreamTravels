<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/location.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare location object
$location = new Location($db);
 
// get id of location to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of location to be edited
$location->id = $data->id;
 
// set location property values
$location->town = $data->town;
$location->county = $data->county;
$location->country = $data->country;
$location->street = $data->street;
$location->no = $data->no;
 
// update the location
if($location->update()){
    echo '{';
        echo '"message": "location was updated."';
    echo '}';
}
 
// if unable to update the location, tell the user
else{
    echo '{';
        echo '"message": "Unable to update location."';
    echo '}';
}
?>
