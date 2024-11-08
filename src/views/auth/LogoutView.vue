<script setup lang="ts">
import { useAuth } from '../../hooks/auth/useAuth';
const { logout } = useAuth();
logout();
</script>
<template>
</template>