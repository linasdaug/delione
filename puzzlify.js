function Detale(k) {
    this.atvaizdas = document.createElement("canvas");
    this.atvaizdas.width = langelioPlotis + 20;
    this.atvaizdas.height = langelioAukstis + 20;
    this.atvaizdas.setAttribute("id", k);
    this.atvaizdas.classList.add("padetas");
    this.koordX = 0;
    this.koordY = 0;
    this.resize = 1;
    this.langelioPlotis = 60;
    this.langelioAukstis = 60;
}

Detale.prototype.susitraukia = function(image, ratio) {

    let ctx = this.atvaizdas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, 80, 80);

    ctx.scale(ratio, ratio);
    ctx.rotate(100*(1-ratio)/2*Math.PI/180)
    this.nupiesti(image, ctx, this.langelioPlotis, this.langelioAukstis);
    ctx.restore();

}

Detale.prototype.padideja = function(image, ratio) {

    let ctx = this.atvaizdas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, 80, 80);

    ctx.scale(ratio, 1);

    // ctx.rotate(100*(1-ratio)/2*Math.PI/180)
    this.nupiesti(image, ctx, this.langelioPlotis, this.langelioAukstis);
    ctx.restore();

}


Detale.prototype.plast = function(image, phase) {

    let ctx = this.atvaizdas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, 80, 80);

    switch (phase) {
        case 0:
        ctx.transform(1, 0, 0, 1, 0, 0);
            break;
        case 1:
        ctx.transform(1, 0, 0, 1, 3, 0);
            break;
        case 2:
        ctx.transform(1, 0, 0, 1, 6, 0);
    }

    this.nupiesti(image, ctx, this.langelioPlotis, this.langelioAukstis);
    ctx.restore();

}


function efektas5 (rinkinys, image, image_next) {
    let scaleRatio, direction, phase;
    let img = image;
    let krepselis = [];

    for (let j = 0; j < rinkinys.length; j++) {
        krepselis[j] = j;
    }

    let detaliuSkaicius = krepselis.length;

    let int0 = setInterval(function(){
        scaleRatio = 1;
        direction = 1;
        phase = 0;
            if (detaliuSkaicius >= 0) {
                let r = Math.floor(Math.random() * (krepselis.length-1));
                console.log("isimam " + krepselis[r]);

                let int = setInterval(function(){
                    phase++;
                    if (phase == 1) {scaleRatio = 1.1};
                    if (phase == 2) {scaleRatio = 1.15; img = image_next};
                    if (phase == 3) {scaleRatio = 1.1};
                    if (phase == 4) {scaleRatio = 1; clearInterval(int)};
                    rinkinys[krepselis[r]].padideja(img, scaleRatio);
                }, 15);
                detaliuSkaicius--;

                krepselis.splice(r, 1);
                console.log(krepselis.length);
                if (detaliuSkaicius == 0) {
                    clearInterval(int0);
                    console.log("Int0 sustabdytas");
                    return};

            }

    }, 75);
}





function efektas4 (rinkinys, image, image_next, eil, stulp) {
    let scaleRatio = 1;
    let direction = 1;
    let i = -1;
    let phase = 0;
    let img = image;
    let x = 0;

    let int0 = setInterval(function(){
        scaleRatio = 1;
        direction = 1;
        phase = 0;
        if (i >= eil + stulp) {clearInterval(int0); return};
        let int = setInterval(function(){
            phase++;
            if (phase == 1) {scaleRatio = 1.1};
            if (phase == 2) {scaleRatio = 1.15; img = image_next};
            if (phase == 3) {scaleRatio = 1.1};
            if (phase == 4) {scaleRatio = 1, clearInterval(int)};

            for (let j = 0; j < eil; j++) {
                if (((i - j) >= 0) && ((i - j) < stulp)) {
                    rinkinys[i + j * stulp - j].padideja(img, scaleRatio);
                }
            };

        }, 20)
            i++;
    }, 100);
}



