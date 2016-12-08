window.onload = function() {
    getRelevatControls();

    document.querySelectorAll(".about-tags li").forEach(function (el) {
        el.style.borderColor = `rgb(${rndRange(0, 255)}, ${rndRange(0, 255)}, ${rndRange(0, 255)})`;
    });

    /*$(".about-tags li").each(function() {
        $(this).css("border-color", `rgb(${rndRange(0, 255)}, ${rndRange(0, 255)}, ${rndRange(0, 255)})`);
    });*/

    document.querySelectorAll(".about-tags span").forEach(function (el) {
        el.style.color = `rgb(${rndRange(0, 255)}, ${rndRange(0, 255)}, ${rndRange(0, 255)})`;
    });

    /*$(".about-tags span").each(function() {
        $(this).css("color", `rgb(${rndRange(0, 255)}, ${rndRange(0, 255)}, ${rndRange(0, 255)})`);
    });*/

    document.querySelectorAll(".nav a").forEach(function (el) {
        if (el.dataset.page == document.getElementsByTagName("body")[0].getAttribute("id"))
            el.classList.add("active");
    });

    /*$(".nav a").each(function() {
        if ($(this).attr("data-page") == $("body").attr('id'))
            $(this).addClass("active");
    });*/

    getData();
};

window.onresize = function() {
    getRelevatControls();
};

function getRelevatControls() {
    if (isMobile()) {
        toggleSidePanel(true);

        /*$("body").removeClass("desktop");
        $("body").addClass("mobile");
        $(".desktop-only").css("display", "none");
        $(".mobile-only").css("display", "");*/

        document.querySelector("body").classList.remove("desktop");
        document.querySelector("body").classList.add("mobile");
        document.querySelector(".desktop-only").style.display = "none";
        document.querySelector(".mobile-only").style.display = null;
    }
    else {
        /*$("body").removeClass("mobile");
        $("body").addClass("desktop");
        $(".desktop-only").css("display", "");
        $(".mobile-only").css("display", "none");*/

        document.querySelector("body").classList.remove("mobile");
        document.querySelector("body").classList.add("desktop");
        document.querySelector(".desktop-only").style.display = null;
        document.querySelector(".mobile-only").style.display = "none";
    }
}

function isMobile() {
    return window.innerWidth <= 700;
}

function toggleSidePanel(force = false) {
    //let panel = $(".side-panel");
    let panel = document.querySelector(".side-panel");

    /*if (panel.hasClass("opened") == true || force) {
        panel.removeClass("opened");
        panel.addClass("closed");

        $(".grid").css({"filter": "blur(0)"});
    }
    else {
        panel.removeClass("closed");
        panel.addClass("opened");

        $(".grid").css({"filter": "blur(20px)"});
    }*/

    if (panel.classList.contains("opened") || force) {
        panel.classList.remove("opened");
        panel.classList.add("closed");

        document.querySelector(".grid").style.filter = "blur(0)";
    }
    else {
        panel.classList.remove("closed");
        panel.classList.add("opened");

        document.querySelector(".grid").style.filter = "blur(10px)";
    }
}

function rndRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
