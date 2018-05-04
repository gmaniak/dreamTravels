<?php
class Reservation{
 
    // database connection and table name
    private $conn;
    private $table_name = "reservations";
 
    // object properties
    public $id;
    public $hotel_id;
	public $room_id;
	public $user_id;
	public $start_date;
    public $end_date;
	public $type;
    public $customer_name;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

	// read products
	function read(){
	 
		// select all query
		$query = "SELECT
		            *
		        FROM
		            " . $this->table_name . ";";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

	function create(){
 
		// query to insert record
		$query = "INSERT INTO
		            " . $this->table_name . "
		        SET
		            hotel_id=:hotel_id, 
					room_id=:room_id,
					user_id=:user_id,
					start_date=:start_date,
					end_date=:end_date,
					type=:type,
					customer_name=:customer_name;";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->hotel_id=htmlspecialchars(strip_tags($this->hotel_id));
		$this->room_id=htmlspecialchars(strip_tags($this->room_id));
		$this->user_id=htmlspecialchars(strip_tags($this->user_id));
		$this->start_date=htmlspecialchars(strip_tags($this->start_date));
		$this->end_date=htmlspecialchars(strip_tags($this->end_date));
		$this->type=htmlspecialchars(strip_tags($this->type));
		$this->customer_name=htmlspecialchars(strip_tags($this->customer_name));
	 
		// bind values
		$stmt->bindParam(":hotel_id", $this->hotel_id);
		$stmt->bindParam(":room_id", $this->room_id);
		$stmt->bindParam(":user_id", $this->user_id);
		$stmt->bindParam(":start_date", $this->start_date);
		$stmt->bindParam(":end_date", $this->end_date);
		$stmt->bindParam(":type", $this->type);
		$stmt->bindParam(":customer_name", $this->customer_name);
	 
		// execute query
		if($stmt->execute()){
		    return true;
		}
	 
		return false;
	}

	// used when filling up the update product form
	function readOne(){
	 
		// query to read single record
		$query = "SELECT
		            *
		        FROM
		            " . $this->table_name . " 
		        WHERE
		            id = ?;";
	 
		// prepare query statement
		$stmt = $this->conn->prepare( $query );
	 
		// bind id of product to be updated
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		$stmt->execute();
	 
		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
		// set values to object properties
		$this->id = $row['id'];
		$this->hotel_id = $row['hotel_id'];
		$this->room_id = $row['room_id'];
		$this->user_id = $row['user_id '];
		$this->start_date = $row['start_date'];
		$this->end_date = $row['end_date'];
		$this->type = $row['type'];
		$this->customer_name = $row['customer_name'];
	}

	// update the product
	function update(){
	 
		// update query
		$query = "UPDATE
		            " . $this->table_name . "
		        SET
		            hotel_id=:hotel_id, 
					room_id=:room_id,
					user_id=:user_id,
					start_date=:start_date,
					end_date=:end_date,
					type=:type,
					customer_name=:customer_name
		        WHERE
		            id = :id;";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->hotel_id=htmlspecialchars(strip_tags($this->hotel_id));
		$this->room_id=htmlspecialchars(strip_tags($this->room_id));
		$this->user_id=htmlspecialchars(strip_tags($this->user_id));
		$this->start_date=htmlspecialchars(strip_tags($this->start_date));
		$this->end_date=htmlspecialchars(strip_tags($this->end_date));
		$this->type=htmlspecialchars(strip_tags($this->type));
		$this->customer_name=htmlspecialchars(strip_tags($this->customer_name));
	 
		// bind values
		$stmt->bindParam(":hotel_id", $this->hotel_id);
		$stmt->bindParam(":room_id", $this->room_id);
		$stmt->bindParam(":user_id", $this->user_id);
		$stmt->bindParam(":start_date", $this->start_date);
		$stmt->bindParam(":end_date", $this->end_date);
		$stmt->bindParam(":type", $this->type);
		$stmt->bindParam(":customer_name", $this->customer_name);
	 
		// execute the query
		if($stmt->execute()){
		    return true;
		}
	 
		return false;
	}

	// delete the product
	function delete(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE id = ?;";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		if($stmt->execute()){
		    return true;
		}
	 
		return false;
		 
	}
	// search products
	function search($keywords){
	 
		// select all query
		$query = "SELECT
					*
		        FROM
		            " . $this->table_name . "
		        WHERE
		            name LIKE ? ;";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$keywords=htmlspecialchars(strip_tags($keywords));
		$keywords = "%{$keywords}%";
	 
		// bind
		$stmt->bindParam(1, $keywords);
	 
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
}
