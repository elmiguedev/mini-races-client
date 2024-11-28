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
        // this.createCheckpoints(); // SACARLO DE ACA
        this.updateRaceDetail();
      }
    })
    SendPlayerInRace();
    this.createRaceHud()
  }

  public update(delta: number) {
    if (!this.raceDetail) return;

    if (this.mainPlayer && this.raceDetail.status === "running") {
      const moves = {
        accelerate: this.controls.up?.isDown,
        left: this.controls.left?.isDown,
        right: this.controls.right?.isDown,
      }
      if (moves.accelerate || moves.left || moves.right) {
        SendPlayerMove(moves);
        this.mainPlayer.addMove(moves);
        // this.updateMainPlayer(moves);
      }

      // Object.values(this.players).forEach((player) => {
      //   player.updateBody();
      // })

      this.mainPlayer.move();
    }



    // TODO: cambiar a otra funcion


  }

  public updateRaceDetail() {
    this.updatePlayers();
  }

  private updatePlayers() {
    if (!this.raceDetail?.players) return;
    Object.values(this.raceDetail.players).forEach((player) => {
      if (!this.players[player.socketId]) {
        this.players[player.socketId] = new PlayerEntity(this, player);
        if (player.socketId === GetSocketId()) {
          this.mainPlayer = this.players[player.socketId];
          this.mainPlayer.startFollow();
        }
      } else {
        if (this.players[player.socketId] === this.mainPlayer) {
          this.players[player.socketId].setPlayerRaceInfo(player.playerRaceInfo);
          // this.players[player.socketId].fixPlayerPosition();
        } else {
          this.players[player.socketId].setPlayerRaceInfo(player.playerRaceInfo);
          this.players[player.socketId].updatePlayer();
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
      console.log("AJUSTA")
      // Gran corrección: ajustá instantáneamente
      this.mainPlayer.body.setPosition(
        data.playerRaceInfo.position.x,
        data.playerRaceInfo.position.y
      );
      this.mainPlayer.body.setRotation(data.playerRaceInfo.angle);
    } else {
      //Corrección pequeña: interpolación
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
      this.mainPlayer.turnLeft();
    }
    if (moves.right) {
      this.mainPlayer.turnRight()
    }
    if (moves.accelerate) {
      this.mainPlayer.accelerate();
    }
    this.mainPlayer.fixPlayerPosition();

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