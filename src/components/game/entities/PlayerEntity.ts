import type { Scene } from "phaser";
import type { Player } from "../../../models/race/Player";
import type { PlayerRaceInfo } from "../../../models/race/PlayerRaceInfo";

export class PlayerEntity {
  private scene: Scene;
  private body!: Phaser.GameObjects.Sprite;
  private playerData: Player;

  constructor(scene: Scene, player: Player) {
    this.playerData = player;
    this.scene = scene;

    this.createBody();
  }

  createBody() {
    this.body = this.scene.add.sprite(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y,
      "car"
    )
  }

  public setPlayerRaceInfo(playerRaceInfo: PlayerRaceInfo) {
    this.playerData.playerRaceInfo = playerRaceInfo;
  }

  public startFollow() {
    this.scene.cameras.main.startFollow(this.body);
  }
}