<?php
class Hotel{
 
    // database connection and table name
    private $conn;
    private $table_name = "hotels";
 
    // object properties
    public $id;
    public $name;
	public $location_id;
	public $phone;
	public $email;
    public $no_rooms;
 
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
		            name=:name, 
					location_id=:location_id,
					phone=:phone,
					email=:email,
					no_rooms=:no_rooms;";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->location_id=htmlspecialchars(strip_tags($this->location_id));
		$this->phone=htmlspecialchars(strip_tags($this->phone));
		$this->email=htmlspecialchars(strip_tags($this->email));
		$this->no_rooms=htmlspecialchars(strip_tags($this->no_rooms));
	 
		// bind values
		$stmt->bindParam(":name", $this->name);
		$stmt->bindParam(":location_id", $this->location_id);
		$stmt->bindParam(":phone", $this->phone);
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":no_rooms", $this->no_rooms);
	 
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
		$this->name = $row['name'];
		$this->location_id = $row['location_id'];
		$this->phone = $row['phone'];
		$this->email = $row['email'];
		$this->no_rooms = $row['no_rooms'];
	}

	// update the product
	function update(){
	 
		// update query
		$query = "UPDATE
		            " . $this->table_name . "
		        SET
		            name=:name,
					location_id=:location_id,
					phone=:phone,
					email=:email,
		            no_rooms=:no_rooms
		        WHERE
		            id = :id;";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
		$this->name=htmlspecialchars(strip_tags($this->name));
		$this->location_id=htmlspecialchars(strip_tags($this->location_id));
		$this->phone=htmlspecialchars(strip_tags($this->phone));
		$this->email=htmlspecialchars(strip_tags($this->email));
		$this->no_rooms=htmlspecialchars(strip_tags($this->no_rooms));
	 
		// bind new values
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(':name', $this->name);
		$stmt->bindParam(':location_id', $this->location_id);
		$stmt->bindParam(':phone', $this->phone);
		$stmt->bindParam(':email', $this->email);
		$stmt->bindParam(':no_rooms', $this->no_rooms);
	 
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
?>
