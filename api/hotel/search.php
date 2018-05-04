<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/hotel.php';
 
// instantiate database and hotel object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$hotel = new hotel($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query hotels
$stmt = $hotel->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // hotels array
    $hotels_arr=array();
    $hotels_arr["records"]=array();
 
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $hotel_item=array(
            "id" => $id,
            "name" => $name,
            "location_id" => $location_id,
            "phone" => $phone,
            "email" => $email,
            "no_rooms" => $no_rooms
        );
 
        array_push($hotels_arr["records"], $hotel_item);
    }
 
    echo json_encode($hotels_arr);
}
 
else{
    echo json_encode(
        array("message" => "No hotels found.")
    );
}
?>
