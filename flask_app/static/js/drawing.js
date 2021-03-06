
var drawing = false;
var rezingBrush = false
var context;
var canvas;
var canvasHolder;
var isDisplayed;

localStorage.removeItem("attempts")
localStorage.removeItem("correct")
localStorage.removeItem("gameId")




window.onload = () => {


    const localWord  = localStorage.getItem("word")

    const choices = document.getElementById("choices")
    const start = document.getElementById("start")
    const word = document.getElementById("word")

    const nav = document.getElementById("nav");


    if(localWord) {
        word.innerHTML = localWord;
        choices.style.display = "None";
        nav.style.display = "None";
        start.style.display = "block";
    }

    //Clear Button
    document.getElementById('btnClear').addEventListener('click', function () {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }, false);

    //Back Button
    document.getElementById('btnBack').addEventListener('click', function () {
        // document.getElementById('myCanvas').style.display = "block";
        document.getElementById('saveArea').style.display = "none";
        document.getElementById('tools').style.display = "block";

    }, false);

    //Width Scale
    document.getElementById('lineWidth').addEventListener('mousedown', function () {
        rezingBrush = true
    }, false);
    document.getElementById('lineWidth').addEventListener('mouseup', function () {
        rezingBrush = false
    }, false);

    document.getElementById('lineWidth').addEventListener('change', function () {
        context.lineWidth = document.getElementById('lineWidth').value;
    }, false);



    //Color
    document.getElementById('colorChange').addEventListener('change', function () {
        let color = document.getElementById('colorChange').value;
        context.strokeStyle = color;
        context.fillSyle = color;
    }, false);

    //Send
    var myForm = document.getElementById('myForm');
    myForm.onsubmit = (e) => {
        e.preventDefault()
        document.getElementById('myCanvas').style.display = "none";
        document.getElementById('tools').style.display = "none";

        var image = document.getElementById('myCanvas')
        contextImage = image.context;
        context.save();
        context.globalCompositeOperation = 'destination-over';
        context.fillStyle = "#ddd";
        context.fillRect(0, 0, canvas.width, canvas.height);      
        context.restore();
        
        
        image = document.getElementById('myCanvas').toDataURL();

        var word = document.getElementById("word").innerHTML.toUpperCase()
        var opp = document.getElementById("opp")
        receiver_id = opp.attributes[1].value;


        document.getElementById('canvasImg').src = image;

        let data = new FormData(myForm)

        data.append("image", image);
        data.append("word", word);
        data.append("receiver_id", receiver_id);

        fetch("/send/drawing", { method: "POST", body: data })
            .then(res => {
                localStorage.removeItem('word')
                location.href = "/dashboard"
            })
            .catch(err => console.log(err))
    };


    //Size Canvas
    canvas = document.getElementById("myCanvas");

    context = canvas.getContext("2d")
    canvas.width = window.innerWidth - 120;
    canvas.height = window.innerHeight - 120;

    isDisplayed = 
    document.getElementById("start").style.display == "none" 
    ? false : true 


    //Mouse movement
    handleEventListeners()
    window.onresize = handleResize

    //Style line
    context.strokeStyle = document.getElementById('colorChange').value;
    context.fillStyle = document.getElementById('colorChange').value;
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


    if (!rezingBrush && isDisplayed) {

        if (drawing) {
            context.lineTo(e.clientX - 60, e.clientY - 60);
            context.closePath();
            context.stroke();
            context.moveTo(e.clientX - 60, e.clientY - 60);
        } else {
            context.moveTo(e.clientX - 60, e.clientY - 60);
        }

    }

}



const handleDown = (e) => {

    if (!rezingBrush && isDisplayed) {

        drawing = !drawing;


        // Handle First Click
        context.fillStyle = context.strokeStyle;
        context.moveTo(e.clientX - 60, e.clientY - 60);
        context.beginPath();
        let arc = context.lineWidth / 2
        context.arc(e.clientX- 60, e.clientY - 60, arc , 0, 2 * Math.PI);
        context.fill();
        context.closePath();



        context.moveTo(e.clientX - 60, e.clientY - 60);
        context.beginPath();

    }

}


const handleUp = () => {

    if (!rezingBrush && isDisplayed && drawing) {
        drawing = !drawing;
    }

}

const handleLineWidth = (e) => {

    e.deltaY < 0 ?

        context.lineWidth < 50 ? context.lineWidth += 2 : ""

        :

        context.lineWidth > 0 ? context.lineWidth -= 2 : ""


    document.getElementById('lineWidth').value = context.lineWidth;

}

const handleResize = (e) => {


    // create a temporary canvas obj to cache the pixel data //
    var temp_cnvs = document.createElement('canvas');
    var temp_cntx = temp_cnvs.getContext('2d');

    // set it to the new width & height and draw the current canvas data into it // 
    let w = window.innerWidth - 120;
    let h = window.innerHeight - 120
    temp_cnvs.width = w;
    temp_cnvs.height = h;
    temp_cntx.drawImage(canvas, 0, 0);



    // resize & clear the original canvas and copy back in the cached pixel data //
    let val = context.lineWidth
    canvas.width = w;
    canvas.height = h;
    context.drawImage(temp_cnvs, 0, 0);

    context.strokeStyle = "#000";
    context.fillStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = val;

}


const choose = (elem) => {
    localStorage.setItem("word", elem)


    word.innerHTML = elem;
    nav.style.display = "None"
    choices.style.display = "None"
    start.style.display = "block"
    isDisplayed = true;
}


