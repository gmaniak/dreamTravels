<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate room object
include_once '../objects/room.php';
 
$database = new Database();
$db = $database->getConnection();
 
$room = new Room($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set room property values
$room->hotel_id = $data->hotel_id;
$room->type = $data->type;
$room->price = $data->price;
 
// create the room
if($room->create()){
    echo '{';
        echo '"message": "room was created."';
    echo '}';
}
 
// if unable to create the room, tell the user
else{
    echo '{';
        echo '"message": "Unable to create room."';
    echo '}';
}
?>
