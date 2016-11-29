$(document).ready(function() {
    $(".side-panel-placeholder").load("http://www.honzachalupa.cz/dev/partial/side-panel.html", function() {
        $("h2 li").each(function() {
            console.log("x");
            $(this).css("border-color", "rgb(" + rndRange(0, 255) + ", " + rndRange(0, 255) + ", " + rndRange(0, 255) + ")");
        });
    });

    getData();

    function rndRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
