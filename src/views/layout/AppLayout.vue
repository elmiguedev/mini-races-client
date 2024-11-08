<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import UserHeader from '../../components/users/UserHeader.vue';
import NavHeader from './components/NavHeader.vue';


</script>


<template>
  <div class="px-40 font-mono">
    <NavHeader />
    <UserHeader />
    <div class="pt-10">
      <RouterView />
    </div>
  </div>
</template>
