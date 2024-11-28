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
  private inputState = {
    accelerate: false,
    left: false,
    right: false,
  };

  constructor() {
    super("StartScene");
  }

  preload() {
    this.load.image("car", CarPng);
    this.load.image("map", MapPng);
  }

  public create() {
    // Texto inicial
    this.txt = this.add.text(20, 20, "StartScene", {
      fontSize: "32px",
      color: "#000000",
    });

    // Fondo
    this.add.image(0, 0, "map").setOrigin(0);

    // Controles del teclado
    this.controls = this.input.keyboard!.createCursorKeys();

    // Suscripción a los cambios en el estado de la carrera
    SubscribeRaceStatus({
      callback: (raceDetail) => {
        this.raceDetail = raceDetail;
        this.updateRaceDetail();
      },
    });

    // Enviar jugador a la carrera
    SendPlayerInRace();

    // Correr la escena del HUD y escuchar eventos de controles
    this.createRaceHud();
    this.listenToHudControls();
  }

  public update(delta: number) {
    if (!this.raceDetail) return;

    if (this.mainPlayer && this.raceDetail.status === "running") {
      const moves = {
        accelerate:
          this.controls.up?.isDown || this.inputState.accelerate,
        left: this.controls.left?.isDown || this.inputState.left,
        right: this.controls.right?.isDown || this.inputState.right,
      };

      if (moves.accelerate || moves.left || moves.right) {
        SendPlayerMove(moves);
        this.mainPlayer.addMove(moves);
      }

      this.mainPlayer.move();
    }
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
        } else {
          this.players[player.socketId].setPlayerRaceInfo(player.playerRaceInfo);
          this.players[player.socketId].updatePlayer();
        }
      }
    });
  }

  private createRaceHud() {
    this.scene.run("RaceHud");
    this.raceHud = this.scene.get("RaceHud") as RaceHud;
    this.raceHud.onCountdownEnd = () => {
      SendPlayerRunning();
    };
  }

  private listenToHudControls() {
    this.events.on("hud-controls", (controls: { accelerate: boolean; left: boolean; right: boolean }) => {
      this.inputState = controls;
    });
  }
}
