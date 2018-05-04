<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/reservation.php';
 
// instantiate database and reservation object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$reservation = new Reservation($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query reservations
$stmt = $reservation->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // reservations array
    $reservations_arr=array();
    $reservations_arr["records"]=array();
 
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $reservation_item=array(
            "id" => $id,
            "hotel_id" => $hotel_id,
            "room_id" => $room_id,
            "user_id" => $user_id,
            "start_date" => $start_date,
            "end_date" => $end_date,
            "type" => $type,
            "customer_name" => $customer_name
        );
 
        array_push($reservations_arr["records"], $reservation_item);
    }
 
    echo json_encode($reservations_arr);
}
 
else{
    echo json_encode(
        array("message" => "No reservations found.")
    );
}
?>
