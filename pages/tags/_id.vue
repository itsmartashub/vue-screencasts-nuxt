<template>
	<div>
	<!-- **************** /tags/5 **************** -->
		<h1 class="display-3 ma-4 d-flex justify-center">Videos with Tag "{{ tag.name }}" </h1>

		<div class="d-flex flex-wrap justify-center">
			<div v-for="video in videos" :key="video.id">
				<VideoListVideo :video="video" :tags="tags"></VideoListVideo>
			</div>
		</div>
	</div>
</template>

<script>
import VideoListVideo from '@/components/VideoListVideo'
import { mapState } from 'vuex'

export default {
	components: { VideoListVideo },

	async fetch({store, params}) {
		await store.dispatch('loadTagAndRelationships', { tagID: params.id })

		// await store.dispatch('loadAllVideos')
		// await store.dispatch('loadAllTags')



		// let response = await $axios.get(`/tags/${params.id}`)

		// let tag = response.data.data
		// tag.attributes.id = tag.id

		// let videosOnTag = response.data.included.filter(i => i.type === 'video') // ovo ce da vrati nekoliko videa. svakom tom videu ce trebati tag_ids niz koji bi im trebalo dodati bas kao u home page (pages/index.vue):
		// videosOnTag.forEach(v => {
		// 	v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
		// })

		// let tags = response.data.included.filter(i => i.type === 'tag')
		// tags.forEach(t => {
		// 	t.attributes.id = t.id
		// })

		
		// // debugger
		// return {
		// 	tag: tag.attributes,
		// 	videosOnTag: videosOnTag.map(vot => vot.attributes),
		// 	tags: tags.map(t => t.attributes) // ovi attributes nemaju id included kao video pa smo im zato morali da dodeliti id sa tags.forEach
		// }
	},

	computed: {
		// ...mapState({
		// 	videos: state => state.videos,
		// 	tags: state => state.tags
		// }),

		...mapState(['tags', 'videos']),
		// videosOnTag() {
		// 	return this.tag.video_ids
		// },

		tag() {
			return this.tags.find(t => t.id == this.$route.params.id)
		}
	},
}
</script>