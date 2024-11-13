import { RaceSocketManager, useRaceSocket } from "@/hooks/races/useRaceSocket";
import { Scene } from "phaser";

export class StartScene extends Scene {
  constructor() {
    super("StartScene");

    console.log()
    console.log("IN RACE", RaceSocketManager.getInstance().raceDetail);
    console.log()

  }

  public create() {
    this.add.text(20, 20, "StartScene", {
      fontSize: "32px",
      color: "#000000"
    });
  }
}