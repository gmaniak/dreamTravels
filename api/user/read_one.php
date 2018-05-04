<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
 
// set ID property of user to be edited
$user->id = isset($_GET['id']) ? $_GET['id'] : "";
 
// read the details of user to be edited
$user->readOne();
 
if($user->type>0){
// create array
$user_arr = array(
            "id" => $user->id,
            "firstname" => $user->firstname,
            "lastname" => $user->lastname,
            "username" => $user->username,
            "password" => $user->password,
            "email" => $user->email,
            "phone" => $user->phone,
            "type" => $user->type 
); 
	
	// make it json format
	echo(json_encode($user_arr));
}
else{
    echo json_encode(
        array("message" => "No reservations found.")
    );
}
?>
