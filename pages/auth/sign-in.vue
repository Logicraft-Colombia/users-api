<template>
  <div class="h-96 flex items-center justify-center mt-20 ">
    <div class="relative">
      <div
        class="hidden md:block absolute -top-1 -left-1 -right-1 -bottom-1 rounded-lg shadow-lg animate-pulse bg-gradient-to-r from-primary via-secondary to-primary dark:from-white dark:via-primary dark:to-white">
      </div>

      <div id="form-container"
        class="dark:bg-gray-900 bg-white p-12 rounded-lg shadow-2xl w-96 relative z-10 transform transition duration-500 ease-in-out">
        <h1 id="form-title" class=" text-center text-3xl font-extrabold dark:text-white text-primary">
          LogiShipping</h1>
        <h2 class="text-center text-2xl font-semibold dark:text-white text-primary">{{ $t('welcome')}}</h2>
        <h2 class="w-full text-center text-xl font-medium mb-5 dark:text-gray-300 text-primary">Ingresa tu
          información para iniciar
          sesión</h2>
        <UForm :schema="schema" :state="model" class="space-y-5 items-center justify-center"
          @submit="attempLogin">
          <div class=" space-y-5 items-center justify-center">
            <AppInput id="email" name="email" v-model="model.email" type="email" :label="$t('login.email')"
              append-icon="i-lucide-at-sign" label-input="email@email.com" required/>
            <AppInput id="password" name="password" v-model="model.password" type="password" :label="$t('login.password')"
              append-icon="i-lucide-lock" label-input="********" required />
          </div>
          <UButton class="dark:hover:bg-primary dark:hover:text-white dark:bg-white hover:bg-primary-800" type="submit"
            size="md" block :label="$t('login.loginButton')" color="primary" icon="i-lucide-log-in" />
          <!--<UButton type="button" size="md" block label="Iniciar Sesión con Google" icon="i-logos-google-icon"
            variant="outline" /> -->
          <USeparator color="primary">
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ $t('login.noAccount') }}
              <UButton class="text-xs text-primary dark:text-white hover:text-primary-800"
                :label="$t('login.signUpButton')" color="primary" variant="ghost" 
                :to="$localeRoute('auth-sign-up')" />
            </p>
          </USeparator>
        </UForm>
        
    
      </div>
    </div>
  </div>
</template>

<style></style>

<script lang="ts" setup>
import { z } from 'zod'
const { auth } = useSecurityClient();
const localePath = useLocalePath();
const { t } = useI18n()

const schema = z.object({
  email: z.string().email(t('validations.email')),
  password: z.string().min(8, t('validations.minLength', { min: 8 }))
})

const model = reactive({
  otp: '',
  email: '',
  password: '',
});
const router = useRouter();
const attempLogin = async () => {
  const data = await auth.signInWithPassword({
    username: model.email,
    password: model.password
  });
  if (data?.user) {
    // Redirect to the dashboard or another page after successful login
    router.push(localePath('/home'));
  }
};
</script>