//Functions chooseRoom.js - Inicio
function addUser(e){
    //utilize .preventDefault() para bloquear o comportamento padrão (do submit neste caso)
    e.preventDefault()
    //Para receber um array com todos os forms do document utilizamos o document.forms
    let user = document.forms["user_form"]["userInput"]
    if (user.value.length == 0) {
        alert("Escolha um nome e tente novamente")
    }
    sessionStorage.setItem("user", user.value)

    user.style.fontWeight = "bold"
    user.style.color = "green"
}

function goToSelectedRoom(e){
    if (sessionStorage.getItem("user")) {
        let room = e.target
        if (room.innerText == "Sala 1") {
            window.location.href = "/room1"
        } else if (room.innerText == "Sala 2") {
            window.location.href = "/room2"
        }
    } else {
        alert("Choose a name before continue")
    }
}
//Functions chooseRoom.js - Fim


//Functions chat.js - Inicio
function updateActiveUsers(data) {
    let activeUsers = document.getElementById("activeUsers")
    activeUsers.innerText = "Ativos: " + data.activeUsers
}

function updateMessagesOnScreen(messages) {
    let user = window.sessionStorage.getItem("user")
    
    let messagesDiv = document.getElementById("messages")
    messagesDiv.innerHTML = ""

    for (let element of messages) {
        let divMessage = document.createElement("div")
        let username = document.createElement("h4")
        let message = document.createElement("p")

        username.innerText = element.user
        message.innerText = element.msg

        if (element.user == user) {
            divMessage.style.textAlign = "right"
            username.style.color = "green"
        }

        divMessage.appendChild(username)
        divMessage.appendChild(message)
        messagesDiv.appendChild(divMessage)
    }
}

function sendMessage(e) {
    e.preventDefault()

    let user = window.sessionStorage.getItem("user")
    
    const message = document.forms["message_form"]["textarea"]
    socket.emit("new_message", { user, msg: message.value })
    message.value = ""
    message.focus()
}
//Functions chat.js - Fim