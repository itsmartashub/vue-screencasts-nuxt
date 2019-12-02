// export const state = () => ({
// 	videos: [],
// 	tags: [],
// })

// export const mutations = {
// 	SET_VIDEOS (state, videos) { // pages/videos/index.vue
// 		state.videos = videos 
// 	},
// 	SET_TAGS (state, tags) {
// 		state.tags = tags
// 	},
// }

// export const actions = {
// 	async loadAllVideos({commit}) {
// 		// let {data, included} = await getData('/videos', this.$axios) //! bilo bi dobro da mozemo dohvatiti videos i tags direktno odmah, onda nam ne bi trebala ona linija za let response, za let videos i za let tags. za sad ovako ne mozemo, ali mozemo data i included. btw, idemo da kreiramo getData() f-ju kao deserialize. this.$axios nije dostupan dole gde smo definisali getData() metod, i zato ga prosledjujemo kao drugi argument
// 		// let response = await this.$axios.get('/videos')

// 		// let videos = response.data.data // sa let response
// 		// let videos = data // sa getData
// 		// videos.forEach(v => {
// 		// 	v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
// 		// })

// 		//? tags. ovo cemo zameniti sa deserializeTags(tags)
// 		// let tags = response.data.included // sa let response 
// 		// let tags = included // sa getData
// 		// tags.forEach(t => { // nasi tags nemaju id otud ovo
// 		// 	t.attributes.id = t.id
// 		// })

// 		let {data: videos, included: tags} = await getData('/videos', this.$axios) //! sad mozemo da obrisemo let videos i let tags
		
// 		deserializeVideos(videos)
// 		deserializeTags(tags)

// 		commit('SET_VIDEOS', videos.map(v => v.attributes))
// 		commit('SET_TAGS', tags.map(t => t.attributes)) //? ovo su tagovi koji su konektovani sa videos, ovo je za sad ok ovako, medjutim kada budemo radili sa admin sectionom zelecemo da admin ima pristup videima i da manipulise njima nezavisno od toga lkom videu pripadaju i ako ne pripadaju ni jednom recimo, zato pravimo ovu loadAllTags action
// 	},

// 	async loadAllTags({commit}) { //? i sada kao mozemo da obrisemo loadOneVideo i loadTagAndRelationships metod
// 		let {data: tags} = await getData('/tags', this.$axios)

// 		deserializeTags(tags)
// 		commit('SET_TAGS', tags.map(t => t.attributes))

// 	},

// 	// async loadOneVideo({commit}, {videoID}) {
// 	// 	// let response = await this.$axios.get(`/videos/${videoID}`)

// 	// 	// let video = response.data.data
// 	// 	// video.attributes.tag_ids = video.relationships.tags.data.map(t => t.id)

// 	// 	// let tags = response.data.included
// 	// 	// tags.forEach(t => {
// 	// 	// 	t.attributes.id = t.id;
// 	// 	// })

// 	// 	let {data: video, included: tags} = await getData(`/videos/${videoID}`, this.$axios)

// 	// 	deserializeVideos([video]) //! jer koristimo za jedan video, na slican nacin kao ovaj commit SET_VIDEOS sto poslasmo argument
// 	// 	deserializeTags(tags)
// 	// 	// umesto onog return idemo sa commit
// 	// 	commit('SET_TAGS', tags.map(t => t.attributes))
// 	// 	commit('SET_VIDEOS', [video.attributes]) // mislis ovi podaci tj ovaj [video.attributes] ce da overwrituje ono gore sto stavismo za videos.map(v => v.attributes), isto i deo za tagove, medjutim, u nuxtu se svi podaci iznova ucitavaju malte ne na svakoj stranici. ovo cemo kasnije promeniti, ali za sad f-ise
// 	// },

// 	// async loadTagAndRelationships({commit}, {tagID}) {
// 	// 	// let response = await this.$axios.get(`/tags/${tagID}`)

// 	// 	// let videosOnTag = response.data.included.filter(i => i.type === 'video') // ovo ce da vrati nekoliko videa. svakom tom videu ce trebati tag_ids niz koji bi im trebalo dodati bas kao u home page (pages/index.vue):
// 	// 	// videosOnTag.forEach(v => {
// 	// 	// 	v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
// 	// 	// })

// 	// 	// let tags = response.data.included.filter(i => i.type === 'tag')
// 	// 	// tags.forEach(t => {
// 	// 	// 	t.attributes.id = t.id
// 	// 	// })

// 	// 	let {included} = await getData(`/tags/${tagID}`, this.$axios)

// 	// 	let videosOnTag = included.filter(i => i.type === 'video')
// 	// 	deserializeVideos(videosOnTag)

// 	// 	let tags = included.filter(i => i.type === 'tag')
// 	// 	deserializeTags(tags)

// 	// 	commit('SET_VIDEOS', videosOnTag.map(vot => vot.attributes))
// 	// 	commit('SET_TAGS', tags.map(t => t.attributes))
// 	// }

// }

// const deserializeTags = function(tags) {
// 	tags.forEach(t => { // nasi tags nemaju id otud ovo
// 		t.attributes.id = t.id
// 		t.attributes.video_ids = t.relationships.videos.data.map(v => v.id) // dodajemo video_ids u tagove koji se nalaze na odredjenim videima
// 	})
// }
// const deserializeVideos = function(videos) {
// 	videos.forEach(v => { // nasi videi nemaju id otud ovo
// 		v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id)
// 	})
// }

// const getData = async function(url, axios) { // gore za store things imamo pristup $axiosu preko this, ali ovde ne, zato moramo proslediti kao argument
// 	let response = await axios.get(url)

// 	return {
// 		data: response.data.data,
// 		included: response.data.included
// 	}
// }

// // export const getters = {
	
// // }





//? ======== MODULES deo
export const strict = false

// Oh well... if it's good enough for VueX default, it's good enough for us.






// import Vuex from 'vuex'
// import videosModule from './modules/videos'
// import tagsModule from './modules/tags'
// import snackbarModule from './modules/snackbar'

// const createStore = () => {
// 	return new Vuex.Store({
// 		modules: {
// 			videos: videosModule,
// 			tags: tagsModule,
// 			snackbar: snackbarModule,
// 		}
// 	})
// }

// export default createStore