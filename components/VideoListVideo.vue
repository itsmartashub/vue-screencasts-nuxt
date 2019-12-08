<template>
	<!-- <client-only> -->
	<v-card
		width="340px"
		hover
		class="ma-2"
	>
		<!-- :to="`/watch/${video.id}`" -->
		<nuxt-link :to="{ path: `/watch/${video.id}` }">

			<v-img :src="video.thumbnail || ''" />
			<v-card-title v-if="video.name" class="title-color">{{ video.name }}</v-card-title>
			<!-- ovo v-if je samo zbog errora u konzoli da ne moze da pronadje vrednost 'name' of undefined, valjda se jos nije ucitalo i onda prikaze err bzvz, zatyo samo ovaj v-if -->

			<v-card-text>
				<VideoByline :video="video" />

				<div v-if="isPlayed(video.id)" class="red--text">
					<font-awesome-icon icon="check" /> Played
				</div>
			</v-card-text>
		</nuxt-link>

		<v-card-actions class="d-flex flex-wrap">
			<span v-for="tag_id in video.tag_ids" :key="`${video.id}-${tag_id}`">
				<v-btn
					color="#00c58e"
					class="mr-2"
					small
					dark
					@mousedown.stop
					:to="`/tags/${tag_id}`"
				>
					{{ getTag(tag_id).name }}
				</v-btn>
			</span>
		</v-card-actions>
	
	</v-card>
	<!-- </client-only> -->

</template>

<script>
	import { mapGetters } from 'vuex'
	import VideoByline from '@/components/VideoByline'

	export default {
		name: 'VideoListVideo',
		components: { VideoByline },
		
		props: ['video', 'tags'],


		computed: {
			...mapGetters({
				// getTag: 'tags/get', 
				isPlayed: 'user/videoIsPlayed'
			}),
			// getTag(tagID) {
			// 	return this.tags.find(t => t.id == tagID)
			// }
		},

		methods: {
			getTag(IDtag) {
				// console.log(IDtag, this.tags) // sve je ovo bilo na serveru i nije prikazivao nista u konzoli, ni ovaj log ni errors, vec moramo otici na drugu stranicu pa onda opet na ovu tj onu gde se koristi ova komponenta
				return this.tags.find(t => t.id == IDtag)
			}
		},
	}
</script>

<style scoped>
	a {
		text-decoration: none;
		color:black;
	}

	.title-color {
		color: #35495e !important;
	}
</style>