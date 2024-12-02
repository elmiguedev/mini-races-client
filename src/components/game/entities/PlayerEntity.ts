import type { Scene } from "phaser";
import type { Player } from "../../../core/domain/race/Player";
import type { PlayerRaceInfo } from "../../../core/domain/race/PlayerRaceInfo";

export class PlayerEntity {
  private scene: Scene;
  public body!: Phaser.GameObjects.Sprite;
  public playerData: Player;
  private txtPlayerInfo!: Phaser.GameObjects.Text;
  private serverBody!: Phaser.GameObjects.Rectangle;
  private moveBuffer: any[] = [];


  constructor(scene: Scene, player: Player) {
    this.playerData = player;
    this.scene = scene;

    this.createBody();
    this.createServerBody();
    this.createInfo();
  }

  createBody() {
    this.body = this.scene.add.sprite(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y,
      "car"
    );
    this.body.setOrigin(0.5);
    this.body.setRotation(this.playerData.playerRaceInfo.angle);
  }

  createServerBody() {
    this.serverBody = this.scene.add.rectangle(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y,
      32,
      32,
      0xff0000,
      0.3
    );
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

  // Behavior methods
  // ---------------------------

  public addMove(move: any) {
    this.moveBuffer.push(move);
  }

  public move() {
    const move = this.moveBuffer.shift();
    if (move) {
      if (move.left) this.turnLeft();
      if (move.right) this.turnRight();
      if (move.accelerate) this.accelerate();
    }


  }

  public accelerate() {
    const radians = this.body.rotation;
    const dx = Math.cos(radians);
    const dy = Math.sin(radians);
    this.body.x += 5 * dx;
    this.body.y += 5 * dy;
    this.updateInfo();
  }

  public turnLeft() {
    this.body.rotation -= 0.05;
    // this.body.rotation = Phaser.Math.Angle.Wrap(this.body.rotation);
    this.updateInfo();
  }

  public turnRight() {
    this.body.rotation += 0.05;
    // this.body.rotation = Phaser.Math.Angle.Wrap(this.body.rotation);
    this.updateInfo();
  }

  public updatePlayer() {
    this.updateBody();
    this.updateInfo();
  }

  public setPlayerRaceInfo(playerRaceInfo: PlayerRaceInfo, isMain?: boolean) {
    this.playerData.playerRaceInfo = playerRaceInfo;

    this.updateInfo();
    this.updateServerBody();

    this.fixPlayerPosition();

  }

  public setPlayerPosition(x: number, y: number, angle: number) {
    this.playerData.playerRaceInfo.position.x = x;
    this.playerData.playerRaceInfo.position.y = y;
    this.playerData.playerRaceInfo.angle = angle;

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

  public updateServerBody() {
    this.serverBody.setPosition(
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y
    );
    this.serverBody.setRotation(this.playerData.playerRaceInfo.angle);
  }
  public startFollow() {
    this.scene.cameras.main.startFollow(this.body);
  }

  public updateBody() {
    this.body.rotation = Phaser.Math.Angle.Wrap(this.playerData.playerRaceInfo.angle);
    this.scene.add.tween({
      targets: this.body,
      x: this.playerData.playerRaceInfo.position.x,
      y: this.playerData.playerRaceInfo.position.y,
      duration: 100
    })
  }

  public updateBodyHard() {
    this.body.rotation = Phaser.Math.Angle.Wrap(this.playerData.playerRaceInfo.angle);
    this.body.setPosition(this.playerData.playerRaceInfo.position.x, this.playerData.playerRaceInfo.position.y);
  }

  public fixPlayerPosition() {
    const MAX_DISTANCE = 150;
    const distance = Phaser.Math.Distance.Between(
      this.body.x,
      this.body.y,
      this.playerData.playerRaceInfo.position.x,
      this.playerData.playerRaceInfo.position.y
    );

    if (distance > MAX_DISTANCE) {
      // this.updateBody();
      this.body.setPosition(this.playerData.playerRaceInfo.position.x, this.playerData.playerRaceInfo.position.y);
      this.body.setRotation(this.playerData.playerRaceInfo.angle);
    }
  }
}