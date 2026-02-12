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

io.on('connection',(socket)=>{
    console.log('A new user joinded -> ',socket.id)
})

server.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})