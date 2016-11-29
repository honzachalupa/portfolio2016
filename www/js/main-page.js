window.onresize = function() {
    adjustTiles();
};

function getData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.data = JSON.parse(this.responseText);
            getData_Locally();
        }
    };
    xmlhttp.open("GET", "http://www.honzachalupa.cz/dev/data/data.json", true);
    xmlhttp.send();
}

function getData_Locally() {
    var data = window.data;
    var timeout = 0;

    if (data.length > 0) {
        var shuffledData = shuffleArray(data);
        var structuredData = structureItems(shuffledData);

        renderItems(structuredData);
        adjustTiles();
    }
    else if(timeout < 10) {
        timeout++;

        setTimeout(function() {
            getData_Locally()
        }, 200);
    }
    else
        alert("Something really bad happened. I'm sorry. :(");
}

function structureItems(items) {
    var itemsTemp = [];

    for (var i in items) {
        var item = items[i];

        if (item.Type == "project") {
            itemsTemp.push({
                type: "item",
                tile: {
                    type: item.Type,
                    title: item.Title,
                    image: item.ImageUrl1
                },
                link: "pages/detail.html?type=" + item.Type + "&id=" + item.Id
            });
        }
        else if (item.Type == "image") {
            itemsTemp.push({
                type: "item",
                tile: {
                    type: item.Type,
                    url: item.Url
                },
                link: "pages/detail.html?type=" + item.Type + "&id=" + item.Id
            });
        }
        else if (item.Type == "tweet") {
            itemsTemp.push({
                type: "item",
                tile: {
                    type: item.Type,
                    text: item.Text
                },
                link: item.Url
            });
        }
        else
            throw new Error("Unknown tile type: " + item.Type);
    }

    return itemsTemp;
}

function renderItems(gridDefinition) {
    var html = "";

    for (var i in gridDefinition) {
        var part = gridDefinition[i];

        if (part.type == "items-group") {
            html += "<div class='items-group'>";

            for (var j in part.items) {
                var item = part.items[j];

                html += renderItemContent(item, 2);
            }

            html += "</div>";
        }
        else {
            var item = part;

            html += renderItemContent(item, 1);
        }
    }

    document.querySelector(".render-target").innerHTML = html;
}

function renderItemContent(item, level) {
    var tile = item.tile,
        type = item.tile.type;

    var html = "<a class='item level-" + level + " " + type + "' href='" + item.link + "'>";

    if (type == "project")
        html +=
            "<div class='image-container' style='background-image: url(" + tile.image + ")'></div>" +
            "<p class='title'>" + tile.title + "</p>";
    else if (type == "image")
        html +=
            "<div class='image-container' style='background-image: url(" + tile.url + ")'></div>";
    else if (type == "tweet")
        html +=
            "<p class='text'>" + item.text + "</p>" +
            "<div class='icon'></div>";

    html += "</a>";

    return html;
}

function adjustTiles() {
    var rows = 4;
    var coef = $(window).height() / rows;
    var columns = Math.floor(($(window).width() - $(".side").width()) / coef);

    $("div.items-group, a.item.level-1").css("flex-basis", "calc(100% / " + columns + ")");

    $(".item, .items-group").each(function() {
        $(this).height($(this).width()); //    ... / 3 * 2
    });
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
