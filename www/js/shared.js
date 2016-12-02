$("document").ready(function() {
    $("#side-panel-placeholder").load("./partial/side-panel.html", function() {
        $("#header-placeholder").load("./partial/header.html", function() {
            $("#navigation-placeholder").load("./partial/navigation.html", function() {
                getRelevatControls();

                $("h2 li").each(function() {
                    $(this).css("border-color", `rgb(${rndRange(0, 255)}, ${rndRange(0, 255)}, ${rndRange(0, 255)})`);
                });
            });
        });

        $("#about-panel-placeholder").load("./partial/about-panel.html");
    });



    getData();

    function rndRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});

$(window).resize(function() {
    getRelevatControls();
});

function getRelevatControls() {
    if (isMobile()) {
        toggleSidePanel(true);

        $(".desktop-only").css("display", "none");
        $(".mobile-only").css("display", "");
    }
    else {
        $(".desktop-only").css("display", "");
        $(".mobile-only").css("display", "none");
    }
}

function isMobile() {
    return $(window).width() <= 700;
}

function toggleSidePanel(force = false) {
    let panel = $(".side-panel");

    if (panel.hasClass("opened") == true || force) {
        panel.removeClass("opened");
        panel.addClass("closed");

        $(".grid").css({"filter": "blur(0)"});
    }
    else {
        panel.removeClass("closed");
        panel.addClass("opened");

        $(".grid").css({"filter": "blur(20px)"});
    }
}
