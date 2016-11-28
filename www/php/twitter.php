<?php
    $html = file_get_contents("http://twitter.com/janchalupa");

    preg_match_all("/<ol.+?stream-items.+?<\/ol>/m", $html, $matches);

    var_dump($matches);
?>