function efektas3 (rinkinys, image, eil, stulp) {
    let scaleRatio = 1;
    let direction = 1;
    let i = 0;
    let phase = 0;

    let int0 = setInterval(function(){
        scaleRatio = 1;
        direction = 1;
        phase = 0;
        if (i == eil + stulp) {clearInterval(int0); return};
        let int = setInterval(function(){
            phase++;
            if (phase == 1) {scaleRatio = 1.1};
            if (phase == 2) {scaleRatio = 1.15};
            if (phase == 3) {scaleRatio = 1.1};
            if (phase == 4) {scaleRatio = 1, clearInterval(int)};

            for (let j = 0; j < eil; j++) {
                if (((i - j) >= 0) && ((i - j) < stulp)) {
                    rinkinys[i + j * stulp - j].padideja(image, scaleRatio);
                }
            }


        }, 20)
            i++;
            console.log("laikas eina");
    }, 100);
}


function efektas2(rinkinys, image, eil, stulp) {
    let phase = 0;
    let direction = 0;
    let i = 0;
    let int0 = setInterval(function(){
        phase = 0;
        if (i == stulp + eil - 1) {clearInterval(int0); return};
        let int = setInterval(function(){
            phase++;
            if (phase > 2) {phase = 0};

            if (phase == 2) {direction = 1};
            if (phase == 0) {clearInterval(int)};

            for (let j = 0; j < eil; j++) {
                if (((i - j) >= 0) && ((i - j) < stulp)) {
                    rinkinys[i + j * stulp - j].plast(image, phase);
                }
            }
        }, 15)
            i++;
    }, 100);
}





function efektas1(rinkinys, image) {

    let scaleRatio = 1;
    let direction = 0;
    let i = 0;


    let int0 = setInterval(function(){
        scaleRatio = 1;
        direction = 0;

        if (i == rinkinys.length - 1) {clearInterval(int0); return};

        let int = setInterval(function(){
            if (direction) {
                scaleRatio += 0.1;
            } else {
                scaleRatio -= 0.1;
            }

            if (scaleRatio < 0.85) {direction = 1};
            if (scaleRatio == 1 && direction) {clearInterval(int)};

            rinkinys[i].susitraukia(image, scaleRatio);

        }, 30)
            i++;
    }, 180);

}


