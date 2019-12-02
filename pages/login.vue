<template>
	<v-container grid-list-xs>
		<UserAuthForm buttonText="Login" :submitForm="loginUser" />
	</v-container>
</template>

<script>
	import UserAuthForm from '@/components/UserAuthForm'

	export default {
		name: 'Login',
		components: { UserAuthForm },

		methods: {
			async loginUser(loginInfo) {
				try {
					await this.$auth.loginWith('local', {
						data: loginInfo
					})

					this.$store.dispatch('snackbar/setSnackbar', {text: `Thanks for signing in, ${this.$auth.user.name}`}) //! zato sto imamo gore iznad await, znamo da ce ovde u ovom delu uspesno se znaci logovati i imacemo pristup name propertyju u $auth.user
					this.$router.push('/')
					
				} catch (error) {
					// console.log(error)
					this.$store.dispatch('snackbar/setSnackbar', {text: 'There was an issue signing in. Please try again.', color: 'red'})
				}
			}
		},
	}
</script>