<template>
	<div>
		<nuxt-child />
		 <!-- ovo je poput router-view,i zahvaljujuci ovome na /videos/1 ruti vidimo i onaj template iz videos/1.vue, bez ovog nismo videli, valjda je samo uzitavao videos.vue, ne razumem. sad smo videos.vue premestili u videos/ tj sad imamo index.vue -->

		<h1>Videos</h1>
		<div v-for="video in $store.state.videos" :key="video.id">
			<nuxt-link :to="`/videos/${video.id}`">{{ video.name }}</nuxt-link>
		</div>

		
	</div>
</template>

<script>
export default {
	head: {
		title: 'Vue Screencasts - Video List'
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

	//? sa apijem
	// async asyncData({$axios}) { //* vraca vrednost i postavlja je u data. asyncData() je za data koje ppvlacimo sa servera, a data() je za static. asyncData() nece prikazati template dokle god Promise nije returnovana, dakle sa axiosom se ona automatski vrati, samo stavimo return na kraju, a inace mozemo da koristimo new Promise((resolve, reject) => {...})
	// 	let response = await $axios.get('/videos') // baseURL: 'http://localhost:3000/api', ali mi nemamo bas taj api, tako da jbg
	// 	console.log(response)
	// 	let videos = response.data.data.map(v => v.attributes)
	// 	debugger
	// 	return {
	// 		videos
	// 	}
	// },

	//? sa apijem i kroz store:
	async fetch({$axios, store}) { // fetch je hook kao asyncData ali umesto da vraca podatke kao hash {} on omogucava da radis stvari
		let response = await $axios.get('/videos') // baseURL: 'http://localhost:3000/api', ali mi nemamo bas taj api, tako da jbg
		let videos = response.data.data.map(v => v.attributes)
		
		store.commit('SET_VIDEOS', videos) // ovde nam ne treba return vrednost kao u asyncData jer vracamo podatke direkt iz store-a. gore u template gde smo napisali video in videos, umesto videos pisemo $store.state.videos
	},

}
</script>

<style>

</style>