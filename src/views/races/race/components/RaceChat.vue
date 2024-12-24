<script setup lang="ts">
import { ref, defineProps } from 'vue';
import IconChat from '../../../../components/icons/IconChat.vue';
import { useAuth } from '../../../../hooks/auth/useAuth';
import ChatMessageBubble from './ChatMessageBubble.vue';
import type { ChatMessage } from '../../../../core/domain/race/ChatMessage';

const props = defineProps({
  messages: Array<ChatMessage>,
})

const emit = defineEmits(["send"]);


const { user } = useAuth();

const showChat = ref(false);
const newMessage = ref('');

const toggleChat = () => {
  showChat.value = !showChat.value;
}

const sendMessage = () => {
  // messages.value.push({
  //   name: user.name ?? 'User',
  //   message: newMessage.value
  // });
  // newMessage.value = '';
  emit("send", newMessage.value);
  newMessage.value = "";
}


</script>

<template>
  <div class="floating-chat-button">
    <button @click="toggleChat" class="btn btn-primary">
      <IconChat class="w-6 h-6" />
    </button>
    <div v-if="showChat" class="card p-3 popover-chat">

      <!-- header -->
      <div class="flex flex-row items-center justify-between mb-3">
        <h5>Chat</h5>
        <button @click="toggleChat" class="close">&times;</button>
      </div>

      <!-- messages -->
      <div class="flex flex-col">
        <ChatMessageBubble v-for="(message, index) in messages" :message="message" :owner="message.name === user?.name"
          :key="index" />
      </div>

      <!-- input -->
      <div class="mt-3">
        <input class="form-control" v-model="newMessage" type="text" placeholder="Escribe un mensaje..."
          @keydown.enter="sendMessage">
      </div>
    </div>
  </div>
</template>



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