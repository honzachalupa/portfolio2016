<?php
    mb_internal_encoding("utf-8");

    $connector = mysqli_connect('uvdb3.active24.cz', 'honzachalupa', 'ikZFw6L5VY', 'honzachalupa');
    $data   = array();

    if ($connector->connect_error) {
        die("Connection failed: " . $connector->connect_error);
    }

    $connector->query("SET CHARACTER SET utf8");

    // Projects
    $projects = $connector->query("SELECT * FROM projects");

    while ($row = $projects->fetch_array(MYSQL_ASSOC)) {
        $data[] = $row;
    }

    $projects->close();

    // Images
    $images = $connector->query("SELECT * FROM images");

    while ($row = $images->fetch_array(MYSQL_ASSOC)) {
        $data[] = $row;
    }

    $images->close();

    // Tweets
    $tweets = $connector->query("SELECT * FROM tweets");

    if ($connector->query("SELECT * FROM tweets")) {
        echo "OK";
    }
    else {
        echo "Error: " . $connector->error;
    }

    while ($row = $tweets->fetch_array(MYSQL_ASSOC)) {
        $data[] = $row;
    }

    $tweets->close();
    $connector->close();

    // Export
    file_put_contents("../data/data.json", json_encode($data));
?>
