<template>
  <AppLoader/>
  <AppAlert/>
  <AppHeader/>
  <UContainer class="flex-1 flex flex-col justify-center items-center">
      <div class="w-full max-w-4xl mx-auto px-4 py-8">
        <slot />
      </div>
  </UContainer>
  <AppFooter />
</template>


<script lang="ts" setup>
import AppLoader from '~/components/AppLoader.vue';
</script>