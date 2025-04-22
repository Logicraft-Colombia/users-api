
const PUBLIC_PAGES = ['auth-sign-in', 'auth-sign-up', 'auth-verify-otp'];
export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = useSupabaseSession();
	const localePath = useLocalePath(); // 👈 para redirigir a la ruta correcta según el idioma
  const pageName = to.name?.toString().split('___')[0] ?? '';
  const isPublicPage = PUBLIC_PAGES.includes(pageName);

  if (!session.value && !isPublicPage) {
    return navigateTo(localePath('/auth/sign-in'));
  }

  if (session.value && pageName === 'auth-sign-in') {
    return navigateTo(localePath('/home'));
  }
  // No redirigir si ya está bien
  return; 
})