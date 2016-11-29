function getData() {
    var type = /type=([^&]+)/.exec(window.location.href)[1];
    var id = /id=([^&]+)/.exec(window.location.href)[1];

    setTitle(type);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.item = JSON.parse(this.responseText)[0];
            getData_Locally();
        }
    };

    xmlhttp.open("GET", "../php/db_select.php?type=" + type + "&id=" + id, true);
    xmlhttp.send();
}

function getData_Locally() {
    var item = window.item;

    if (item) {
        renderItem(item);
    }
    else {
        setTimeout(function() {
            getData_Locally()
        }, 200);
    }
}

function renderItem(item) {
    console.log(item);

    var html = "";

    if(item.Type == "project") {
        html +=
            "<h2>" + item.Title + "</h2>" +
            "<p>" + item.Description + "</p>";

        for (var i = 0; i <= 10; i++) {
            var imageKey = "ImageUrl" + (i + 1);

            if (item[imageKey])
                html += "<img class='image' src='" + item[imageKey] + "' />";
            else
                break;
        }
    }
    else if(item.Type == "image") {
        html +=
            "<img class='image' src='" + item.Url + "' />" +
            "<p>" + item.Description + "</p>";
    }

    document.querySelector(".render-target").innerHTML = html;
}

function setTitle(type) {
    switch(type) {
        case "project":
            type = "Project";
            break;
        case "image":
            type = "Gallery";
            break;
        default:
            type = null;
    }

    console.log(type);

    if (type)
        document.title = type + " - " + document.title;
}
