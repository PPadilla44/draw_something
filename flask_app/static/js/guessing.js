
var guessForm;
var answer;
var guessTitle;
var guessText;
var guessBtn;

var attempts = localStorage.getItem("attempts");
var correct = localStorage.getItem("correct");
var id = localStorage.getItem("gameId");

let url = location.href;

if (!id) {
    id = "";
    
    for (let i = url.length; i >= 0; i--) {
        if (url[i] == "/") {
            id = url.substring(i + 1);
            break
        }
    }
    localStorage.setItem("gameId", id)

}


let formData = new FormData();
formData.append("id", id)
fetch("/get/answer",
    {
        method: "POST",
        body: formData
    }
)
    .then(res => res.json())
    .then(res => {
        answer = res.answer;
    })
    .catch(err => console.log(err))


window.onload = (e) => {

    if (!attempts) {
        attempts = 5
        localStorage.setItem("attempts", attempts)
    }

    guessForm = document.getElementById("guessForm");
    guessTitle = document.getElementById("guessTitle");
    guessText = document.getElementById("guessText");
    guessBtn = document.getElementById("guessBtn");


    if (correct) {
        correctText();
    } else if (attempts <= 0 && attempts !== null) {
        incorrectText();
    }

    guessForm.onsubmit = (e) => {

        e.preventDefault()
        let guess = String(guessForm[0].value).toUpperCase();

        if (attempts <= 0 && attempts !== null) {
            incorrectText();
            return
        } else if (correct) {
            correctText();
            return
        }

        if (guess === answer) {
            correctText();
            localStorage.setItem("correct", true);
            correct = true;
        } else {
            guessTitle.style.color = "Red";
            guessTitle.innerText = `Incorrect! ${attempts - 1} Guesses Remaining`
            attempts--;
            localStorage.setItem("attempts", attempts);
            if (attempts <= 0 && attempts !== null) {
                incorrectText();
            }
        }



        guessForm[0].value = "";
    }

}

const incorrectText = () => {
    guessTitle.style.color = "Red";
    guessTitle.innerText = `The Word Was '${answer}'`;
    guessText.innerText = "You can right click the canvas to save!"
    changeGuessBtn()
}

const correctText = () => {
    guessForm[0].value = answer;
    guessTitle.style.color = "Green";
    guessTitle.innerText = "That's Correct!"
    guessText.innerText = "You can right click the canvas to save!"
    changeGuessBtn();
}

const changeGuessBtn = () => {
    guessBtn.innerText = "Leave"
    guessBtn.addEventListener("click", deleteAndLeave)
    guessBtn.style.backgroundColor = "#aa1924"
    guessBtn.style.color = "white"
    guessBtn.onmouseover = () => guessBtn.style.backgroundColor = "#fc5060";
    guessBtn.onmouseout = () => guessBtn.style.backgroundColor = "#aa1924";
    guessBtn.disabled = true;
    setTimeout(() => guessBtn.disabled = false, 3000)
}

const deleteAndLeave = () => {

    localStorage.removeItem("gameId")

    location.href = `/delete/drawing/${id}`
}



