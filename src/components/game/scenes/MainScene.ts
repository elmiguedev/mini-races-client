import { Scene } from "phaser";

export class MainScene extends Scene {
  constructor() {
    super("MainScene");
  }

  public create() {
    this.add.text(20, 20, "MainScene", {
      fontSize: "32px",
      color: "#000000"
    });
  }
}