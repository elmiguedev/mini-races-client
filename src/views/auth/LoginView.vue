<script setup lang="ts">
import { ref } from "vue";
import TextField from "../../components/ui/TextField.vue";
import Button from "../../components/ui/Button.vue";
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
    <div class="w-full max-w-md p-8">
      <h1 class="text-3xl font-bold text-black text-center mb-6 font-mono">
        Login
      </h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <TextField v-model="email" border-style="dashed" placeholder="email" />
        </div>
        <div class="mb-6">
          <TextField type="password" border-style="dashed" v-model="password" placeholder="password" />
        </div>
        {{ error }}
        <Button type="submit" :loading="loading">Login</Button>
      </form>
      <RouterLink to="/register"
        class="flex w-full text-center justify-center items-center mt-4 cursor-pointer decoration-solid underline decoration-black"
        :class="{ 'font-bold text-gray-800': $route.path === '/register' }">
        Register
      </RouterLink>
    </div>
  </div>
</template>
