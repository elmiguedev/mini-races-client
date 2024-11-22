import { Scene } from "phaser";
import type { RaceDetail } from "../../../core/domain/race/RaceDetail";
import { PlayerEntity } from "../entities/PlayerEntity";
import CarPng from "../../../assets/img/car.png";
import MapPng from "../../../assets/img/map.png";
import type { RaceHud } from "../hud/RaceHud";
import { SendPlayerInRace } from "@/core/actions/race/SendPlayerInRace";
import { SubscribeRaceStatus } from "@/core/actions/race/SubscribeRaceStatus";
import { SendPlayerMove } from "@/core/actions/race/SendPlayerMove";
import { SendPlayerRunning } from "@/core/actions/race/SendPlayerRunning";
import { GetSocketId } from "@/core/actions/race/GetSocketId";
import type { Player } from "../../../core/domain/race/Player";

export class StartScene extends Scene {
  private raceDetail!: RaceDetail;
  private txt!: Phaser.GameObjects.Text;
  private players: Record<string, PlayerEntity> = {};
  private mainPlayer!: PlayerEntity;
  private controls!: Phaser.Types.Input.Keyboard.CursorKeys;
  private checkpoints: Phaser.GameObjects.Rectangle[] = [];
  private raceHud!: RaceHud;

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

    this.add.image(0, 0, "map").setOrigin(0);
    this.controls = this.input.keyboard!.createCursorKeys();

    SubscribeRaceStatus({
      callback: (raceDetail) => {
        this.raceDetail = raceDetail;
        this.createCheckpoints();
        this.updateRaceDetail();
      }
    })
    SendPlayerInRace();
    this.createRaceHud()
  }

  public update() {
    if (!this.raceDetail) return;

    if (this.mainPlayer && this.raceDetail.status === "running") {
      const moves = {
        accelerate: this.controls.up?.isDown,
        left: this.controls.left?.isDown,
        right: this.controls.right?.isDown,
      }
      if (moves.accelerate || moves.left || moves.right) {
        SendPlayerMove(moves);
        this.updateMainPlayer(moves);
      }
    }

  }

  public updateRaceDetail() {
    this.txt.setText(JSON.stringify(this.raceDetail.players));
    this.updatePlayers();
  }

  private updatePlayers() {
    // if (!this.raceDetail?.players) return;
    Object.values(this.raceDetail.players).forEach((player) => {
      if (!this.players[player.socketId]) {
        this.players[player.socketId] = new PlayerEntity(this, player);
        if (player.socketId === GetSocketId()) {
          this.mainPlayer = this.players[player.socketId];
          this.mainPlayer.startFollow();
        }
      } else {
        if (this.players[player.socketId] === this.mainPlayer) {
          // this.players[player.socketId].setPlayerRaceInfo(player.playerRaceInfo, true);
          this.correctLocalPlayerPosition(player);
        } else {
          this.players[player.socketId].setPlayerRaceInfo(player.playerRaceInfo);

        }
      }
    })
  }

  public correctLocalPlayerPosition(data: Player) {
    const distance = Phaser.Math.Distance.Between(
      this.mainPlayer.body.x,
      this.mainPlayer.body.y,
      data.playerRaceInfo.position.x,
      data.playerRaceInfo.position.y
    );

    if (distance > 50) {
      // Gran corrección: ajustá instantáneamente
      this.mainPlayer.body.setPosition(
        data.playerRaceInfo.position.x,
        data.playerRaceInfo.position.y
      );
      this.mainPlayer.body.setRotation(data.playerRaceInfo.angle);
    } else {
      // Corrección pequeña: interpolación
      this.add.tween({
        targets: this.mainPlayer.body,
        x: data.playerRaceInfo.position.x,
        y: data.playerRaceInfo.position.y,
        duration: 50,
      });
    }

    // Ajustar rotación
    this.mainPlayer.body.setRotation(data.playerRaceInfo.angle);
  }

  private updateMainPlayer(moves: any) {
    if (moves.left) {
      this.mainPlayer.body.setRotation(this.mainPlayer.body.rotation - 0.05);
    }
    if (moves.right) {
      this.mainPlayer.body.setRotation(this.mainPlayer.body.rotation + 0.05);
    }
    if (moves.accelerate) {
      const dx = Math.cos(this.mainPlayer.body.rotation);
      const dy = Math.sin(this.mainPlayer.body.rotation);
      this.mainPlayer.body.setPosition(
        this.mainPlayer.body.x + 5 * dx,
        this.mainPlayer.body.y + 5 * dy
      )
    }
  }

  private createCheckpoints() {
    if (this.checkpoints.length > 0) return;
    this.raceDetail.checkpoints.forEach((checkpoint) => {
      const c = this.add.rectangle(
        checkpoint.x,
        checkpoint.y,
        checkpoint.width,
        checkpoint.height,
        0xff0000
      ).setOrigin(0);
      this.checkpoints.push(c);
    })
  }

  private createRaceHud() {
    this.scene.run("RaceHud");
    this.raceHud = this.scene.get("RaceHud") as RaceHud;
    this.raceHud.onCountdownEnd = () => {
      console.log("GO")
      SendPlayerRunning();
    }
  }

}