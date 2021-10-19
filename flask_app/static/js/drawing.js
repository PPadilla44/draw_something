console.log("CHECL");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();

ctx.fillStyle = "black";

var drawing;
function draw(event) {
    drawing = setInterval(function() {

        let pos = getMousePos(event)

        var circle = new Path2D();
        console.log(pos);
    
        circle.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
        ctx.fill(circle)
    }, 100)

}

function getMousePos(event) {
    return {
        x : event.pageX - rect.left,
        y : event.pageY - rect.top
    }
}

document.onmousedown = (event) => draw(event)
document.onmouseup = (event) => clearInterval(drawing)