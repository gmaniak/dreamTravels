<?php

$params = json_decode(file_get_contents("php://input"));

$url = "firstname=" . $params->firstname . "&lastname=" . $params->lastname . 
    "&country=" . $params->country . "&address=" . $params->address . "&phone=" .
    $params->phone . "&email=" . $params->email . "&in_date=" . $params->in_date . "&out_date=" . 
    $params->out_date . "&no_pers=" . $params->no_pers . "&hotel=" . $params->hotel . "&room=" . $params->room . "&price=" . $params->price;

$to = $params->email;

$subject = "[DreamTravelers] Reservation Confirmation";

$msg = "Thank you for your reservation!\nPlease check the " .
    "reservation data below before confirming.\n" .
    "Firstname: " . $params->firstname . "\nLastname: " . $params->lastname .
    "\nCountry: " . $params->country . "\nAddress: " . $params->address .
	"\nPhone: " . $params->phone . "\nEmail: " . $params->email . 
	"\nCheck-in date:" . $params->in_date . 
    "\nCheck-out date: " . $params->out_date . "\nNo. of persons: " . 
	$params->no_pers . 
    "\nHotel: " . $params->hotel . "Total price: " . $params->price . "\nIf this data is correct, confirm by \
    clicking on the following link: \n \
    http://13.58.30.229/confirm.html?" . rawurlencode($url);

mail($to, $subject, $msg);
?>
