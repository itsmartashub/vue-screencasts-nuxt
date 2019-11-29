export const state = () => ({
	videos: [],
	currentVideo: {}
})

export const mutations = {
	SET_VIDEOS (state, videos) { // pages/videos/index.vue
		state.videos = videos 
	},
	SET_CURRENT_VIDEO (state, video) { // pages/videos/_id.vue
		state.currentVideo = video
	}
}

// export const actions = {
	
// }

// export const getters = {
	
// }