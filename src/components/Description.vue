<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="site-title">{{ msg }}</h1>
    <h3>A simple CRUD application for a task manager</h3>
  </div>
</template>
