console.log("CHECL");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 150, 75);

ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

// ctx.beginPath();
// ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.stroke();

// ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);

ctx.font = "30px Arial";
ctx.strokeText("Hello World", 10, 50);

ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("Hello World", canvas.width/2, canvas.height/2);

document.onmousedown = (event) => {
    console.log("AY",event);
    console.log("dasds");
    document.onmousemove = (event) => {
        console.log(event);
        let x  = canvas.width + event.pageX;
        let y = canvas.height + event.pageY;
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y + 1);
        ctx.stroke();
            // xcoor = event.pageX;
            // ycoor = event.pageY;
            // mapcan.fillStyle = "#000000";
            // mapcan.fillRect(-1*(11617845.3461), -1*(8093417.14653), 10, 10);
        }
}

document.onmouseup = () => {
    console.log("sadas");
}