const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")

const socketIO = require("socket.io")


app.use(express.static(path.join(__dirname, "public")))

app.use("/room1", (req, res) => {
    const doc = fs.readFileSync(path.join(__dirname, "public", "room.html"), "utf8")
    res.send(doc)
})
app.use("/room2", (req, res) => {
    const doc = fs.readFileSync(path.join(__dirname, "public", "room.html"), "utf8")
    res.send(doc)
})

const server = app.listen(3000, (err) => {
    if (err) {
        console.log("An error ocurred", err)
    } else {
        console.log("Server Running on port 3000")
    }    
})

let messages = {room1: [], room2: []}
let connections = {room1: 0, room2: 0}

const io = socketIO(server)


const sala1 = io.of("/room1").on("connection", (socket) => {
    console.log("New connetion")

    connections.room1 += 1


    socket.emit("status", "Connected on sala1")

    sala1.emit("counter_users", {activeUsers: connections.room1})

    socket.emit("update_messages", messages.room1)


    socket.on("new_message", (data) => {
        // console.log(data)

        messages.room1.push(data)

        sala1.emit("update_messages", messages.room1)
    })
    socket.on("disconnect", (socket) => {
        console.log("User disconnected")
        connections.room1 -= 1
        sala1.emit("counter_users", {activeUsers: connections.room1})
    })
})



const sala2 = io.of("/room2").on("connection", (socket) => {
    console.log("New connetion")
    
    connections.room2 += 1
    socket.emit("status", "Connected on sala2")

    sala2.emit("counter_users", {activeUsers: connections.room2})

    socket.emit("update_messages", messages.room2)


    socket.on("new_message", (data) => {
        // console.log(data)

        messages.room2.push(data)

        sala2.emit("update_messages", messages.room2)
    })
    socket.on("disconnect", (socket) => {
        console.log("User disconnected")
        connections.room2 -= 1
        sala2.emit("counter_users", {activeUsers: connections.room2})
    })
})