<script setup>
import { RouterLink, RouterView } from "vue-router";
import Description from "./components/Description.vue";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <Description msg="Task Manager" />

      <nav>
        <RouterLink to="/" class="router-link">View Tasks</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style src="./assets/styles/App.css"></style>
<style src="./assets/styles/Description.css"></style>
<style src="./assets/styles/modalStyles.css"></style>
<style src="./assets/styles/tableStyles.css"></style>
<style src="./assets/styles/buttonStyles.css"></style>
<style src="./assets/styles/colors.css"></style>
