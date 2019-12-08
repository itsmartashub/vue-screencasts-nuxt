export const getters = {
	playedVideos: (state, getters, rootState, rootGetters) => { // odavde nemamo pristup auth kao tipa this.$auth vec mozemo ili za svaki getters gde zelimo da koristimo auth da saljemo kao parametar auth ili da dohvatimo auth preko rootState sto je mudrije
		if(rootState.auth.user) {
			return rootState.auth.user.played_video_ids
		} else {
			return []
		}
	},

	videoIsPlayed: (state, getters) => videoID => {
		return getters.playedVideos.includes(videoID)
	}
}

export const mutations = {
	MARK_VIDEO_PLAYED (state, {videoID, user}) {
		let playedVideos = user.played_video_ids.concat(videoID)
		user.played_video_ids = playedVideos
	}
}

export const actions = {
	markVideoPlayed({commit, rootState}, videoID) {
		if (rootState.auth.loggedIn) { // umesto loggedInmozemo koristiti user.name ali je kao loggedIn malo bolje

			commit('MARK_VIDEO_PLAYED', {
				videoID,
				user: rootState.auth.user
			})
			this.$axios.post('/video_plays', {
				video_id: videoID
			})
		}
	}
}