import type { Player } from "./Player.interface.js";


export interface Room {
  code: string;
  players: Player[];
  maxPlayers: number;
  status: "LOBBY" | "GAME";
}
