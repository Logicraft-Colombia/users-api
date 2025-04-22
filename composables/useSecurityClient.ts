
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useMainStore } from '~/store/main';

interface SignInOptions {
	username: string;
	password: string;
}

interface SignUpOptions {
	username: string;
	password: string;
	name: string;
	lastName: string;
}

export const useSecurityClient = () => {
	
	const { auth } = useSupabaseClient();
	const {enableLoader, disableLoader, showAlert} = useMainStore(); // get the main store instance
	return {
		auth: {
			signInWithPassword: async (credentials: SignInOptions) => {
				const {username, password} = credentials;
				try {
					enableLoader(); // enable the loader before the sign-in process
					const { error, data } = await auth.signInWithPassword({
						email: username,
						password: password
					});
					if (error) {
						throw error;
					}
					return data;
				} catch (error) {
					showAlert({
						type: 'error',
						message: 'Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.',
						title: 'Error de inicio de sesión'
					}); // show error message
					return null;
				} finally {
					disableLoader(); // disable the loader after the sign-in process
				}
			},
			signUp: async (credentials: SignUpOptions) => {
				try {
					const { error, data } = await auth.signUp({
						phone: `+57${credentials.username}`,
						password: credentials.password,
						options: {
							channel: 'sms',
							data: {
								first_name: credentials.name,
								last_name: credentials.lastName
							}
						}
					})
					if (error) {
						throw error;
					}
					return data;
				} catch (error) {
					console.error("Sign-up error:", error);
					return null;
				}
			}
		},
	};
};
