<template>
	<v-container grid-list-xs>
		<!-- //? **************** /watch/88 **************** -->
		<v-row>
			<v-col md="9" cols="12">
				<VideoWatch :video="video" />
			</v-col>

			<v-col md="3" cols="12">
				<div class="display-1">{{ video.name }}</div>
				<VideoByline :video="video" />


				<div v-if="isPlayed(video.id)" class="red--text">
					<font-awesome-icon icon="check" /> Played
				</div>
				<div v-else>
					<v-btn x-small @click="markPlayed" color="red lighten-1" class="mt-2 mb-5" dark v-if="$auth.loggedIn">Mark Played</v-btn>
				</div>


				<MarkdownDisplay :markdown="video.description" />


				<span v-for="tag_id in video.tag_ids" :key="tag_id">
					<v-btn
						color="#00c58e"
						class="ma-1 mb-2"
						dark
						:to="`/tags/${tag_id}`"
					>
						<!-- {{ getTag(tag_id) && getTag(tag_id).name }} -->
						<!-- //* brisemo ovo getTag(tag_id) jer ponekad se pojavi neki error dok se ne ucita sve, medjutim, sa nuxt se ne ucitava dok se prvo sve ne renderuje na serveru, zato nece biti errora i mozemo da obrisemo taj deo -->
						{{ getTag(tag_id).name }}
					</v-btn>
				</span>
			</v-col>

		</v-row>

		<v-row>
			<v-col cols="12">
				<h1>Code Summary</h1>
				<MarkdownDisplay :markdown="video.code_summary" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import VideoByline from '@/components/VideoByline'
	import VideoWatch from '@/components/VideoWatch'
	import MarkdownDisplay from '@/components/MarkdownDisplay'
	
	import { mapState, mapGetters } from 'vuex'

	export default {

		name: 'Watch',
		components: {
			// videoPlayer,
			VideoByline,
			VideoWatch,
			MarkdownDisplay
		},

		// async fetch({store, params}) { //? premesteno u middleware
		// 	// await store.dispatch('loadOneVideo', { videoID: params.id })

		// 	await store.dispatch('loadAllVideos')
		// 	await store.dispatch('loadAllTags')
		// },

		computed: {
			...mapGetters({
				isPlayed: 'user/videoIsPlayed'
			}),
			...mapState({
				tags: state => state.tags.tags,
				videos: state => state.videos.videos
			}),

			video() {
				return this.videos.find(v => v.id == this.$route.params.id)
			},
		},

		methods: {
			getTag(IDtag) {
				return this.tags.find(t => t.id == IDtag)
			},
			markPlayed() {
				this.$store.dispatch('user/markVideoPlayed', this.video.id)
			}
		},
	}
</script>