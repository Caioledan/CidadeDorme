import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Usuário desconectou: ${socket.id}`);
    })
});

server.listen(3000, () => {
    console.log('SERVIDOR RODANDO NA PORTA 3000');
})