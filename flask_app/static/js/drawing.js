
var drawing = false;
var context;
var rect;


window.onload = () => {

    //Clear Button
    document.getElementById('btnClear').addEventListener('click', function(){
        context.clearRect(0,0, context.canvas.width, context.canvas.height);       
    }, false);
    
    //Back Button
    document.getElementById('btnBack').addEventListener('click', function(){
            document.getElementById('myCanvas').style.display = "block";
            document.getElementById('saveArea').style.display = "none";
            document.getElementById('tools').style.display = "block";
            
        }, false);
    
    //Width Scale
    document.getElementById('lineWidth').addEventListener('change', function(){
            context.lineWidth = document.getElementById('lineWidth').value;
        }, false);
    

    
    //Color
    document.getElementById('colorChange').addEventListener('change', function(){
            context.strokeStyle = document.getElementById('colorChange').value;
        }, false);
    
    //Save
    document.getElementById('btnSave').addEventListener('click', function(){
            document.getElementById('myCanvas').style.display = "none";
            document.getElementById('saveArea').style.display = "block";
            document.getElementById('tools').style.display = "none";
            
            var dataURL = document.getElementById('myCanvas').toDataURL();
            document.getElementById('canvasImg').src = dataURL;
        }, false);


    //Size Canvas
    // var canvas = document.getElementById("myCanvas");
    var canvas = document.getElementById("myCanvas");
    rect = canvas.getBoundingClientRect();

    context = canvas.getContext("2d")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;

    
    //Mouse movement
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleDown;
    document.onmouseup = handleUp;
    document.onwheel = handleLineWidth;
    
    //Style line
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = 5;
    document.getElementById('lineWidth').value = 5;
    
    //Hide Save Area
    document.getElementById('saveArea').style.display = "none";


}

function handleMouseMove(e) {

    if (drawing) {
        context.lineTo(e.clientX, e.clientY);
        context.closePath();
        context.stroke();
        context.moveTo(e.clientX, e.clientY);
    } else {
        context.moveTo(e.clientX, e.clientY);
    }

}

function handleDown(e) {

    drawing = !drawing;
    console.log(drawing);
    context.moveTo(e.clientX, e.clientY);
    context.beginPath();

}


handleUp = () => {

    drawing = !drawing;
    console.log(drawing);

}

handleLineWidth = (e) => {
    
    e.deltaY < 0 ?
    
        context.lineWidth < 50 ? context.lineWidth += 1 : console.log("too high")
    
        : 
        
        context.lineWidth > 0 ? context.lineWidth -= 1 : console.log("too low")

    
    document.getElementById('lineWidth').value = context.lineWidth;

}