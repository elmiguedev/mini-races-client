import { Scene } from "phaser";

const COUNTDOWN_TIME = 2;

export class RaceHud extends Scene {
  private txtCountdown!: Phaser.GameObjects.Text;
  public onCountdownEnd!: () => void;
  private accelerateButton!: Phaser.GameObjects.Rectangle;
  private stickArea!: Phaser.GameObjects.Rectangle;
  private stickOrigin!: Phaser.Math.Vector2;
  private stickDelta!: Phaser.Math.Vector2;

  constructor() {
    super("RaceHud");
  }

  create() {
    this.createCountdown();
    this.createMobileControls();
    this.startCountdown();
  }

  private createCountdown() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2;

    this.txtCountdown = this.add.text(x, y, String(COUNTDOWN_TIME), {
      fontSize: "42px",
      color: "#000000",
      fontFamily: "Consolas",
    });
  }

  public startCountdown() {
    this.txtCountdown.setText(String(COUNTDOWN_TIME));
    const timer = setInterval(() => {
      this.txtCountdown.setText((Number(this.txtCountdown.text) - 1).toString());
      if (Number(this.txtCountdown.text) === 0) {
        clearInterval(timer);
        this.txtCountdown.setText("");
        if (this.onCountdownEnd) this.onCountdownEnd();
      }
    }, 1000);
  }

  private createMobileControls() {
    // Botón para acelerar
    this.accelerateButton = this.add
      .rectangle(500, 300, 100, 100, 0x00ff00, 0.3)
      .setOrigin(0.5)
      .setInteractive();

    this.accelerateButton.on("pointerdown", () => {
      this.emitControls(true, this.stickDelta.x < -30, this.stickDelta.x > 30);
    });

    this.accelerateButton.on("pointerup", () => {
      this.emitControls(false, this.stickDelta.x < -30, this.stickDelta.x > 30);
    });

    // Área interactiva para el stick direccional
    this.stickArea = this.add
      .rectangle(100, 300, 150, 150, 0x0000ff, 0.2)
      .setOrigin(0.5)
      .setInteractive();

    this.stickOrigin = new Phaser.Math.Vector2(100, 500);
    this.stickDelta = new Phaser.Math.Vector2(0, 0);

    this.stickArea.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      this.stickOrigin.set(pointer.x, pointer.y);
    });

    this.stickArea.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown) return;

      this.stickDelta.set(pointer.x - this.stickOrigin.x, pointer.y - this.stickOrigin.y);
      this.emitControls(
        false,
        this.stickDelta.x < -30,
        this.stickDelta.x > 30
      );
    });

    this.stickArea.on("pointerup", () => {
      this.stickDelta.set(0, 0);
      this.emitControls(false, false, false);
    });
  }

  private emitControls(accelerate: boolean, left: boolean, right: boolean) {
    this.scene.get("StartScene").events.emit("hud-controls", {
      accelerate,
      left,
      right,
    });
  }
}
