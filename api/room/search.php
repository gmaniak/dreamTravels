<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/room.php';
 
// instantiate database and room object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$room = new Room($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query rooms
$stmt = $room->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // rooms array
    $rooms_arr=array();
    $rooms_arr["records"]=array();
 
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $room_item=array(
            "id" => $id,
            "hotel_id" => $hotel_id,
            "type" => $type,
			"price" => $price
        );
 
        array_push($rooms_arr["records"], $room_item);
    }
 
    echo json_encode($rooms_arr);
}
 
else{
    echo json_encode(
        array("message" => "No rooms found.")
    );
}
?>
