'use strict';

window.onload = function() {
    getRelevatControls();
    getData();
};

window.onresize = function() {
    getRelevatControls();
    adjustTiles();
};

function getData() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            window.data = JSON.parse(this.responseText);
            getData_Locally();
        }
    };
    xmlhttp.open('GET', 'http://www.honzachalupa.cz/dev/data/data.json', true);
    xmlhttp.send();
}

function getData_Locally() {
    let { data } = window, timeout = 0;

    if (data.length > 0) {
        let shuffledData = shuffleArray(data);
        let structuredData = structureItems(shuffledData);

        renderItems(structuredData);
        adjustTiles();
    }
    else if(timeout < 10) {
        timeout++;

        setTimeout(() => {
            getData_Locally();
        }, 200);
    }
    else
        alert(`Something really bad happened. I'm sorry. :(`);
}

function structureItems(items) {
    let itemsTemp = [];

    for (let item of items) {
        let type = item.Type;

        if (type === 'project')
            itemsTemp.push({
                id: `${item.Type}-${item.Id}`,
                type: 'item',
                tile: {
                    type: item.Type,
                    title: item.Title,
                    image: item.ImageUrl1
                },
                link: `detail.html?type=${item.Type}&id=${item.Id}`,
                dateCreated: item.DateCreated
            });
        else if (type === 'image')
            itemsTemp.push({
                id: `${item.Type}-${item.Id}`,
                type: 'item',
                tile: {
                    type: item.Type,
                    url: item.Url
                },
                link: `detail.html?type=${item.Type}&id=${item.Id}`,
                dateCreated: item.DateCreated
            });
        else if (type === 'tweet')
            itemsTemp.push({
                id: `${item.Type}-${item.Id}`,
                type: 'item',
                tile: {
                    type: item.Type,
                    text: item.Text
                },
                link: item.Url,
                dateCreated: item.DateCreated
            });
        else
            throw new Error(`Unknown tile type: ${item.Type}`);
    }

    for (let itemTemp of itemsTemp) {
        itemTemp.priority = getItemPriority(itemTemp);
    }

    let lowPriorItems = getLowPriorityItems(itemsTemp), groupedIds = [];

    if (lowPriorItems.length >= 4) {
        for (let i = 0; i < Math.floor(lowPriorItems.length / 4); i++) {
            groupedIds.push(
                lowPriorItems[i].id,
                lowPriorItems[i + 1].id,
                lowPriorItems[i + 2].id,
                lowPriorItems[i + 3].id
            );

            itemsTemp.push({
                type: 'items-group',
                items: [
                    lowPriorItems[i],
                    lowPriorItems[i + 1],
                    lowPriorItems[i + 2],
                    lowPriorItems[i + 3]
                ]
            });
        }
    }

    let itemsTemp2 = [];

    for (let itemTemp of itemsTemp)
        if (!itemTemp.id || groupedIds.indexOf(itemTemp.id) === -1)
            itemsTemp2.push(itemTemp);

    itemsTemp2 = shuffleArray(itemsTemp2);

    return itemsTemp2;
}

function renderItems(gridDefinition) {
    let html = '';

    for (let part of gridDefinition) {
        if (part.type === 'items-group') {
            html += '<div class="items-group">';

            for (let item of part.items)
                html += renderItemContent(item, 2);

            html += '</div>';
        }
        else {
            let item = part;

            html += renderItemContent(item, 1);
        }
    }

    document.querySelector('#grid-placeholder').innerHTML = html;

    adjustTiles();
    make3dEffect();
}

function renderItemContent(item, level) {
    let tile = item.tile, type = item.tile.type,
        html = `<a class="item level-${level} ${type}" href="${item.link}" label="${getTileLabel(type)}">`;

    if (type === 'project')
        html +=
            `<div class="image-container" style="background-image: url('${tile.image}')"></div>
            <p class='title'>${tile.title}</p>`;
    else if (type === 'image')
        html +=
            `<div class="image-container" style="background-image: url('${tile.url}')"></div>`;
    else if (type === 'tweet')
        html +=
            `<p class="text">${tile.text}</p>
            <div class="icon"></div>`;

    html += '</a>';

    return html;
}

function getItemPriority(item) {
    let mockDate = '2016-10-01';

    let daysFromToday = daysDiff(
        new Date(mockDate).getTime(),
        new Date().getTime()
    );

    let priority = (item.tile.type === 'project') ?  Math.floor(daysFromToday / 60) :  Math.ceil(daysFromToday / 20);

    if (item.tile.type === 'tweet' && item.tile.text.length < 50)
        priority = priority - 2;

    if (priority < 1)
        priority = 1;

    return priority;
}

function getLowPriorityItems(items) {
    let itemsTemp = [];

    for (let item of items)
        if (item.priority >= 3)
            itemsTemp.push(item);

    return itemsTemp;
}

function getTileLabel(tileType) {
    switch(tileType) {
        case 'project':
            return 'Show details';
        case 'image':
            return 'Show in gallery';
        case 'tweet':
            return 'Visit my Twitter page';
        default:
            return '';
    }
}

function adjustTiles() {
    let coef = window.innerHeight / (isMobile() ? 5 : 2),
        columns = Math.floor(window.innerWidth / coef);

    document.querySelectorAll('.items-group, .item.level-1').forEach(function (el) {
        el.style.flexBasis = `calc(100% / ${columns})`;
    });

    document.querySelectorAll('.item, .items-group').forEach(function (el) {
        el.style.height = el.offsetWidth + 'px'; //   ... / 3 * 2;
    });
}

function make3dEffect() {
    let i = 0;
    document.querySelectorAll('.grid > .item.tweet').forEach(function (el) {
        el.style.opacity = 1 - (i / 20);
        i++;

        if (i === 6) i = 0;
    });
}
