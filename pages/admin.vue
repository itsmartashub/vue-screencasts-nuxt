<template>
<!-- //? **************** /admin **************** -->
	<v-container>
		<v-tabs color="#00c58e">
			<v-tab to="/admin/videos">Videos</v-tab>
			<v-tab to="/admin/tags">Tags</v-tab>
		</v-tabs>
		<!-- //* ne vidimo childrene ove /admin rute-komponente, zato nam treba router-view koji ce prikazati sve childrene, dakle /admin/tags, /admin/videos, /admin/videos/new, /admin/videos/88, /admin/videos/88/edit -->
		<router-view></router-view>
	</v-container>
</template>

<script>
export default {
	name: 'Admin',
	// middleware: ['auth', 'admin'] //! BITNO, ovo ce sa nuxt auth automatski sam da redirektuje na login page ako korisnik nije autorizovan iliti ulogovan, wowww, i ne moze ni kad u url ukucamo neku admin url adresu, tj childovi i to (recimo /admin/videos). ali mi nije jasno kako on zna da treba da redirektuje na /login bas. MEDJUTIM, ovo nije sasvim dobro, jer recimo i kada se ulogujemo i kao NE ADMIN tj kao korisnik BEZ ADMIN PRIVILEGIJA (ili kada se registruje novi korisnik) ima pristup ADMIN PANELU sto ne zelimo, ofc, zato moramo mi napraviti nas neki custom middleware:
		//! to mozemo da uradimo na dva nacina, da ovom auth pridruzimo recimo 'admin' middleware, da se prvo odradi 'auth', pa 'admin', ili da kreiramo potpuno novi 'auth-admin' recimo, sto ima mng vise logike nego ovo prethodno
		middleware: ['auth-admin']
}
</script>