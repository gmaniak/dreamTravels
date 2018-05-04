<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
 
// get id of user to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of user to be edited
$user->id = $data->id;
 
// set user property values
$user->firstname = $data->firstname;
$user->lastname = $data->lastname;
$user->username = $data->username;
$user->password = $data->password;
$user->email = $data->email;
$user->phone = $data->phone;
$user->type = $data->type;
 
// update the user
if($user->update()){
    echo '{';
        echo '"message": "user was updated."';
    echo '}';
}
 
// if unable to update the user, tell the user
else{
    echo '{';
        echo '"message": "Unable to update user."';
    echo '}';
}
?>
