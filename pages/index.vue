<template>
  <v-container>
	  <!--//? **************** / **************** -->
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
	import { mapState } from 'vuex'

	export default {
		components: {
			VideoListVideo
		},

		computed: {
			...mapState({
				tags: state => state.tags.tags,
				videos: state => state.videos.videos
			})
		},

		// async fetch({store}) { //? premestneno u middleware
		// 	await store.dispatch('loadAllVideos')
		// 	await store.dispatch('loadAllTags')
		// },
	}
</script>
