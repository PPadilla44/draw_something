var userList;
var who;
var gamesDom;
var sendBtn;
var searchForm;

localStorage.removeItem("word")

window.onload = () => {


    userList = document.getElementById("userList")
    who = document.getElementById("who")
    sendBtn = document.getElementById('send-button');
    gamesDom = document.getElementById('games');
    searchForm = document.getElementById('search');

    searchForm.onsubmit = (e) => search(e);


    fetch('http://localhost:5500/get_images')
        .then(res => res.json())
        .then(res => res.games)
        .then(games => {
            // gamesDom.innerHTML = "";
            for (const game of games) {
                gamesDom.innerHTML += (`
                    <div class="dash-drawings border d-flex align-items-center flex-column rounded bg-secondary" onclick="selectGame(${game.id})">
                        <h1>${game.creator.username}</h1>
                        <img  src=${game.image}>

                    <div>
                    `)
            }
        })
}

const selectUser = () => {
    sendBtn.style.display = "none"
    who.style.display = "block"
    userList.style.display = "block"

}

const select = (user) => {
    let id = user.children[1].value;
    location.href = `/game/${id}`;

}

const selectGame = (id) => {
    console.log(id);
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
                return
            }

            if (user.id === +formData.get("curUser")) {
                showElem.classList = "text-danger";
                showElem.innerHTML = "Thats you!";
                return
            }


            showElem.classList = `select-user list-group-item border-success`
            showElem.innerHTML = `

            <li style="list-style: none;" onclick="select(this) style="list-s" class="border-success">
                <h4>${ user.username }</h4>
                <input type="hidden" name="user" value="${user.id}">
            </li>
        `

        })
        .catch(err => console.log(err))


}