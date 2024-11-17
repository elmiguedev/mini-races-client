import type { Scene } from "phaser";
import type { Player } from "../../../core/domain/race/Player";
import type { PlayerRaceInfo } from "../../../core/domain/race/PlayerRaceInfo";

export class PlayerEntity {
  private scene: Scene;
  private body!: Phaser.GameObjects.Sprite;
  private playerData: Player;
  private txtPlayerInfo!: Phaser.GameObjects.Text;

  constructor(scene: Scene, player: Player) {
    this.playerData = player;
    this.scene = scene;

    this.createBody();
    this.createInfo();
  }

  createBody() {
    this.body = this.scene.add.sprite(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y,
      "car"
    );
    this.body.setRotation(this.playerData.playerRaceInfo.angle);
  }

  createInfo() {
    this.txtPlayerInfo = this.scene.add.text(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y - 80,
      `
      ${this.playerData.name} 
      (x: ${this.playerData.playerRaceInfo.position.x.toFixed(0)}, y: ${this.playerData.playerRaceInfo.position.y.toFixed(0)})
      Position: ${this.playerData.playerRaceInfo.racePosition}
      Checkpoint: ${this.playerData.playerRaceInfo.currentCheckpoint}
      Laps: ${this.playerData.playerRaceInfo.currentLap}
      `,
      {
        color: "#00000",
        fontSize: "16px",
        fontFamily: "Consolas",
      }
    ).setOrigin(0.5);
  }

  public setPlayerRaceInfo(playerRaceInfo: PlayerRaceInfo) {
    this.playerData.playerRaceInfo = playerRaceInfo;
    this.updateBody();
    this.updateInfo();
  }

  public updateInfo() {
    this.txtPlayerInfo.setText(
      `
      ${this.playerData.name} 
      (x: ${this.playerData.playerRaceInfo.position.x.toFixed(0)}, y: ${this.playerData.playerRaceInfo.position.y.toFixed(0)})
      Position: ${this.playerData.playerRaceInfo.racePosition}
      Checkpoint: ${this.playerData.playerRaceInfo.currentCheckpoint}
      Laps: ${this.playerData.playerRaceInfo.currentLap}
      `
    );
    this.txtPlayerInfo.setPosition(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y - 80
    )
  }

  public startFollow() {
    this.scene.cameras.main.startFollow(this.body);
  }

  private updateBody() {
    this.body.setPosition(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y
    );
    this.body.setRotation(this.playerData.playerRaceInfo.angle);
  }
}