
const forms = document.forms["user_form"]
forms.addEventListener("submit", addUser)


let rooms = document.getElementsByClassName("room")
for (let element of rooms) {
    element.addEventListener("click", goToSelectedRoom)
}


