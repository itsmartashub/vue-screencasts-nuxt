<template>
	<!-- <video-player
				ref="videoPlayer"
				:options="playerOptions"
				@ended="markPlayed"
			></video-player> -->
			<!-- //! pojavi se error 'window is not defined' jer je ovo server side rendering zato smo za razliku od Vue projecta ovde video-player malo drugacije odradili, koristimo v-video-player direktivu, srecom devs su se potrudili da naprave SSR video-player -->
	<div class="video-player-box" v-video-player:videoPlayer="playerOptions"></div>
		<!-- @ended="markPlayed" -->
</template>

<script>
	// import { videoPlayer } from 'vue-video-player' // yarn add vue-video-player --save
	import 'video.js/dist/video-js.css'
	import Vue from 'vue'
	
	//? mount with SSR
	if (process.browser) {
		const VueVideoPlayer = require('vue-video-player/dist/ssr')
		Vue.use(VueVideoPlayer)
	}

	export default {
		name: 'VideoWatch',
		props: ['video'],

		computed: {
			playerOptions() { // https://www.npmjs.com/package/vue-video-player
				return {
					// muted: true,
					language: 'en',
					playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
					sources: [{
						type: "video/mp4",
						src: this.video.videoUrl
					}],
					poster: this.video.thumbnail,
					fluid: true // da se video shrinkuje po potrebi
				}
			},
		},
	}
</script>