getData();

$("h2 li").each(function() {
    $(this).css("border-color", "rgb(" + rndRange(0, 255) + ", " + rndRange(0, 255) + ", " + rndRange(0, 255) + ")");
});

window.onresize = function() {
    adjustCells();
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

    if (data.length > 0) {
        var shuffledData = shuffleArray(data);
        var structuredData = structureItems(shuffledData);

        renderItems(structuredData);
        adjustCells();
    }
    else {
        setTimeout(function() {
            getData_Locally()
        }, 200);
    }
}

function structureItems(items) {
    var itemsTemp = [];

    for (var i in items) {
        var item = items[i];

        if(item.Type == "project") {
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
        else if(item.Type == "image") {
            itemsTemp.push({
                type: "item",
                tile: {
                    type: item.Type,
                    url: item.Url
                },
                link: "pages/detail.html?type=" + item.Type + "&id=" + item.Id
            });
        }
        else if(item.Type == "tweet") {
            itemsTemp.push({
                type: "item",
                tile: {
                    type: item.Type,
                    text: item.Text
                },
                link: item.Url
            });
        }
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
    console.log(item);

    var tile = item.tile,
        type = item.tile.type;

    var html = "<a class='item level-" + level + " " + type + "' href='" + item.link + "'>";

        if (type == "project") {
            html +=
                "<div class='image-container' style='background-image: url(" + tile.image + ")'></div>" +
                "<p class='title'>" + tile.title + "</p>";
        }
        else if (type == "image") {
            html +=
                "<div class='image-container' style='background-image: url(" + tile.url + ")'></div>";
        }
        else if (type == "tweet") {
            html +=
                "<p class='text'>" + item.text + "</p>" +
                "<div class='icon'></div>";
        }

    html += "</a>";

    return html;
}

function rnd() {
    return Math.ceil(Math.random() * 10);
}

function adjustCells() {
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

function rndRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleSidePanel() {
    var panel = $(".side");

    if (panel.hasClass("opened") == false) {

        panel.addClass("opened");
        panel.removeClass("closed");
    }
    else {
        panel.addClass("closed");
        panel.removeClass("opened");
    }
}

/*var gridDefinition = [
    {
        type: "item",
        content: {
            type: "tweet",
            value: {
                headline: "title",
                text: "text"
            }
        },
        link: "#"
    },
    {
        type: "items-group",
        items: [
            {
                type: "item",
                content: {
                    type: "image",
                    url: "https://www.seeklogo.net/wp-content/uploads/2014/12/twitter-logo-vector-download.jpg"
                },
                link: "#"
            },
            {
                type: "item",
                content: {
                    type: "tweet",
                    value: {
                        headline: "headline",
                        text: "text"
                    }
                },
                link: "#"
            }
        ]
    },
    {
        type: "item",
        content: {
            type: "project",
            title: "title",
            image: "https://www.seeklogo.net/wp-content/uploads/2014/12/twitter-logo-vector-download.jpg"
        },
        link: "#"
    },
    {
        type: "items-group",
        items: [
            {
                type: "item",
                content: {
                    type: "tweet",
                    value: {
                        headline: "headline",
                        text: "text"
                    }
                },
                link: "#"
            },
            {
                type: "item",
                content: {
                    type: "image",
                    url: "https://www.seeklogo.net/wp-content/uploads/2014/12/twitter-logo-vector-download.jpg"
                },
                link: "#"
            }
        ]
    }
];*/
