import type { Scene } from "phaser";
import type { Player } from "../../../core/domain/race/Player";
import type { PlayerRaceInfo } from "../../../core/domain/race/PlayerRaceInfo";

export class PlayerEntity {
  private scene: Scene;
  public body!: Phaser.GameObjects.Sprite;
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

  public setPlayerRaceInfo(playerRaceInfo: PlayerRaceInfo, isMain?: boolean) {
    this.playerData.playerRaceInfo = playerRaceInfo;
    this.updateBody(isMain);
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

  private updateBody(isMain?: boolean) {
    // this.body.setPosition(
    //   this.playerData.playerRaceInfo.position.x,
    //   this.playerData.playerRaceInfo.position.y
    // );
    if (isMain) {
      this.body.setPosition(
        this.playerData.playerRaceInfo.position.x,
        this.playerData.playerRaceInfo.position.y
      );
    } else {

      this.scene.add.tween({
        targets: this.body,
        x: this.playerData.playerRaceInfo.position.x,
        y: this.playerData.playerRaceInfo.position.y,
        duration: 100
      });
    }
    this.body.setRotation(this.playerData.playerRaceInfo.angle);
  }
}