import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import type { Room } from "./models/Room.interface.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

const rooms: Record<string, Room> = {};

const generateRoomCode = () =>
  Math.random().toString(36).substring(2, 6).toUpperCase();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuário desconectou: ${socket.id}`);
  });

  socket.on(
    "create_room",
    (data: { name: string; maxPlayers: number }, callback) => {
      const roomId = generateRoomCode();

      const newRoom: Room = {
        code: roomId,
        status: "LOBBY",
        maxPlayers: 15,
        players: [
          {
            id: socket.id,
            name: data.name,
            isHost: true,
            alive: true,
          },
        ],
      };

      rooms[roomId] = newRoom;

      socket.join(roomId);

      if (callback) callback({ success: true, code: roomId });

      console.log(`Sala ${roomId} criada por ${data.name}`);
    }
  );
});

server.listen(3000, () => {
  console.log("SERVIDOR RODANDO NA PORTA 3000");
});
