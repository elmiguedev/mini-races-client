import type { Scene } from "phaser";
import type { Player } from "../../../models/race/Player";
import type { PlayerRaceInfo } from "../../../models/race/PlayerRaceInfo";

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
    )
  }

  createInfo() {
    this.txtPlayerInfo = this.scene.add.text(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y,
      this.playerData.name,
      {
        color: "#00000",
        fontSize: "16px",
        fontFamily: "Consolas",
      }
    );
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
    ).setOrigin(0.5);
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