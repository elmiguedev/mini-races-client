<script setup lang="ts">
import { ref } from "vue";

import PaperTextField from "@/components/ui/TextField.vue";
import PaperButton from "@/components/ui/Button.vue";

// state
const password = ref("");
const email = ref("");
const loading = ref(false);

// handlers
const submitForm = async () => {

}

</script>
<template>
  <div class="flex items-center justify-center min-h-96 max-h-screen bg-white">
    <div class="w-full max-w-md p-8 flex flex-col text-center">
      <h1 class="text-3xl font-bold text-black text-center mb-6">
        Register
      </h1>
      <form @submit.prevent="submitForm">
        <div class="mb-2">
          <PaperTextField v-model="email" placeholder="email" />
        </div>
        <div class="mb-2">
          <PaperTextField type="password" v-model="password" placeholder="password" />
        </div>
        <!-- {{ error }} -->
        <PaperButton :loading="loading" type="submit" variant="primary" block>Register</PaperButton>
      </form>
      <div class="pt-4">
        <RouterLink to="/login"
          class="focus:outline-none text-black cursor-pointer decoration-solid underline decoration-black">
          Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>
