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
    // event.dataTransfer.setData("text", event.target.id);


/*insertas:*/
    let style = window.getComputedStyle(event.target, null);
    let str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY)+ ',' + event.target.id;
    event.dataTransfer.setData("Text",str);


    event.dataTransfer.dropEffect = "move";
    let langelis = event.target.parentElement;
    langelis.classList.remove("pilnas");
}

function padeti(event) {
    event.preventDefault();

    var offset = event.dataTransfer.getData("Text").split(',');
    var dm = document.getElementById(offset[2]);


    if (offset[2] == 'visa-nuotrauka') {
        dm.style.left = (event.clientX + parseInt(offset[0])) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1])) + 'px';
        event.preventDefault();
        return
    } else {
        return;
    }
}


function padetiIVieta(event) {
    event.preventDefault();

    // let data = event.dataTransfer.getData("text");
/*insertas:*/
    var offset = event.dataTransfer.getData("Text").split(',');
    var dm = document.getElementById(offset[2]);

    if (offset[2] == 'visa-nuotrauka') {
        return
    }

    let detales = document.getElementById("detales");

    if (event.target.classList.contains("pilnas") || event.target.classList.contains("padetas")) {
        return;
    } else if (event.target.classList.contains("palaidas")) {
        detales.appendChild(document.getElementById(offset[2]));     /*data*/
        document.getElementById(offset[2]).classList.remove("padetas");
        document.getElementById(offset[2]).classList.add("palaidas");

    } else {
        event.target.appendChild(document.getElementById(offset[2]));     /*data*/

        if (!event.target.classList.contains("deze")) {
        event.target.classList.add("pilnas");
        document.getElementById(offset[2]).classList.add("padetas");    /*data*/
        document.getElementById(offset[2]).classList.remove("palaidas");
        } else {
        document.getElementById(offset[2]).classList.remove("padetas");
        document.getElementById(offset[2]).classList.add("palaidas");
        }
    }
}
//
// function visa_nuotrauka_drag_start(event) {
//     let style = window.getComputedStyle(event.target, null);
//     let str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY)+ ',' + event.target.id;
//     event.dataTransfer.setData("Text",str);
// }
//
// function visa_nuotrauka_drop(event) {
//     var offset = event.dataTransfer.getData("Text").split(',');
//     console.log(offset);
//     var dm = document.getElementById(offset[2]);
//     dm.style.left = (event.clientX + parseInt(offset[0])) + 'px';
//     dm.style.top = (event.clientY + parseInt(offset[1])) + 'px';
//     event.preventDefault();
//     // return false;
// }
//
// function visa_nuotrauka_drag_over(event) {
//     event.preventDefault();
//     // return false;
// }
//

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
            tempCanvas.width = langelioPlotis + 16;  /* "liezuvelio" issikisimas x 2*/
            tempCanvas.height = langelioAukstis + 16;
            let tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(image, Math.round(langelioPlotis*j*resize), Math.round(langelioAukstis*i*resize), Math.round(detale.atvaizdas.width*resize), Math.round(detale.atvaizdas.height*resize), 0, 0, detale.atvaizdas.width, detale.atvaizdas.height);
            let pattern = ctx.createPattern(tempCanvas, 'repeat');
            ctx.fillStyle = pattern;



            // DETALES PIESINYS


            let ikiArc = Math.round(langelioPlotis / 2) - 10;
            let ikiCen = Math.round(langelioPlotis / 2);
            let ikiArcH = Math.round(langelioAukstis / 2) - 10;
            let ikiCenH = Math.round(langelioAukstis / 2);

            let ik = 8;                     /* "liezuvelio" issikisimas ir apskritimuko skersmuo*/
            let lx = ik + langelioPlotis;
            let ly = ik + langelioAukstis;
            let cx = ik + Math.round(langelioPlotis / 2);  /*liezuvelio apskritimo centras*/
            let cy = ik + Math.round(langelioAukstis / 2);



            ctx.beginPath();
            ctx.moveTo(ik, ik);

            switch (rinkinys[k].sieneles.s1) {
                case 0:
                    ctx.lineTo(lx, ik);
                    break;
                case 1:
                    ctx.arc(cx, ik, ik, 0.9*Math.PI, 0.1*Math.PI);
                    ctx.lineTo(lx, ik);
                    break
                case 2:
                    ctx.arc(cx, ik, ik, 1.1*Math.PI, 1.9*Math.PI, true);
                    ctx.lineTo(lx, ik);
            }
            switch (rinkinys[k].sieneles.s2) {
                case 0:
                    ctx.lineTo(lx, ly);
                    break;
                case 1:
                    ctx.arc(lx, cy, ik, 1.4*Math.PI, 0.6*Math.PI);
                    ctx.lineTo(lx, ly);
                break
                case 2:
                    ctx.arc(lx, cy, ik, 1.6*Math.PI, 0.4*Math.PI, true);
                    ctx.lineTo(lx, ly);
            }
            switch (rinkinys[k].sieneles.s3) {
                case 0:
                    ctx.lineTo(ik, ly);
                    break;
                case 1:
                    ctx.arc(cx, ly, ik, 1.9*Math.PI, 1.1*Math.PI);
                    ctx.lineTo(ik, ly);
                    break
                case 2:
                    ctx.arc(cx, ly, ik, 0.1*Math.PI, 0.9*Math.PI, true);
                    ctx.lineTo(ik, ly);
            }
            switch (rinkinys[k].sieneles.s4) {
                case 0:
                    ctx.lineTo(ik, ik);
                    break;
                case 1:
                    ctx.arc(ik, cy, ik, 0.5*Math.PI, 1.6*Math.PI);
                    ctx.lineTo(ik, ik);
                    break
                case 2:
                    ctx.arc(ik, cy, ik, 0.6*Math.PI, 1.4*Math.PI, true);
                    ctx.lineTo(ik, ik);
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

function pradzia(id) {



    let puslapis = document.getElementById("puslapis");   /* istrinam viska is puslapio ir pakraunam pasirinkta turini*/

    while (puslapis.firstChild) {
        puslapis.removeChild(puslapis.firstChild);
    }

    let im = document.createElement("img");
    im.setAttribute("class", "flyer");
    im.setAttribute("id", "visa-nuotrauka");

    let source = "";

    switch (id) {
        case 1:
            source = "img/katinas.jpg";
            break;
        case 2:
            source = "img/ramybe.jpg";
            break;
        case 3:
            source = "img/goddess.jpg";
            break;
        case 4:
            source = "img/lengvumas.jpg";
            break;
        case 5:
            source = "img/drasa.jpg";
            break;
        case 6:
            source = "img/siela.jpg";
            break;
    }


    im.setAttribute("src", source);
    im.setAttribute("alt", "no image");
    im.setAttribute("draggable", "true");
    im.setAttribute("ondragstart", "traukti(event)");
    puslapis.appendChild(im);

    let dezes = document.createElement("div");
    dezes.setAttribute("class", "dezes");
    puslapis.appendChild(dezes);

    let detales = document.createElement("div");
    detales.setAttribute("class", "deze");
    detales.setAttribute("id", "detales");
    detales.setAttribute("ondrop", "padetiIVieta(event)");
    detales.setAttribute("ondragover", "leisti(event)");
    dezes.appendChild(detales);

    let stalokonteineris = document.createElement("div");
    stalokonteineris.setAttribute("class", "stalas-container");
    stalokonteineris.setAttribute("id", "stalokonteineris");
    dezes.appendChild(stalokonteineris);

    let remas = document.createElement("img");
    remas.setAttribute("id", "remas");
    remas.setAttribute("src", "");
    stalokonteineris.appendChild(remas);

    let delione = document.createElement("div");
    delione.setAttribute("id", "delione");
    delione.setAttribute("class", "stalas");
    stalokonteineris.appendChild(delione);



    let image = new Image();
    image.src = source;
    image.onload = function(){
        isdelioti(image);
    }
}
