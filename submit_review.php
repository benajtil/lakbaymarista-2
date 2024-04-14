<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "Til091002";
$dbname = "lakbaymarista";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Form data
$name = $_POST['name'];
$designation = $_POST['designation'];
$review = $_POST['review'];
$timestamp = date('Y-m-d H:i:s');

// SQL to insert data into reviews table
$sql = "INSERT INTO reviews (name, designation, review, timestamp) VALUES ('$name', '$designation', '$review', '$timestamp')";

if ($conn->query($sql) === TRUE) {
    echo "Review submitted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
