//
// function leisti(event) {
//     event.preventDefault();
// }
//
// function traukti(event) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }
//
// function padetiIVieta(event) {
//     event.preventDefault();
//     var data = event.dataTransfer.getData("text");
//     event.target.appendChild(document.getElementById(data));
// }
//
// function atkirpti(image, x, y, plotis, aukstis) {
//
//     let canvas = document.createElement('canvas'),
//         ctx = canvas.getContext('2d');
//
//     canvas.width = plotis;
//     canvas.height = aukstis;
//     ctx.drawImage(image, x, y, plotis, aukstis);
//     return canvas;
// }
//
//
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
                newDiv.setAttribute("id", k);
                newDiv.setAttribute("class", "palaidas");
                let canvas = document.createElement("canvas");
                canvas.setAttribute("width", 50);
                canvas.setAttribute("height", 50);

                let ctx = canvas.getContext('2d');
                ctx.drawImage(image, 50*i, 50*j, 50, 50, 0, 0, 50, 50);
                newDiv.appendChild(canvas);
                krepselis[k] = newDiv;
                k++;
                // darboStalas.appendChild(newDiv);
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


$(document).ready(function(){
    $("h2").click(isdelioti());
});
