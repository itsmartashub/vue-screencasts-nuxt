<template>
	<v-container grid-list-xs>
		<UserAuthForm buttonText="Register" :submitForm="registerUser" :hasName="true" />
	</v-container>
</template>

<script>
	import UserAuthForm from '@/components/UserAuthForm'
	import { userInfo } from 'os'

	export default {
		name: 'Register',
		components: { UserAuthForm },

		methods: {
			async registerUser(registrationInfo) {
				


				try {
					await this.$axios.post('/users', registrationInfo)

					await this.$auth.loginWith('local', { //! za loginWith imamo dva argumenta, prvi je strategija koju koristimo, u ovom slucaju 'local' (moze github, facebook..), a drugi je hash {}, key y hashu je data a popunjavamo email i password ili username i password, koji god login info MI zelimo. potom, da bi ovo radilo moramo da setujemo endpoinst u nuxt.config.js tamo gde je auth
						data: registrationInfo //! iako na registrationInfo ima name, loginWith ce samo da ga ignorise i logovace novokreiranog korisnika
					})

					this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing up, ${this.$auth.user.name}`}) //! zato sto imamo gore iznad await, znamo da ce ovde u ovom delu uspesno se znaci logovati i imacemo pristup name propertyju u $auth.user
					this.$router.push('/')
					
				} catch (error) {
					this.$store.dispatch('snackbar/setSnackbar', {text: 'There was an issue signing up. Please try again.', color: 'red'})
				}
			}
		},
	}
</script>