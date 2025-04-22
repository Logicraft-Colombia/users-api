<template>
  <header>
    <ul>
      <li v-if="session" >
        <NuxtLink to="/home">Home</NuxtLink>
      </li>
      <li  v-if="session" >
        <NuxtLink @click="logout">Logout</NuxtLink>
      </li>
    </ul>

  </header>
</template>

<script lang="ts" setup>
const { auth } = useSupabaseClient();
const router = useRouter();    
const session = useSupabaseSession();
const {locale} = useI18n();

const logout = () => {
  auth.signOut();
  session.value = null; // Clear the session
  router.push(`${locale.value}/auth/sign-in`); // Redirect to the sign-in page
};
</script>