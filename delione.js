
function leisti(event) {
    event.preventDefault();
}

function traukti(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.dropEffect = "move";
    let langelis = event.target.parentElement;
    langelis.classList.remove("pilnas");
}

function padetiIVieta(event) {
    event.preventDefault();
    console.log("dedam i vieta");
    let data = event.dataTransfer.getData("text");
    console.log("data: " + data);
    let detales = document.getElementById("detales");
    if (event.target.classList.contains("pilnas") || event.target.classList.contains("padetas")) {
        return;
    } else if (event.target.classList.contains("palaidas")) {
        detales.appendChild(document.getElementById(data));
        document.getElementById(data).classList.remove("padetas");
        document.getElementById(data).classList.add("palaidas");

    } else {
        event.target.appendChild(document.getElementById(data));

        if (!event.target.classList.contains("deze")) {
        event.target.classList.add("pilnas");
        document.getElementById(data).classList.add("padetas");
        document.getElementById(data).classList.remove("palaidas");
        } else {
        document.getElementById(data).classList.remove("padetas");
        document.getElementById(data).classList.add("palaidas");
        }
    }
}


function isdelioti() {
    let image = new Image();
    image.src = 'img/ramybe.jpg';
    let w = image.naturalWidth;
    let h = image.naturalHeight;
    let proporcija = w / h;
    let langelioPlotis = 50;
    let langeliuSk_W = 10;
    let langeliuSk_H = 10;
    let sideOffset = 10;
    let updownOffset = 10;
    if (proporcija > 1) {
        langelioPlotis = Math.floor((h - 20)/10);
        langeliuSk_W = Math.floor(w / langelioPlotis);
        sideOffset = Math.round((w % langelioPlotis) / 2);
    } else {
        langelioPlotis = Math.floor((w - 20)/10);
        langeliuSk_H = Math.floor(h / langelioPlotis);
        updownOffset = Math.round((h % langelioPlotis) / 2);
    };

    let k = 0;

    image.onload = function(){

        let darboStalas = document.getElementById("detales");
        let krepselis = [];
        for (i = 0; i < langeliuSk_H; i++){
            for (var j = 0; j < langeliuSk_W; j++) {
                let canvas = document.createElement("canvas");
                canvas.setAttribute("width", langelioPlotis);
                canvas.setAttribute("height", langelioPlotis);
                canvas.setAttribute("id", k);
                canvas.setAttribute("draggable", "true");
                canvas.setAttribute("ondragstart", "traukti(event)");
                canvas.classList.add("palaidas");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(image, sideOffset+langelioPlotis*j, updownOffset+langelioPlotis*i, langelioPlotis, langelioPlotis, 0, 0, langelioPlotis, langelioPlotis);
                krepselis[k] = canvas;
                k++;
            }
        };

        while (krepselis.length > 0) {
            let i = Math.floor(Math.random() * krepselis.length);
            let newCanvas = krepselis[i];
            darboStalas.appendChild(newCanvas);
            krepselis.splice(i, 1);
        };
    };
    document.getElementById('remas').style.width = langeliuSk_W * langelioPlotis + (sideOffset * 2) + "px";
    document.getElementById('remas').style.height = langeliuSk_H * langelioPlotis + (updownOffset * 2) + "px";
    document.getElementById('delione').style.width = langeliuSk_W * langelioPlotis + "px";
    document.getElementById('delione').style.height = langeliuSk_H * langelioPlotis + "px";
    document.getElementById('delione').style.top = updownOffset + "px";
    document.getElementById('delione').style.left = sideOffset + "px";
}

function paruostiStala() {
    let delione = document.getElementById("delione");
    let sk = document.getElementById("detales").getAttribute("value");
    console.log("detales: " + sk);
    for (let i = 0; i < 150; i++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "langelis");
            newDiv.setAttribute("ondrop", "padetiIVieta(event)");
            newDiv.setAttribute("ondragover", "leisti(event)");
            delione.appendChild(newDiv);
        }
}

function pradzia() {
    isdelioti();
    paruostiStala();
}

//
// $(document).ready(function(){
//     isdelioti();
//     paruostiStala();
// });
