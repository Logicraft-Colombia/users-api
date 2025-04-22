<template>
  <div class="h-96 flex items-center justify-center mt-20 ">
    <div class="relative">
      <div
        class="hidden md:block absolute -top-1 -left-1 -right-1 -bottom-1 rounded-lg shadow-lg animate-pulse bg-gradient-to-r from-app-primary via-app-secondary to-app-primary dark:from-white dark:via-app-primary dark:to-white">
      </div>

      <div id="form-container"
        class="dark:bg-gray-900 bg-white p-12 rounded-lg shadow-2xl w-96 relative z-10 transform transition duration-500 ease-in-out">
        <h1 id="form-title" class=" text-center text-3xl font-extrabold my-10 dark:text-white text-app-primary">
          LogiShipping</h1>
        <h2 class="text-center text-2xl font-semibold dark:text-white text-app-primary">Bienvenido</h2>
        <h2 class=" w-full text-center text-xl font-medium mb-5 dark:text-gray-300 text-app-primary">Ingresa tu
          información para iniciar
          sesión</h2>
        <UForm :schema="schema" :state="model" class="space-y-5 items-center justify-center"
          @submit.prevent="verifyOtp">
          <div class="space-y-5 items-center justify-center">
            <AppInput id="password" name="password" v-model="model.otp" type="tel" label="OTP"
              append-icon="heroicons:lock-closed" label-input="######" required />
          </div>
          <UButton class="dark:hover:bg-app-primary dark:hover:text-white dark:bg-white hover:bg-app-primary-900"
            type="submit" size="md" block label="Verificar" color="primary"
            icon="heroicons:arrow-right-end-on-rectangle" />
        </UForm>
      </div>
    </div>
  </div>

</template>

<style></style>

<script lang="ts" setup>
import { z } from 'zod'
const { auth } = useSupabaseClient();

const schema = z.object({
  username: z.string().min(10, 'Must be at least 10 characters'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

const model = reactive({
  otp: '',
  username: '',
  password: '',
});
const router = useRouter();

const attempLogin = async () => {

  if (true) {
    await auth.signUp({
      phone: `+57${model.username}`,
      password: model.password,
      options: {
        channel: 'sms',
        data: {
          first_name: 'Jonathan',
          last_name: 'Barrera',
        }
      }
    })
  }

  const { error } = await auth.signInWithPassword({
    email: model.username,
    password: model.password
  })
  if (error) console.log(error)
  else router.push('/home')
};


const verifyOtp = async () => {
  await auth.verifyOtp({
    type: 'sms',
    phone: `+57${model.username}`,
    token: model.otp
  })
};
</script>