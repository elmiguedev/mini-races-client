<template>
  <div class="flex flex-col">
    <div class="flex flex-row items-center ">
      <strong>Id: </strong>
      <span>{{ car?.id }}</span>
    </div>
    <div class="flex flex-row items-center ">
      <strong>Color: </strong>
      <span>{{ car?.color }}</span>
    </div>
    <div class="flex flex-row items-center ">
      <strong>Body: </strong>
      <span>{{ car?.CarSlot?.find((slot: any) => slot.type === 'body')?.CarPart?.CarPartModel?.name }}</span>
    </div>
    <div class="flex flex-row items-center ">
      <strong>Engine: </strong>
      <span>{{ car?.CarSlot?.find((slot: any) => slot.type === 'engine')?.CarPart?.CarPartModel?.name }}</span>
    </div>
    <div class="flex flex-row items-center ">
      <strong>Wheels: </strong>
      <span>{{ car?.CarSlot?.find((slot: any) => slot.type === 'wheels')?.CarPart?.CarPartModel?.name }}</span>
    </div>
    <div class="flex flex-row items-center ">
      <strong>Spoiler: </strong>
      <span>{{ car?.CarSlot?.find((slot: any) => slot.type === 'spoiler')?.CarPart?.CarPartModel?.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  car: Object as PropType<any>,
})
</script>

<style></style>