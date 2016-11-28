<?php
    mb_internal_encoding("utf-8");

    $type = $_GET["type"];
    $id   = $_GET["id"];

    $connector = mysqli_connect('uvdb3.active24.cz', 'honzachalupa', 'ikZFw6L5VY', 'honzachalupa');
    $data   = array();

    if ($connector->connect_error) {
        die("Connection failed: " . $connector->connect_error);
    }

    $result = $connector->query("SELECT * FROM " . $type . " WHERE Id = " . $id);

    var_dump($result);

    while($row = $result->fetch_array(MYSQL_ASSOC)) {
        $data[] = $row;
    }

    echo json_encode($data);

    $projects->close();
    $connector->close();
?>
