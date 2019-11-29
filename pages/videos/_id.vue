<template>
	<div>
		<nuxt-child :video="video" />
		<!-- <nuxt-child :video="$store.state.currentVideo" /> -->
		<!-- svim cajldovima prosledimo video proprs tj ovu computed vrednost, a childovi su edit.vue i index.vue -->
		<!-- napravili smo _id.vue da ne bismo morali za svaki _id/edit.vue, _id/index.vue da ucitavamo niz u data i onda onu computed vrednost vec prosdledjujemo kao props iz _id.vue preko nuxt-child, a edit.vue i index.vue ssu childovi za _id.vue jer su _id folder i _id.vue fajl na istom nivou -->
	</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
	head() { // kada koristimo js kod u headu onda head pretvaramo iz propertija u fju, i dodajemo return {} u kom stavljamo head podatke
		return {
			// title: `${this.video.name} - Vue screencasts` // !a sta ako hocemo `Watch ${this.video.name} - Vue screencasts` i `Edit ${this.video.name} - Vue screencasts`, dakle da se ovo Watch i Edit menjaju, ostalo isto? U tu svrhu koristicemo titleTemplate i %s umesto title, i u pages/videos/edit.vue dodamo head: { title: 'Edit' } i u pages/videos/index.vue dodamo head: { title: 'Watch' }, a ako title nije definisan ono ce koristiti difoltno, zato treba bar da definisemo tipa title: ''. VAZNO, samo jedan titleTemplate moze biti aktivan
			title: '', //! stavili smo prazan title ovde za slucaj da zab u childovima (pages/videos/_id/edit i pages/videos/_id) gde zelimo da upotrebimo ovaj titleTemplate zab da stavimo tile za %s on onda prikaze difoltni (koji je u nuxt.config.js), a ako ovde u parentu stavimo empty string onda on koristi ovaj titleTemplate ali bez ovog dela gde je $s samo ostatak recenice, sto je opet da kazem bolje za crawler nego da koristi difoltni. samo jedan titleTemplate moze biti aktivan u isto vreme, tipa ne mozemo otici sad u pages/videos.vue i definisati titleTemplate, msm kao moze al je skroz nakaradno
			titleTemplate: `%s ${this.video.name} - Vue screencasts`
			// titleTemplate: `%s ${this.$store.state.currentVideo.name} - Vue screencasts`
		}
	},

	//? bez apija
	// data() {
	// 	return {
	// 		videos: [
	// 			{ id: '16', name: 'Intro to NuxtJS'},
	// 			{ id: '1', name: 'Intro to VueJS'},
	// 			{ id: '71', name: 'Advanced Techniques for Library X'},
	// 		] 
	// 	}
	// },
	computed: {
		// video() {
		// 	return this.videos.find(v => v.id == this.$route.params.id)
		// }

		// video() {
		// 	return this.$store.state.currentVideo
		// }

		...mapState({
			video: 'currentVideo' // isto sto i return this.$store.state.currentVideo ali sa mapState
		})
	},

	//? sa apijem
	// async asyncData({$axios, params}) { // ovo je iz contexta
	// 	let response = await $axios.get(`/videos/${params.id}`) // baseURL: 'http://localhost:3000/api', ali mi nemamo bas taj api, tako da jbg
	// 	let video = response.data.data.attributes

	// 	return {
	// 		video
	// 	}
	// },

	//? sa apijem i kroz store:
	async fetch({$axios, params, store}) { // fetch je hook kao asyncData ali umesto da vraca podatke kao hash on omogucava da radis stvari
		let response = await $axios.get(`/videos/${params.id}`) // baseURL: 'http://localhost:3000/api', ali mi nemamo bas taj api, tako da jbg
		let video = response.data.data.attributes
		
		store.commit('SET_CURRENT_VIDEO', video) // gore u tempalte gde je :video="video" stavljamo :video="$store.state.currentVideo" i isto i gore u head za title gde je this.video.name, ILI mozemo napraviti computed vrednost video() { return this.$store.state.currentVideo } i onda opet zvati video
	},

}
</script>

<style>

</style>