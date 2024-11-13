import { Scene } from "phaser";

export class StartScene extends Scene {
  constructor() {
    super("StartScene");
  }

  public create() {
    this.add.text(20, 20, "StartScene", {
      fontSize: "32px",
      color: "#000000"
    });
  }
}