Detale.prototype.nupiesti = function (image, ctx, langelioPlotis, langelioAukstis){

    let i = this.koordX;
    let j = this.koordY;
    let resize = this.resize;



    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = langelioPlotis + 16;  /* "liezuvelio" issikisimas x 2*/
    tempCanvas.height = langelioAukstis + 16;
    let tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(image, Math.round(langelioPlotis*j*resize), Math.round(langelioAukstis*i*resize), Math.round(this.atvaizdas.width*resize), Math.round(this.atvaizdas.height*resize), 0, 0, this.atvaizdas.width, this.atvaizdas.height);
    let pattern = ctx.createPattern(tempCanvas, 'repeat');
    ctx.fillStyle = pattern;



                // DETALES PIESINYS


    let ikiArc = Math.round(langelioPlotis / 2) - 8;
    let ikiCen = Math.round(langelioPlotis / 2);
    let ikiArcH = Math.round(langelioAukstis / 2) - 8;
    let ikiCenH = Math.round(langelioAukstis / 2);

    let ik = 8;                     /* "liezuvelio" issikisimas ir apskritimuko skersmuo*/
    let lx = ik + langelioPlotis;
    let ly = ik + langelioAukstis;
    let cx = ik + Math.round(langelioPlotis / 2);  /*liezuvelio apskritimo centras*/
    let cy = ik + Math.round(langelioAukstis / 2);


    ctx.beginPath();
    ctx.moveTo(ik, ik);

    switch (this.sieneles.s1) {
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
    switch (this.sieneles.s2) {
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
    switch (this.sieneles.s3) {
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
    switch (this.sieneles.s4) {
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
}



let langelioPlotis = 60;
let langelioAukstis = 60;
let sideOffset = 0;  /*remelio plotis sonuose*/
let updownOffset = 0;  /*remelio plotis virsuje ir apacioje*/

/*sioje delioneje remelis nenaudojamas*/



function isdelioti(image) {

    let w = image.naturalWidth;
    let h = image.naturalHeight;
    let proporcija = w / h;
    let langeliuSk_W, langeliuSk_H;

    if (proporcija <= 1) {
        image.width = langelioPlotis * 10 + sideOffset;      /*10 langeliu ir remelis*/
        image.height = Math.round(image.width / proporcija);
        // updownOffset = Math.round((image.height % langelioAukstis) / 2);   /*apskaiciuojam remelio ploti virsuj ir apacioj*/
        langeliuSk_W = 10;
        langeliuSk_H = Math.floor(image.height / langelioAukstis);



    } else {
        image.height = langelioAukstis * 10 + updownOffset;
        image.width = Math.round(image.height * proporcija);
        // sideOffset = Math.round((image.width % langelioPlotis) / 2);
        langeliuSk_H = 10;
        langeliuSk_W = Math.floor(image.width / langelioPlotis);

    }


    let resize = w / image.width;   /* originali nuotrauka vis dar seno dydzio, reikalingas koeficientas perskaiciavimui*/

    let k = 0;

    let darboStalas = document.getElementById("detales");
    let rinkinys = [];

    for (i = 0; i < langeliuSk_H; i++){
        for (var j = 0; j < langeliuSk_W; j++) {
            let detale = new Detale(k);
            rinkinys.push(detale);
            detale.koordX = i;
            detale.koordY = j;
            detale.resize = resize;
            rinkinys[k].sieneles = new Object();
            if (i == 0) {rinkinys[k].sieneles.s1 = 0} else if (rinkinys[k-langeliuSk_W].sieneles.s3 == 1) {rinkinys[k].sieneles.s1 = 2} else {rinkinys[k].sieneles.s1 = 1};
            if (j == langeliuSk_W - 1) {rinkinys[k].sieneles.s2 = 0} else {rinkinys[k].sieneles.s2 = Math.ceil(Math.random()*2)};
            if (i == langeliuSk_H - 1) {rinkinys[k].sieneles.s3 = 0} else {rinkinys[k].sieneles.s3 = Math.ceil(Math.random()*2)};
            if (j == 0) {rinkinys[k].sieneles.s4 = 0} else if (rinkinys[k-1].sieneles.s2 == 1) {rinkinys[k].sieneles.s4 = 2} else {rinkinys[k].sieneles.s4 = 1};

            let ctx = detale.atvaizdas.getContext('2d');
            detale.nupiesti(image, ctx, langelioPlotis, langelioAukstis);
            k++;
        }
    }

    document.getElementById("detales").setAttribute("value", k);

    paruostiStala(rinkinys, image, langeliuSk_H, langeliuSk_W);


    let remas = document.getElementById('remas');
    remas.style.width = langeliuSk_W * langelioPlotis + (sideOffset * 2) + "px";
    remas.style.height = langeliuSk_H * langelioAukstis + (updownOffset * 2) + "px";
    remas.setAttribute("src", "img/remas.jpg");

    let delione = document.getElementById('delione');

    delione.style.width = langeliuSk_W * langelioPlotis + "px";
    delione.style.height = langeliuSk_H * langelioAukstis + "px";
    // delione.style.top = updownOffset + "px";
    // delione.style.left = sideOffset + "px";


}

function paruostiStala(rinkinys, image, eilutes, stulpeliai) {
    let delione = document.getElementById("delione");
    let sk = document.getElementById("detales").getAttribute("value");
    let image_next = new Image();
    image_next.src = "img/venecija.jpg";

    for (let i = 0; i < sk; i++) {
            let newDiv = document.createElement("div");
            newDiv.appendChild(rinkinys[i].atvaizdas);
            newDiv.setAttribute("class", "langelis");
            newDiv.setAttribute("id", "langelis" + i);
            // newDiv.setAttribute("ondrop", "padetiIVieta(event)");
            // newDiv.setAttribute("ondragover", "leisti(event)");
            newDiv.setAttribute("style", "width: " + langelioPlotis + "px; height: " + langelioAukstis + "px");
            delione.appendChild(newDiv);

        }
        document.getElementById('langelis0').addEventListener("click", function(){
            efektas4(rinkinys, image, image_next, eilutes, stulpeliai);
        });
}


function pradzia() {

    let puslapis = document.getElementById("puslapis");   /* istrinam viska is puslapio ir pakraunam pasirinkta turini*/

    while (puslapis.firstChild) {
        puslapis.removeChild(puslapis.firstChild);
    }


    let source = "img/neuschwanstein.jpg";


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
