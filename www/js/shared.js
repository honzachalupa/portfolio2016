let templates = {
    "side-panel": {"loaded": false},
    "about-panel": {"loaded": false},
    "header": {"loaded": false},
    "navigation": {"loaded": false},
    "footer": {"loaded": false},
    "social-networks": {"loaded": false}
};

$("document").ready(function() {
    $("#side-panel-placeholder").load("./partial/side-panel.html", function() {
        templates["side-panel"].loaded = true;

        $("#about-panel-placeholder").load("./partial/about-panel.html", function() {
            templates["about-panel"].loaded = true;
        });

        $("#header-placeholder").load("./partial/header.html", function() {
            templates["header"].loaded = true;

            $("#navigation-placeholder").load("./partial/navigation.html", function() {
                templates["navigation"].loaded = true;
            });
        });

        $("#footer-placeholder").load("./partial/footer.html", function() {
            templates["footer"].loaded = true;

            $("#social-networks-placeholder").load("./partial/social-networks.html", function() {
                templates["social-networks"].loaded = true;
            });
        });
    });

    const templateChecker = setInterval(function() {
        let somethingMissing = false;

        for (let i in templates) {
            if (!templates[i].loaded) {
                somethingMissing = true;
                break;
            }
        }

        if (!somethingMissing) {
            getRelevatControls();

            $("h2 li").each(function() {
                $(this).css("border-color", `rgb(${rndRange(0, 255)}, ${rndRange(0, 255)}, ${rndRange(0, 255)})`);
            });

            clearInterval(templateChecker);
        }
    }, 200);

    getData();
});

$(window).resize(function() {
    getRelevatControls();
});

function getRelevatControls() {
    if (isMobile()) {
        toggleSidePanel(true);

        $("body").removeClass("desktop");
        $("body").addClass("mobile");
        $(".desktop-only").css("display", "none");
        $(".mobile-only").css("display", "");
    }
    else {
        $("body").removeClass("mobile");
        $("body").addClass("desktop");
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

function rndRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
