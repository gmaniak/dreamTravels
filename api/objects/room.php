<?php
class Room{
 
    // database connection and table name
    private $conn;
    private $table_name = "rooms";
 
    // object properties
    public $id;
	public $hotel_id;
	public $type;
	public $price;
 
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
					type=:type,
					price=:price;";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->hotel_id=htmlspecialchars(strip_tags($this->hotel_id));
		$this->type=htmlspecialchars(strip_tags($this->type));
		$this->price=htmlspecialchars(strip_tags($this->price));
	 
		// bind values
		$stmt->bindParam(":hotel_id", $this->hotel_id);
		$stmt->bindParam(":type", $this->type);
		$stmt->bindParam(":price", $this->price);
	 
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
		$this->hotel_id = $row['hotel_id'];
		$this->type = $row['type'];
		$this->price = $row['price'];
	}

	// update the product
	function update(){
	 
		// update query
		$query = "UPDATE
		            " . $this->table_name . "
		        SET
		            hotel_id=:hotel_id,
		            type=:type,
					price=:price
		        WHERE
		            id = :id;";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->hotel_id=htmlspecialchars(strip_tags($this->hotel_id));
		$this->type=htmlspecialchars(strip_tags($this->type));
		$this->price=htmlspecialchars(strip_tags($this->price));
	 
		// bind new values
		$stmt->bindParam(":hotel_id", $this->hotel_id);
		$stmt->bindParam(":type", $this->type);
		$stmt->bindParam(":price", $this->price);
	 
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
