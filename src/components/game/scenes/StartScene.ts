import { RaceSocketManager, useRaceSocket } from "@/hooks/races/useRaceSocket";
import { Scene } from "phaser";
import type { ChatMessage } from "../../../models/race/ChatMessage";
import type { RaceDetail } from "../../../models/race/RaceDetail";
import { PlayerEntity } from "../entities/PlayerEntity";
import CarPng from "../../../assets/img/car.png";
import MapPng from "../../../assets/img/map.png";

export class StartScene extends Scene {
  private raceDetail!: RaceDetail;
  private txt!: Phaser.GameObjects.Text;
  private players: Record<string, PlayerEntity> = {};
  private mainPlayer!: PlayerEntity;

  constructor() {
    super("StartScene");
  }

  preload() {
    this.load.image("car", CarPng);
    this.load.image("map", MapPng);
  }

  public create() {

    this.txt = this.add.text(20, 20, "StartScene", {
      fontSize: "32px",
      color: "#000000"
    });

    this.add.image(0, 0, "map");

    RaceSocketManager.getInstance().addRaceDetailListener((data: RaceDetail) => {
      this.raceDetail = data;
      this.updateRaceDetail();
    })

    RaceSocketManager.getInstance().sendPlayerInGame();
  }

  public updateRaceDetail() {
    this.txt.setText(JSON.stringify(this.raceDetail.players));
    this.updatePlayers();
  }

  private updatePlayers() {
    if (!this.raceDetail) return;
    Object.values(this.raceDetail.players).forEach((player) => {
      if (!this.players[player.socketId]) {
        this.players[player.socketId] = new PlayerEntity(this, player);
        if (player.socketId === RaceSocketManager.getInstance().getId()) {
          this.mainPlayer = this.players[player.socketId];
          this.mainPlayer.startFollow();
        }
      } else {
        this.players[player.socketId].setPlayerRaceInfo(player.playerRaceInfo);
      }
    })
  }

}