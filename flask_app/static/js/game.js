var userList;
var who;
var gamesDom;
var sendBtn;
var searchForm;
var dashTitle;

let id = localStorage.getItem("gameId") 
if (id) {
    localStorage.removeItem("attempts")
    localStorage.removeItem("correct")
    localStorage.removeItem("gameId")
    
    location.href = `/delete/drawing/${id}`
}

localStorage.removeItem("word")


window.onload = () => {


    userList = document.getElementById("userList")
    who = document.getElementById("who")
    sendBtn = document.getElementById('send-button');
    gamesDom = document.getElementById('games');
    searchForm = document.getElementById('search');
    dashTitle = document.getElementById('dash-title');

    searchForm.onsubmit = (e) => search(e);


    fetch('http://localhost:5500/get_images')
        .then(res => res.json())
        .then(res => res.games)
        .then(games => {
            if (!games) {
                dashTitle.innerText = `Nothing To Guess YET!`
            } else {
            for (const game of games) {
                gamesDom.innerHTML += (`
                    <a href="/game/guess/${game.id}" style="cursor: pointer;" class="dash-drawings d-flex align-items-center flex-column rounded bg-secondary">
                        <h1>${game.creator.username}</h1>
                        <img  src=${game.image}>

                    <a>
                    `)
            }
        }
        })
}

const selectUser = () => {
    sendBtn.style.display = "none"
    who.style.display = "block"
    userList.style.display = "block"

}

const select = (user) => {
    if (user.children[0]) {
        let id = user.children[1].value;
        location.href = `/game/${id}`;
    }
}

const search = (e) => {
    e.preventDefault()
    let showElem = document.getElementById('search-results')


    let formData = new FormData(searchForm);


    fetch(`/search_user_by_username`,
        {
            method: "POST",
            body: formData
        }
    )
        .then(res => res.json())
        .then(user => {

            if (!user) {
                showElem.classList = "text-danger";
                showElem.innerHTML = "No user found";
                showElem.style.cursor = "auto"
                return
            }

            if (user.id === +formData.get("curUser")) {
                showElem.classList = "text-danger";
                showElem.innerHTML = "Thats you!";
                showElem.style.cursor = "auto"

                return
            }

            showElem.style.cursor = "pointer"

            showElem.classList = `select-user list-group-item border-success`
            showElem.innerHTML = `

                <h4>${user.username}</h4>
                <input type="hidden" name="user" value="${user.id}">
        `

        })
        .catch(err => console.log(err))


}