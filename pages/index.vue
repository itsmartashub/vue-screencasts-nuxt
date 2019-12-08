<template>
  <v-container>
	  <!--//? **************** / **************** -->
	   <div class="display-4 ma-4 d-flex justify-center">
			All Videos 
		</div>

		<VideoTable :videos="videos" :headers="headers" />

		<!-- <div class="d-flex flex-wrap justify-center">
			<div v-for="video in videos" :key="video.name">
				<VideoListVideo :video="video" :tags="tags"></VideoListVideo>
			</div>
		</div> -->
  </v-container>
</template>

<script>
	// import VideoListVideo from '@/components/VideoListVideo'
	import VideoTable from '@/components/VideoTable'

	import { mapState } from 'vuex'

	export default {
		components: {
			// VideoListVideo,
			VideoTable
		},

		computed: {
			...mapState({
				// tags: state => state.tags.tags,
				videos: state => state.videos.videos
			}),

			headers() {
				return [
					{text: 'Played', value: 'played', sortable: false, width: "70px"},
					{text: 'Name', value: 'name'},
					// {text: 'Date', value: 'published_at'},
					{text: 'Date', value: 'sortable_published_at'},
					{text: 'Duration', value: 'duration'},
					{text: 'Tags', value: 'tags', sortable: false},
				]
			},
		},

		// async fetch({store}) { //? premestneno u middleware
		// 	await store.dispatch('loadAllVideos')
		// 	await store.dispatch('loadAllTags')
		// },
	}
</script>
