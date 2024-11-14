import { Scene } from "phaser";

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

    this.txtCountdown = this.add.text(x, y, "5", {
      fontSize: "42px",
      color: "#000000",
      fontFamily: "Consolas"
    });
  }

  public startCountdown() {
    this.txtCountdown.setText("5");
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