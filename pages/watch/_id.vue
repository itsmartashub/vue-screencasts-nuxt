<template>
	<v-container grid-list-xs>
		<!-- **************** /watch/5 **************** -->
		<v-row>
			<v-col md="9" cols="12">
				<!-- <video-player
					ref="videoPlayer"
					:options="playerOptions"
					@ended="markPlayed"
				></video-player> -->
				<!-- pojavi se error 'window is not defined' jer je ovo server side rendering zato smo za razliku od Vue projecta ovde video-player malo drugacije odradili, koristimo v-video-player direktivu, srecom devs su se potrudili da naprave SSR video-player -->

				 <div
				 	class="video-player-box"
					v-video-player:videoPlayer="playerOptions"
				>
               <!-- @ended="markPlayed" -->
				</div>
			</v-col>

			<v-col md="3" cols="12">
				<div class="display-1">{{ video.name }}</div>

				<!-- <div v-if="isPlayed(video.id)" class="red--text">
					<font-awesome-icon icon="check" /> Played
				</div>
				<div v-else>
					<v-btn x-small @click="markPlayed" color="red lighten-1" class="mt-2 mb-5" dark v-if="currentUser.name">Mark Played</v-btn>
				</div> -->

				<div v-html="video.description"></div>

				<span v-for="tag_id in video.tag_ids" :key="tag_id">
					<v-btn
						color="#00c58e"
						class="ma-1 mb-2"
						dark
						:to="`/tags/${tag_id}`"
					>
						<!-- {{ getTag(tag_id) && getTag(tag_id).name }} -->
						<!-- brisemo ovo getTag(tag_id) jer ponekad se pojavi neki error dok se ne ucita sve, medjutim, sa nuxt se ne ucitava dok se prvo sve ne renderuje na serveru, zato nece biti errora i mozemo da obrisemo taj deo -->
						{{ getTag(tag_id).name }}
					</v-btn>
				</span>
			</v-col>

		</v-row>
	</v-container>
</template>

<script>
import 'video.js/dist/video-js.css'
// import { videoPlayer } from 'vue-video-player' // yarn add vue-video-player --save
// import { mapGetters, mapState } from 'vuex'
import Vue from 'vue'

//? mount with SSR
if (process.browser) {
	const VueVideoPlayer = require('vue-video-player/dist/ssr')
	Vue.use(VueVideoPlayer)
}

export default {
	name: 'VideoWatch',
	components: {
		// videoPlayer,
	},

	async asyncData({$axios, params}) {
		let response = await $axios.get(`/videos/${params.id}`)

		//? video singular
		let video = response.data.data
		video.attributes.tag_ids = video.relationships.tags.data.map(t => t.id)

		//? tags
		let tags = response.data.included
		tags.forEach(t => {
			t.attributes.id = t.id;
		})

		return {
			video: video.attributes,
			tags: tags.map(t => t.attributes)
		}
	},

	computed: {
		// video() {
		// 	return this.videos.find(v => v.id == this.$route.params.id) || {}
		// },

		// ...mapGetters({
		// 	getTag: 'tags/get',
		// 	isPlayed: 'users/videoIsPlayed'
		// }),
		// ...mapState({
		// 	videos: state => state.videos.videos,
		// 	currentUser: state => state.users.currentUser
		// }),
		
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

	methods: {
		// markPlayed() {
		// 	this.$store.dispatch('users/markVideoPlayed', this.video.id)
		// }
		getTag(tagID) {
			return this.tags.find(t => t.id == tagID)
		}
	},
}
</script>