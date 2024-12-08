<script setup lang="ts">
import { ref } from "vue";
import TextField from "../../components/ui/TextField.vue";
import PaperTextField from "@/components/paperui/PaperTextField.vue";
import PaperButton from "@/components/paperui/PaperButton.vue";
import { useAuth } from "../../hooks/auth/useAuth";

// hooks
const { login, loading, error } = useAuth();

// state
const password = ref("");
const email = ref("");
// const loading = ref(false);

// handlers
const submitForm = async () => {
  await login({
    email: email.value,
    password: password.value
  })
}

</script>
<template>
  <div class="flex items-center justify-center min-h-96 max-h-screen bg-white">
    <div class="w-full max-w-md p-8 flex flex-col text-center">
      <h1 class="text-3xl font-bold text-black text-center mb-6">
        Login
      </h1>
      <form @submit.prevent="submitForm">
        <div class="mb-2">
          <PaperTextField v-model="email" placeholder="email" />
        </div>
        <div class="mb-2">
          <PaperTextField type="password" v-model="password" placeholder="password" />
        </div>
        {{ error }}
        <PaperButton :loading="loading" type="submit" variant="primary" block>Login</PaperButton>
      </form>
      <div class="pt-4">
        <RouterLink to="/register"
          class="focus:outline-none text-black cursor-pointer decoration-solid underline decoration-black">
          Register
        </RouterLink>
      </div>
    </div>
  </div>
</template>
