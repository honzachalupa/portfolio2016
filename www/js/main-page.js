$("document").ready(function() {
    adjustTiles();
});

$(window).resize(function() {
    adjustTiles();
});

function getData() {
    let xmlhttp = new XMLHttpRequest();
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
    let { data } = window,
        timeout = 0;

    if (data.length > 0) {
        let shuffledData = shuffleArray(data);
        let structuredData = structureItems(shuffledData);

        renderItems(structuredData);
        adjustTiles();
    }
    else if(timeout < 10) {
        timeout++;

        setTimeout(() => { getData_Locally() }, 200);
    }
    else
        alert("Something really bad happened. I'm sorry. :(");
}

function structureItems(items) {
    let itemsTemp = [];

    for (let i in items) {
        let item = items[i],
            type = item.Type;

        if (type == "project")
            itemsTemp.push({
                type: "item",
                tile: {
                    type: item.Type,
                    title: item.Title,
                    image: item.ImageUrl1
                },
                link: `detail.html?type=${item.Type}&id=${item.Id}`
            });
        else if (type == "image")
            itemsTemp.push({
                type: "item",
                tile: {
                    type: item.Type,
                    url: item.Url
                },
                link: `detail.html?type=${item.Type}&id=${item.Id}`
            });
        else if (type == "tweet")
            itemsTemp.push({
                type: "item",
                tile: {
                    type: item.Type,
                    text: item.Text
                },
                link: item.Url
            });
        else
            throw new Error(`Unknown tile type: ${item.Type}`);
    }

    return itemsTemp;
}

function renderItems(gridDefinition) {
    let html = "";

    for (let i in gridDefinition) {
        let part = gridDefinition[i];

        if (part.type == "items-group") {
            html += "<div class='items-group'>";

            for (let j in part.items) {
                let item = part.items[j];

                html += renderItemContent(item, 2);
            }

            html += "</div>";
        }
        else {
            let item = part;

            html += renderItemContent(item, 1);
        }
    }

    document.querySelector(".render-target").innerHTML = html;
}

function renderItemContent(item, level) {
    let tile = item.tile,
        type = item.tile.type;

    let html = `<a class="item level-${level} ${type}" href="${item.link}" label="${getTileLabel(type)}">`;

    if (type == "project")
        html +=
            `<div class="image-container" style="background-image: url('${tile.image}')"></div>
            <p class='title'>${tile.title}</p>`;
    else if (type == "image")
        html +=
            `<div class="image-container" style="background-image: url('${tile.url}')"></div>`;
    else if (type == "tweet")
        html +=
            `<p class="text">${tile.text}</p>
            <div class='icon'></div>`;

    html += "</a>";

    return html;
}

function getTileLabel(tileType) {
    switch(tileType) {
        case "project":
            return "Show detail";
        case "image":
            return "Show in gallery";
        case "tweet":
            return "Visit my Twitter page";
        default:
            return "";
    }
}

function adjustTiles() {
    console.log("y");
    let rows = 3;
    let coef = $(window).height() / rows;
    let columns = Math.floor(($(window).width() - $(".side").width()) / coef);

    $("div.items-group, a.item.level-1").css("flex-basis", `calc(100% / ${columns})`);

    $(".item, .items-group").each(function() {
        $(this).height($(this).width()); //    ... / 3 * 2
    });
}

function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
