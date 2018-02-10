
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
    console.log("deliojam");
    let image  = new Image();
    image.onload = function(){
        let k = 0;
        let darboStalas = document.getElementById("detales");
        let krepselis = [];
        for(i = 0; i < 10; i++){
            for (var j = 0; j < 10; j++) {
                let canvas = document.createElement("canvas");
                canvas.setAttribute("width", 50);
                canvas.setAttribute("height", 50);
                canvas.setAttribute("id", k);
                canvas.setAttribute("draggable", "true");
                canvas.setAttribute("ondragstart", "traukti(event)");
                canvas.classList.add("palaidas");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(image, 10+50*j, 10+50*i, 50, 50, 0, 0, 50, 50);
                krepselis[k] = canvas;
                k++;
            }
        };

        while (krepselis.length > 0) {
            let i = Math.floor(Math.random() * krepselis.length);
            let newCanvas = krepselis[i];
            darboStalas.appendChild(newCanvas);
            krepselis.splice(i, 1);
        }
    };
      image.src = 'img/goddess.jpg';
}

function paruostiStala() {
    let k = 0;
    let delione = document.getElementById("delione");
    for(i = 0; i < 10; i++){
        for (var j = 0; j < 10; j++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("value", k);
            newDiv.setAttribute("class", "langelis");
            newDiv.setAttribute("ondrop", "padetiIVieta(event)");
            newDiv.setAttribute("ondragover", "leisti(event)");
            delione.appendChild(newDiv);
            k++;
        }
    }
}



$(document).ready(function(){
    isdelioti();
    paruostiStala();
});
