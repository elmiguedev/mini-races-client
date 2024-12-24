<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type PropType } from 'vue';
import { StartScene } from './scenes/StartScene';
import { MainScene } from './scenes/MainScene';
import { RaceHud } from './hud/RaceHud';

const game = ref();

onMounted(() => {
  game.value = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
      // mode: Phaser.Scale.FIT
    },
    // zoom: 0.5,
    width: 800,
    height: 600,
    parent: "game",
    backgroundColor: '#ffffff',
    render: {
      pixelArt: true,
      transparent: true
    },
    scene: [
      StartScene,
      MainScene,
      RaceHud
    ]
  });
})

onBeforeUnmount(() => {
  if (game) {
    game.value.destroy(true);
  }
})
</script>
<template>
  <div id="game" class="border-dashed border-black border-2">
  </div>
</template>
<style lang="css" scoped>
/* canvas {
  width: 100%;
  height: 100%;
} */

/* #game {
  width: 640px;
  height: 480px;
} */
</style>