<?php
$servername = "localhost";
$username = "root";
$password = "Til091002";
$dbname = "lakbaymarista";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo "Connection failed: " . $conn->connect_error;
    exit;
}

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

if ($password !== $confirm_password) {
    echo "Passwords do not match";
    exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$name = mysqli_real_escape_string($conn, $name);
$email = mysqli_real_escape_string($conn, $email);
$hashed_password = mysqli_real_escape_string($conn, $hashed_password);

$emailCheckQuery = "SELECT email FROM users WHERE email = '$email'";
$emailCheckResult = $conn->query($emailCheckQuery);

if ($emailCheckResult->num_rows > 0) {
    echo "Email already exists";
    exit;
}

$sql = "INSERT INTO users (name, email, hashed_password) VALUES ('$name', '$email', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "An error occurred. Please try again later.";
}

$conn->close();
?>
