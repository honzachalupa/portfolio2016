function getData() {
    let type = /type=([^&]+)/.exec(window.location.href)[1];
    let id = /id=([^&]+)/.exec(window.location.href)[1];

    setTitle(type);

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.item = JSON.parse(this.responseText)[0];
            getData_Locally();
        }
    };

    xmlhttp.open("GET", `php/db_select.php?type=${type}&id=${id}`, true);
    xmlhttp.send();
}

function getData_Locally() {
    let { item } = window;

    if (item)
        renderItem(item);
    else
        setTimeout(() => { getData_Locally() }, 200);
}

function renderItem(item) {
    console.log(item);

    let html = "";

    if(item.Type == "project") {
        html += `<h2>${item.Title}</h2>`;

        if (item.Description)
            html += `<p>${item.Description}</p>`;

        for (let i = 0; i <= 10; i++) {
            let imageKey = "ImageUrl" + (i + 1);

            if (item[imageKey])
                html += `<img class="image" src="${item[imageKey]}" />`;
            else
                break;
        }
    }
    else if(item.Type == "image") {
        html += `<img class="image" src="${item.Url}" />`;

        if (item.Description)
            html += `<p>${item.Description}</p>`;
    }

    document.querySelector("#details-placeholder").innerHTML = html;
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
            break;
    }

    if (type) document.title = type + " - " + document.title;
}
