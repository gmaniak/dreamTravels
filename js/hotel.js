function write() {
    params = JSON.parse(decodeURIComponent(window.location.search).substring(1));
    address = "Address: " + params["street"] + " street, no. " + params["no"] + ", " + 
      params["town"] + " town, " + params["county"] + " county, " + params["country"];

    document.getElementById("address").innerHTML = address; 

    document.getElementById("email").innerHTML = "Email: " + params["email"];
    document.getElementById("phone").innerHTML = "Phone: " + params["phone"];
}