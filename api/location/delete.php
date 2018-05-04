<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object file
include_once '../config/database.php';
include_once '../objects/location.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare location object
$location = new Location($db);
 
// get location id
$data = json_decode(file_get_contents("php://input"));
 
// set location id to be deleted
$location->id = $data->id;
 
// delete the location
if($location->delete()){
    echo '{';
        echo '"message": "location was deleted."';
    echo '}';
}
 
// if unable to delete the location
else{
    echo '{';
        echo '"message": "Unable to delete object."';
    echo '}';
}
?>
