<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type PropType } from 'vue';
import { StartScene } from './scenes/StartScene';
import { MainScene } from './scenes/MainScene';

const game = ref();

onMounted(() => {
  game.value = new Phaser.Game({
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: "game",
    backgroundColor: '#ffffff',
    render: {
      pixelArt: true,
      transparent: true
    },
    scene: [
      StartScene,
      MainScene
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
canvas {
  width: 640px;
  height: 480px;
}
</style>