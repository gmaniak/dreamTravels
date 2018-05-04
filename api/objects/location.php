<?php
class Location{
 
    // database connection and table name
    private $conn;
    private $table_name = "locations";
 
    // object properties
    public $id;
    public $town;
	public $county;
	public $country;
	public $street;
    public $no;
 
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
		            town=:town, 
					county=:county,
					country=:country,
					street=:street,
					no=:no;";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->town=htmlspecialchars(strip_tags($this->town));
		$this->county=htmlspecialchars(strip_tags($this->county));
		$this->country=htmlspecialchars(strip_tags($this->country));
		$this->street=htmlspecialchars(strip_tags($this->street));
		$this->no=htmlspecialchars(strip_tags($this->no));
	 
		// bind values
		$stmt->bindParam(":town", $this->town);
		$stmt->bindParam(":county", $this->county);
		$stmt->bindParam(":country", $this->country);
		$stmt->bindParam(":street", $this->street);
		$stmt->bindParam(":no", $this->no);
	 
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
		$this->town = $row['town'];
		$this->county = $row['county'];
		$this->country = $row['country'];
		$this->street = $row['street'];
		$this->no = $row['no'];
	}

	// update the product
	function update(){
	 
		// update query
		$query = "UPDATE
		            " . $this->table_name . "
		        SET
		            town=:town, 
					county=:county,
					country=:country,
					street=:street,
					no=:no
		        WHERE
		            id = :id;";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->town=htmlspecialchars(strip_tags($this->town));
		$this->county=htmlspecialchars(strip_tags($this->county));
		$this->country=htmlspecialchars(strip_tags($this->country));
		$this->street=htmlspecialchars(strip_tags($this->street));
		$this->no=htmlspecialchars(strip_tags($this->no));
	 
		// bind values
		$stmt->bindParam(":town", $this->town);
		$stmt->bindParam(":county", $this->county);
		$stmt->bindParam(":country", $this->country);
		$stmt->bindParam(":street", $this->street);
		$stmt->bindParam(":no", $this->no);
	 
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
