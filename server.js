const http = require('http')
const express = require('express')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = 4000

// Run when client connects
io.on('connection', (socket) => {
    console.log('New WS connected')

    socket.emit('message', 'Welcome to the Chat')

    // Broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined')

    // Run when user disconnects
    socket.on('disconnect', () => {
    socket.broadcast.emit('message', 'A user has left the chat')
    })

    // Listen for chat message
    socket.on('chatMessage', (msg) => {
        console.log(msg)
        io.emit('message', msg)
    })
})

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT, () => {
    console.log('Server is Running')
})
