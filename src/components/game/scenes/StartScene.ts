import { RaceSocketManager, useRaceSocket } from "@/hooks/races/useRaceSocket";
import { Scene } from "phaser";
import type { ChatMessage } from "../../../models/race/ChatMessage";
import type { RaceDetail } from "../../../models/race/RaceDetail";

export class StartScene extends Scene {
  private raceDetail!: RaceDetail;
  private txt!: Phaser.GameObjects.Text;

  constructor() {
    super("StartScene");
  }

  public create() {
    this.txt = this.add.text(20, 20, "StartScene", {
      fontSize: "32px",
      color: "#000000"
    });

    RaceSocketManager.getInstance().addRaceDetailListener((data: RaceDetail) => {
      this.raceDetail = data;
      this.updateRaceDetail();
    })
  }

  public updateRaceDetail() {
    this.txt.setText(JSON.stringify(this.raceDetail.players));
  }

}