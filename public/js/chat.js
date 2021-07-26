const room = window.location.pathname.replace(/\//g, "")
const socket = io("http://localhost:3000/" + room)

socket.on("status", (data) => {
    console.log(data)
})

socket.on("update_messages", updateMessagesOnScreen)

socket.on("counter_users", updateActiveUsers)


let msgForm = document.getElementsByTagName("form")["message_form"]
msgForm.addEventListener("submit", sendMessage)



