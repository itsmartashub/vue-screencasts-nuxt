export default async function({$auth, redirect, store}) {
	let user = $auth.$state.user // kaze $auth.state da je deprecated
	
	if (user && user.admin) {
		// let the user in
	} else {
		// redirect them to '/'
		store.dispatch('snackbar/setSnackbar', {text: 'You must be an admin to view that page', color: 'red'})
		redirect('/')
	}
}