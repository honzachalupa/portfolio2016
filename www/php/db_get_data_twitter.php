<?php
    mb_internal_encoding("utf-8");

    $connector = mysqli_connect('uvdb3.active24.cz', 'honzachalupa', 'ikZFw6L5VY', 'honzachalupa');

    if ($connector->connect_error) {
        die("Connection failed: " . $connector->connect_error);
    }

    $connector->query("SET CHARACTER SET utf8");
    $connector->query("DELETE FROM tweets");

	$htmlRaw = file_get_contents("http://www.twitter.com/janchalupa");

	$patternHtml = '/<.+?stream-item-header.+?>(.|\s)+?<.+?stream-item-footer.+?>/';
	preg_match_all($patternHtml, $htmlRaw, $htmlTweet);

    foreach ($htmlTweet[0] as $tweet) {
        $tweet = str_replace("\n", '', $tweet);

        //echo " _start_ " . $tweet . " _end_ ";

        // Gather Twitter's ID
        $pattern = '/\/janchalupa\/status\/(\d*)/';
    	preg_match($pattern, $tweet, $match);
        $id = $match[1];

        // Gather timestamp
        $pattern = '/<a.+?tweet-timestamp.+?data-time-ms=\"(.+?)\"/';
    	preg_match($pattern, $tweet, $match);
        $timestamp = date("YYYY-mm-dd", $match[1] / 1000);

        // Gather content
        $pattern = '/[^-]tweet-text.+?>(.+?)</';
    	preg_match($pattern, $tweet, $match);
        $content = $match[1];

        // Set URL
        $url = "http://www.twitter.com/janchalupa/status/" . $id . "\n";

        // Save into DB
        if (strlen($id) > 0 && strlen($content) > 0 && strlen($url) > 0 && strlen($timestamp) > 0) {
            if ($connector->query("INSERT INTO tweets (TwitterId, Text, Url, DatePublished) VALUES ('" . $id . "', '" . $content . "', '" . $url . "', '" . $timestamp . "')")) {
                echo "Successfully inserted. (TwitterId: " . $id . ")\n";
            }
            else {
                echo "TwitterId: " . $id . " Error: " . $connector->error . "\n";
            }
        }
    }

    $connector->close();
?>
