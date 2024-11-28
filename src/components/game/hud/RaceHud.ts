import { Scene } from "phaser";

const COUNTDOUWN_TIME = 2;

export class RaceHud extends Scene {

  private txtCountdown!: Phaser.GameObjects.Text
  public onCountdownEnd!: () => void

  constructor() {
    super("RaceHud");

  }

  create() {
    this.createCountdown();
    this.startCountdown();
  }

  private createCountdown() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2;

    this.txtCountdown = this.add.text(x, y, String(COUNTDOUWN_TIME), {
      fontSize: "42px",
      color: "#000000",
      fontFamily: "Consolas"
    });
  }

  public startCountdown() {
    this.txtCountdown.setText(String(COUNTDOUWN_TIME));
    const timer = setInterval(() => {
      this.txtCountdown.setText((Number(this.txtCountdown.text) - 1).toString());
      if (Number(this.txtCountdown.text) === 0) {
        clearInterval(timer);
        this.txtCountdown.setText("");
        if (this.onCountdownEnd)
          this.onCountdownEnd();
      }
    }, 1000);
  }


}