
var drawing = false;
var context;
var canvas;



window.onload = () => {

    //Clear Button
    document.getElementById('btnClear').addEventListener('click', function(){
        context.clearRect(0,0, context.canvas.width, context.canvas.height);       
    }, false);
    
    //Back Button
    document.getElementById('btnBack').addEventListener('click', function(){
            // document.getElementById('myCanvas').style.display = "block";
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
            console.log(dataURL);
        }, false);


    //Size Canvas
    canvas = document.getElementById("myCanvas");

    context = canvas.getContext("2d")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;

    
    //Mouse movement
    handleEventListeners()
    window.onresize = handleResize
    
    //Style line
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = 5;
    document.getElementById('lineWidth').value = 5;
    
    //Hide Save Area
    document.getElementById('saveArea').style.display = "none";


}

const handleEventListeners = () => {

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleDown)    
    document.addEventListener("mouseup", handleUp)
    document.addEventListener("wheel", handleLineWidth)

}

const handleMouseMove = (e) => {


    if (drawing) {
        context.lineTo(e.clientX, e.clientY);
        context.closePath();
        context.stroke();
        context.moveTo(e.clientX, e.clientY);
    } else {
        context.moveTo(e.clientX, e.clientY);
    }

}

const handleDown = (e) => {

    console.log(e);

    drawing = !drawing;
    context.moveTo(e.clientX, e.clientY);
    context.beginPath();

}


const handleUp = () => {

    drawing = !drawing;
    console.log(drawing);

}

const handleLineWidth = (e) => {
    
    e.deltaY < 0 ?
    
        context.lineWidth < 50 ? context.lineWidth += 2 : console.log("too high")
    
        : 
        
        context.lineWidth > 0 ? context.lineWidth -= 2 : console.log("too low")

    
    document.getElementById('lineWidth').value = context.lineWidth;

}

const handleResize = (e) => {


    // create a temporary canvas obj to cache the pixel data //
    var temp_cnvs = document.createElement('canvas');
    var temp_cntx = temp_cnvs.getContext('2d');

    // set it to the new width & height and draw the current canvas data into it // 
    console.log("1one",context.lineWidth);
    let w = window.innerWidth;
    let h = window.innerHeight - 60
    temp_cnvs.width = w; 
    temp_cnvs.height = h;
    temp_cntx.drawImage(canvas, 0, 0);
    

    
    // resize & clear the original canvas and copy back in the cached pixel data //
    let val = context.lineWidth
    canvas.width = w; 
    canvas.height = h;
    context.drawImage(temp_cnvs, 0, 0);

    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = val;

}