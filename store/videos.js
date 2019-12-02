import {getData, deserializeVideos} from '@/utils/store-utils'

export const state = () => ({
	videos: [],
})

export const mutations = {
	SET_VIDEOS(state, videos) { // pages/videos/index.vue
		state.videos = videos
	},
	ADD_VIDEO(state, video) {
		let videos = state.videos.concat(video)
		state.videos = videos
	},
	DELETE_VIDEO(state, IDvideo){
		let videos = state.videos.filter(v => v.id != IDvideo)
		state.videos = videos
	},
	EDIT_VIDEO(state, video) {
		let v = state.videos.find(v => v.id == video.id)
		v = video

		//? Hmmm, a ovako je radjeno u  VueJS projektu, mozda je Jeff skontao da je ovo gore sa find() bolje
		// state.videos.forEach(v => {
		// 	if(v.id == video.id) {
		// 		v = video
		// 	}
		// })
	}
}

export const actions = {
	async loadAll({commit, dispatch}){
		let {data: videos} = await getData('/videos', this.$axios) //! this.$axios nije dostupan tamo gde smo definisali getData() metod, i zato ga prosledjujemo kao drugi argument
		deserializeVideos(videos) // ovim dodajemo tag_ids property na videos.attributes

		commit('SET_VIDEOS', videos.map(v => v.attributes))
	},

	async create({commit}, video) {
		let response = await this.$axios.post('/videos', video)
		let savedVideo = response.data.data.attributes

		commit('ADD_VIDEO', savedVideo)
		return savedVideo
	},

	async delete({commit}, video) {
		// delete video on the server
		let response = await this.$axios.delete(`/videos/${video.id}`)

		if(response.status == 200 || response.status == 204){
			// delete video in the state
			commit('DELETE_VIDEO', video.id)
		}
	},

	async edit({commit}, video) {
		let response = await this.$axios.put(`/videos/${video.id}`, video)
		let newVideo = response.data.data.attributes

		commit('EDIT_VIDEO', newVideo)
		return newVideo // ovo se valjda radi da bismo u componenti mogli prozvati ovaj metod u async await modu i da bismo nakon uspesnog editovanja redirektovali na neku stranicu
	},
}

export const getters = {
	get: state => id => {
		return state.videos.find(v => v.id == id) || {}
	}
}


// const videosModule = {
// 	state,
// 	getters,
// 	mutations,
// 	actions
// }

// export default videosModule