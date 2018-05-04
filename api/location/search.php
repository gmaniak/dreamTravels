<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/location.php';
 
// instantiate database and location object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$location = new Location($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query locations
$stmt = $location->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // locations array
    $locations_arr=array();
    $locations_arr["records"]=array();
 
    // retrieve our table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $location_item=array(
            "id" => $id,
            "town" => $town,
            "county" => $county,
            "country" => $country,
            "street" => $street,
            "no" => $no
        );
 
        array_push($locations_arr["records"], $location_item);
    }
 
    echo json_encode($locations_arr);
}
 
else{
    echo json_encode(
        array("message" => "No locations found.")
    );
}
?>
