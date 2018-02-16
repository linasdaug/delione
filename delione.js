function Detale(k) {
    this.atvaizdas = document.createElement("canvas");
    this.atvaizdas.width = langelioPlotis + 20;
    this.atvaizdas.height = langelioAukstis + 20;
    this.atvaizdas.setAttribute("id", k);
    this.atvaizdas.setAttribute("draggable", "true");
    this.atvaizdas.setAttribute("ondragstart", "traukti(event)");
    this.atvaizdas.classList.add("palaidas");
}

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


/* FUNKCIJŲ PABAIGA */


let langelioPlotis = 60;
let langelioAukstis = 60;
let sideOffset = 10;  /*remelio plotis sonuose*/
let updownOffset = 10;  /*remelio plotis virsuje ir apacioje*/


function isdelioti(image) {

    let w = image.naturalWidth;
    let h = image.naturalHeight;
    let proporcija = w / h;
    let langeliuSk_W, langeliuSk_H;
    console.log(proporcija);

    if (proporcija <= 1) {
        image.width = langelioPlotis * 10 + 20;      /*10 langeliu ir remelis*/
        image.height = Math.round(image.width / proporcija);
        updownOffset = Math.round((image.height % langelioAukstis) / 2);   /*apskaiciuojam remelio ploti virsuj ir apacioj*/
        langeliuSk_W = 10;
        langeliuSk_H = Math.floor(image.height / langelioAukstis);

        if ((image.height % langelioAukstis) > 20) {                        /*langelio ir remelio aukscio nedidele korekcija, jeigu remelis storesnis negu 10px*/
            langelioAukstis += Math.round(((image.height % langelioAukstis) - 20) / langeliuSk_H);
            updownOffset = Math.round((image.height % langelioAukstis) / 2);
        }

        if ((image.height % langelioAukstis) <= 10) {                        /*langelio ir remelio aukscio nedidele korekcija, jeigu remelis plonesnis negu 5px*/
            langeliuSk_H--;
            langelioAukstis += Math.round(((image.height % langelioAukstis) + langelioAukstis - 20) / langeliuSk_H);
            updownOffset = Math.round((image.height % langelioAukstis) / 2);
        }



    } else {
        image.height = langelioAukstis * 10 + 20;
        image.width = Math.round(image.height * proporcija);
        sideOffset = Math.round((image.width % langelioPlotis) / 2);
        langeliuSk_H = 10;
        langeliuSk_W = Math.floor(image.width / langelioPlotis);

        if ((image.width % langelioPlotis) > 20) {                        /*langelio ir remelio aukscio nedidele korekcija*/
            langelioPlotis += Math.round(((image.height % langelioPlotis) - 20) / langeliuSk_H);
            sideOffset = Math.round((image.height % langelioPlotis) / 2);
        }

        if ((image.height % langelioPlotis) <= 10) {                        /*langelio ir remelio aukscio nedidele korekcija, jeigu remelis plonesnis negu 5px*/
            langeliuSk_W--;
            langelioPlotis += Math.round(((image.height % langelioPlotis) + langelioPlotis - 20) / langeliuSk_W);
            sideOffset = Math.round((image.height % langelioPlotis) / 2);
        }

    }

    console.log("plotis: " + image.width + " aukstis: " + image.height);


    let resize = w / image.width;   /* originali nuotrauka vis dar seno dydzio, reikalingas koeficientas perskaiciavimui*/

    let k = 0;

    let darboStalas = document.getElementById("detales");
    let rinkinys = [];

    for (i = 0; i < langeliuSk_H; i++){
        for (var j = 0; j < langeliuSk_W; j++) {
            let detale = new Detale(k);
            rinkinys.push(detale);

            rinkinys[k].sieneles = new Object();
            if (i == 0) {rinkinys[k].sieneles.s1 = 0} else if (rinkinys[k-langeliuSk_W].sieneles.s3 == 1) {rinkinys[k].sieneles.s1 = 2} else {rinkinys[k].sieneles.s1 = 1};
            if (j == langeliuSk_W - 1) {rinkinys[k].sieneles.s2 = 0} else {rinkinys[k].sieneles.s2 = Math.ceil(Math.random()*2)};
            if (i == langeliuSk_H - 1) {rinkinys[k].sieneles.s3 = 0} else {rinkinys[k].sieneles.s3 = Math.ceil(Math.random()*2)};
            if (j == 0) {rinkinys[k].sieneles.s4 = 0} else if (rinkinys[k-1].sieneles.s2 == 1) {rinkinys[k].sieneles.s4 = 2} else {rinkinys[k].sieneles.s4 = 1};

            let ctx = detale.atvaizdas.getContext('2d');

            let tempCanvas = document.createElement("canvas");
            tempCanvas.width = langelioPlotis + 20;
            tempCanvas.height = langelioAukstis + 20;
            let tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(image, Math.round(langelioPlotis*j*resize), Math.round(langelioAukstis*i*resize), Math.round(detale.atvaizdas.width*resize), Math.round(detale.atvaizdas.height*resize), 0, 0, detale.atvaizdas.width, detale.atvaizdas.height);
            let pattern = ctx.createPattern(tempCanvas, 'repeat');
            ctx.fillStyle = pattern;

            ctx.beginPath();
            ctx.moveTo(10, 10);
            let ikiArc = Math.round(langelioPlotis / 2) - 10;
            let ikiCen = Math.round(langelioPlotis / 2);
            let ikiArcH = Math.round(langelioAukstis / 2) - 10;
            let ikiCenH = Math.round(langelioAukstis / 2);
            let lp = 10 + langelioPlotis;
            let la = 10 + langelioAukstis;

            switch (rinkinys[k].sieneles.s1) {
                case 0:
                    ctx.lineTo(lp, 10);
                    break;
                case 1:
                    ctx.lineTo(10 + ikiArc, 10);
                    ctx.arc(10 + ikiCen, 10, 10, 1*Math.PI, 0);
                    ctx.lineTo(la, 10);
                    break
                case 2:
                    ctx.lineTo(10 + ikiArc, 10);
                    ctx.arc(10 + ikiCen, 10, 10, 1*Math.PI, 0, true);
                    ctx.lineTo(la, 10);
            }
            switch (rinkinys[k].sieneles.s2) {
                case 0:
                    ctx.lineTo(lp, la);
                    break;
                case 1:
                    ctx.lineTo(lp, 10 + ikiArc);
                    ctx.arc(lp, 10 + ikiCen, 10, 1.5*Math.PI, 0.5*Math.PI);
                    ctx.lineTo(lp, la);
                break
                case 2:
                    ctx.lineTo(lp, 10 + ikiArc);
                    ctx.arc(lp, 10 + ikiCen, 10, 1.5*Math.PI, 0.5*Math.PI, true);
                    ctx.lineTo(lp, la);
            }
            switch (rinkinys[k].sieneles.s3) {
                case 0:
                    ctx.lineTo(10, la);
                    break;
                case 1:
                    ctx.lineTo(lp - ikiArc, la);
                    ctx.arc(lp - ikiCen, lp, 10, 0, 1*Math.PI);
                    ctx.lineTo(10, la);
                    break
                case 2:
                    ctx.lineTo(lp - ikiArc, la);
                    ctx.arc(lp - ikiCen, la, 10, 0, 1*Math.PI, true);
                    ctx.lineTo(10, la);
            }
            switch (rinkinys[k].sieneles.s4) {
                case 0:
                    ctx.lineTo(10, 10);
                    break;
                case 1:
                    ctx.lineTo(10, la - ikiArc);
                    ctx.arc(10, la - ikiCen, 10, 0.5*Math.PI, 1.5*Math.PI);
                    ctx.lineTo(10, 10);
                    break
                case 2:
                    ctx.lineTo(10, la - ikiArc);
                    ctx.arc(10, la - ikiCen, 10, 0.5*Math.PI, 1.5*Math.PI, true);
                    ctx.lineTo(10, 10);
            }
                ctx.closePath();
                ctx.fill();
                k++;
        }
    };
        document.getElementById("detales").setAttribute("value", k);

        paruostiStala();
        while (rinkinys.length > 0) {
            let i = Math.floor(Math.random() * rinkinys.length);
            let newCanvas = rinkinys[i].atvaizdas;
            darboStalas.appendChild(newCanvas);
            rinkinys.splice(i, 1);
        };


    let remas = document.getElementById('remas');
    remas.style.width = langeliuSk_W * langelioPlotis + (sideOffset * 2) + "px";
    remas.style.height = langeliuSk_H * langelioAukstis + (updownOffset * 2) + "px";
    remas.setAttribute("src", image.src);

    let delione = document.getElementById('delione');

    delione.style.width = langeliuSk_W * langelioPlotis + "px";
    delione.style.height = langeliuSk_H * langelioAukstis + "px";
    delione.style.top = updownOffset + "px";
    delione.style.left = sideOffset + "px";

    document.getElementById('visa-nuotrauka').setAttribute("src", image.src);


}

function paruostiStala() {
    let delione = document.getElementById("delione");
    let sk = document.getElementById("detales").getAttribute("value");

    for (let i = 0; i < sk; i++) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "langelis");
            newDiv.setAttribute("ondrop", "padetiIVieta(event)");
            newDiv.setAttribute("ondragover", "leisti(event)");
            newDiv.setAttribute("style", "width: " + langelioPlotis + "px; height: " + langelioAukstis + "px");
            delione.appendChild(newDiv);
        }
}

function pradzia() {
    let image = new Image();
    image.src = 'img/drasa.jpg';
    image.onload = function(){
        isdelioti(image);
    }
}
