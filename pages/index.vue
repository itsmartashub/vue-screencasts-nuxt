<template>
  <v-container>
	  <!-- **************** / **************** -->
	   <div class="display-4 ma-4 d-flex justify-center">
			All Videos 
		</div>

		<div class="d-flex flex-wrap justify-center">
			<div v-for="video in videos" :key="video.name">
				<VideoListVideo :video="video" :tags="tags"></VideoListVideo>
			</div>
		</div>
  </v-container>
</template>

<script>
import VideoListVideo from '@/components/VideoListVideo'

export default {
	components: {
		VideoListVideo
	},
	async asyncData({$axios}) {
		let response = await $axios.get('/videos')

		//? videos
		let videos = response.data.data
		videos.forEach(v => {
			v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
		})

		//? tags
		let tags = response.data.included
		tags.forEach(t => { // nasi tags nemaju id otud ovo
			t.attributes.id = t.id
		})

		return {
			videos: videos.map(v => v.attributes),
			tags: tags.map(t => t.attributes)
		}
	},
}
</script>
