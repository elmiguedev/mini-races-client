// FloatingChatButton.vue
<template>
  <div class="floating-chat-button">
    <button @click="toggleChat" class="btn btn-primary">
      <i class="fas fa-comment"></i>
    </button>
    <div v-if="showChat" class="card p-3 popover-chat">

      <!-- header -->
      <div class="flex flex-row items-center justify-between mb-3">
        <h5>Chat</h5>
        <button @click="toggleChat" class="close">&times;</button>
      </div>

      <!-- messages -->
      <div class="flex flex-col">
        <span class="badge bg-primary mr-auto mb-1 text-left" v-for="(message, index) in messages" :key="index">
          {{ message }}
        </span>
      </div>

      <!-- input -->
      <div class="">
        <input class="form-control" v-model="newMessage" type="text" placeholder="Escribe un mensaje...">
        <button @click="sendMessage" class="btn btn-primary">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showChat = ref(false);
const messages = ref<string[]>([]);
const newMessage = ref('');

const toggleChat = () => {
  showChat.value = !showChat.value;
}

const sendMessage = () => {
  messages.value.push(`${newMessage.value}`);
  newMessage.value = '';
}
</script>

<style scoped>
.floating-chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.popover-chat {
  position: absolute;
  bottom: 60px;
  right: 20px;
  width: 250px;
}
</style>