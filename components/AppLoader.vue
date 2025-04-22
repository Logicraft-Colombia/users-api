<template>
  <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
    <div class="relative">
      <img src="~/assets/img/isologo.webp" class="w-20 h-20 animate-pulse absolute inset-0 m-auto block dark:hidden">
      <img src="~/assets/img/isologo-white.webp" class="w-20 h-20 animate-pulse absolute inset-0 m-auto hidden dark:block">
      <div class="relative w-32 h-32">
        <div
          class="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-primary border-b-primary animate-spin"
          style="animation-duration: 3s;"
        ></div>
        <div
          class="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-primary animate-spin"
          style="animation-duration: 2s; animation-direction: reverse;"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '~/store/main';
const { loading } = storeToRefs(useMainStore());
</script>