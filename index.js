import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config({
    path:"./.env",
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'public')));

const users = [];

io.on('connection',(socket)=>{
    console.log('User connected -> ',socket.id);
    
    socket.on("join",(username)=>{
        users[socket.id] = username;
        console.log(username,"joined the chat");
    })
    socket.on("user-message", (data) => {
        
        const userData = {
            username: users[socket.id],
            message:data.message,
            id:socket.id
        }
        io.emit("receive-message",userData);
    });
    // socket.on('disconnect',()=>{
    //     delete users[socket.id];
    //     console.log("User disconnected ->",socket.id);
    // })
})

server.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})