
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
    let data = event.dataTransfer.getData("text");
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
    image.src = 'img/goddess.jpg';
    let w = image.naturalWidth;
    let h = image.naturalHeight;
    let proporcija = w / h;
    let langelioPlotis = 60;
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
        let sieneles = {};

        for (i = 0; i < langeliuSk_H; i++){
            for (var j = 0; j < langeliuSk_W; j++) {
                sieneles[k] = new Object();
                if (i == 0) {sieneles[k].s1 = 0} else if (sieneles[k-langeliuSk_W].s3 == 1) {sieneles[k].s1 = 2} else {sieneles[k].s1 = 1};

                if (j == langeliuSk_W - 1) {sieneles[k].s2 = 0} else {sieneles[k].s2 = Math.ceil(Math.random()*2)};

                if (i == langeliuSk_H - 1) {sieneles[k].s3 = 0} else {sieneles[k].s3 = Math.ceil(Math.random()*2)};

                if (j == 0) {sieneles[k].s4 = 0} else if (sieneles[k-1].s2 == 1) {sieneles[k].s4 = 2} else {sieneles[k].s4 = 1};

                let canvas = document.createElement("canvas");
                canvas.width = langelioPlotis + 20;
                canvas.height = langelioPlotis + 20;
                canvas.setAttribute("id", k);
                canvas.setAttribute("draggable", "true");
                canvas.setAttribute("ondragstart", "traukti(event)");
                canvas.classList.add("palaidas");
                let ctx = canvas.getContext('2d');

                let tempCanvas = document.createElement("canvas");
                tempCanvas.width = langelioPlotis + 20;
                tempCanvas.height = langelioPlotis + 20;
                let tempCtx = tempCanvas.getContext('2d');
                tempCtx.drawImage(image, sideOffset-10+langelioPlotis*j, updownOffset-10+langelioPlotis*i, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

                let pattern = ctx.createPattern(tempCanvas, 'repeat');
                ctx.fillStyle = pattern;

                ctx.beginPath();
                ctx.moveTo(10, 10);
                let ikiArc = Math.round(langelioPlotis / 2) - 10;
                let ikiCen = Math.round(langelioPlotis / 2);
                let lp = 10 + langelioPlotis;

                switch (sieneles[k].s1) {
                    case 0:
                        ctx.lineTo(10 + langelioPlotis, 10);
                        break;
                    case 1:
                        ctx.lineTo(10 + ikiArc, 10);
                        ctx.arc(10 + ikiCen, 10, 10, 1*Math.PI, 0);
                        ctx.lineTo(lp, 10);
                        break
                    case 2:
                        ctx.lineTo(10 + ikiArc, 10);
                        ctx.arc(10 + ikiCen, 10, 10, 1*Math.PI, 0, true);
                        ctx.lineTo(lp, 10);
                }
                switch (sieneles[k].s2) {
                    case 0:
                        ctx.lineTo(lp, lp);
                        break;
                    case 1:
                        ctx.lineTo(lp, 10 + ikiArc);
                        ctx.arc(lp, 10 + ikiCen, 10, 1.5*Math.PI, 0.5*Math.PI);
                        ctx.lineTo(lp, lp);
                    break
                    case 2:
                        ctx.lineTo(lp, 10 + ikiArc);
                        ctx.arc(lp, 10 + ikiCen, 10, 1.5*Math.PI, 0.5*Math.PI, true);
                        ctx.lineTo(lp, lp);
                }
                switch (sieneles[k].s3) {
                    case 0:
                        ctx.lineTo(10, lp);
                        break;
                    case 1:
                        ctx.lineTo(lp - ikiArc, lp);
                        ctx.arc(lp - ikiCen, lp, 10, 0, 1*Math.PI);
                        ctx.lineTo(10, lp);
                        break
                    case 2:
                        ctx.lineTo(lp - ikiArc, lp);
                        ctx.arc(lp - ikiCen, lp, 10, 0, 1*Math.PI, true);
                        ctx.lineTo(10, lp);
                }
                switch (sieneles[k].s4) {
                    case 0:
                        ctx.lineTo(10, 10);
                        break;
                    case 1:
                        ctx.lineTo(10, lp - ikiArc);
                        ctx.arc(10, lp - ikiCen, 10, 0.5*Math.PI, 1.5*Math.PI);
                        ctx.lineTo(10, 10);
                        break
                    case 2:
                        ctx.lineTo(10, lp - ikiArc);
                        ctx.arc(10, lp - ikiCen, 10, 0.5*Math.PI, 1.5*Math.PI, true);
                        ctx.lineTo(10, 10);
                }
                    ctx.closePath();
                    ctx.fill();

                krepselis[k] = canvas;
                k++;
            }
        };
        document.getElementById("detales").setAttribute("value", k);
        paruostiStala();
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

    for (let i = 0; i < sk; i++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "langelis");
            newDiv.setAttribute("ondrop", "padetiIVieta(event)");
            newDiv.setAttribute("ondragover", "leisti(event)");
            delione.appendChild(newDiv);
        }
}

function pradzia() {
    isdelioti();
}
