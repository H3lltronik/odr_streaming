<?php
    $conn = mysqli_connect("localhost", "root", "", "odr_streaming");

    if ($conn) {
        $result = mysqli_query($conn, "SELECT * FROM saga");
        
        if (mysqli_num_rows($result) > 0) {
        	$res = mysqli_fetch_assoc($result);
        	echo json_encode("webos");
        }
    }
?>