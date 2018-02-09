
function leisti(event) {
    console.log("leidziam");
    event.preventDefault();
}

function traukti(event) {
    console.log("traukiam");
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.dropEffect = "move";
}

function padetiIVieta(event) {
    event.preventDefault();
    console.log("dedam i vieta");
    var data = event.dataTransfer.getData("text");
    console.log(data);
    event.target.appendChild(document.getElementById(data));
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
                let newDiv = document.createElement("div");
                // newDiv.setAttribute("id", k);
                newDiv.setAttribute("class", "palaidas");
                // newDiv.setAttribute("draggable", "true");
                // newDiv.setAttribute("ondragstart", "traukti(event)");
                let canvas = document.createElement("canvas");
                canvas.setAttribute("width", 50);
                canvas.setAttribute("height", 50);
                canvas.setAttribute("id", k);
                canvas.setAttribute("draggable", "true");
                canvas.setAttribute("ondragstart", "traukti(event)");
                let ctx = canvas.getContext('2d');
                ctx.drawImage(image, 50*i, 50*j, 50, 50, 0, 0, 50, 50);
                newDiv.appendChild(canvas);
                krepselis[k] = newDiv;
                k++;
            }
        };

        while (krepselis.length > 0) {
            let i = Math.floor(Math.random() * krepselis.length);
            let newDiv = krepselis[i];
            darboStalas.appendChild(newDiv);
            krepselis.splice(i, 1);
        }
    };
      image.src = 'goddess.jpg';
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
