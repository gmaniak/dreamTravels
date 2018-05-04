<?php
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
 
    // object properties
    public $id;
    public $firstname;
    public $lastname;
    public $username;
    public $password;
    public $email;
    public $phone;
    public $type; 
 
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
		            firstname=:firstname,
					lastname=:lastname,
					username=:username,
					password=:password,
					email=:email,
					phone=:phone,
					type=:type;";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->firstname=htmlspecialchars(strip_tags($this->firstname));
		$this->lastname=htmlspecialchars(strip_tags($this->lastname));
		$this->username=htmlspecialchars(strip_tags($this->username));
		$this->password=htmlspecialchars(strip_tags($this->password));
		$this->email=htmlspecialchars(strip_tags($this->email));
		$this->phone=htmlspecialchars(strip_tags($this->phone));
		$this->type=htmlspecialchars(strip_tags($this->type));
	 
		// bind values
		$stmt->bindParam(":firstname", $this->firstname);
		$stmt->bindParam(":lastname", $this->lastname);
		$stmt->bindParam(":username", $this->username);
		$stmt->bindParam(":password", $this->password);
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":phone", $this->phone);
		$stmt->bindParam(":email", $this->email);
	 
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
		$this->firstname = $row['firstname'];
		$this->lastname = $row['lastname'];
		$this->username = $row['username'];
		$this->password = $row['password'];
		$this->email = $row['email'];
		$this->phone = $row['phone'];
		$this->type = $row['type'];
	}

	// update the product
	function update(){
	 
		// update query
		$query = "UPDATE
		            " . $this->table_name . "
		        SET
		            firstname = :firstname,
					lastname = :lastname,
		            username = :username,
					password = :password,
		            email = :email,
					phone = :phone,
		            type = :type,
		        WHERE
		            id = :id;";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->firstname=htmlspecialchars(strip_tags($this->firstname));
		$this->lastname=htmlspecialchars(strip_tags($this->lastname));
		$this->username=htmlspecialchars(strip_tags($this->username));
		$this->password=htmlspecialchars(strip_tags($this->password));
		$this->email=htmlspecialchars(strip_tags($this->email));
		$this->phone=htmlspecialchars(strip_tags($this->phone));
		$this->type=htmlspecialchars(strip_tags($this->type));
	 
		// bind new values
		$stmt->bindParam(":firstname", $this->firstname);
		$stmt->bindParam(":lastname", $this->lastname);
		$stmt->bindParam(":username", $this->username);
		$stmt->bindParam(":password", $this->password);
		$stmt->bindParam(":email", $this->email);
		$stmt->bindParam(":phone", $this->phone);
		$stmt->bindParam(":email", $this->email);
	 
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
		            name LIKE ?;";
	 
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
